<template>
  <div>
    <loading :active.sync="isLoading" />

    <!-- the start of product card -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.description }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">
                {{ item.origin_price | currency }}
              </div>
              <del class="h6">{{ item.origin_price | currency }}</del>
              <div class="h5">{{ item.price | currency }} for NOW!!</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- the end of product card -->

    <!-- the start of single product modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- the end of single product modal -->

    <!-- the start of cart list -->
    <table class="table mt-4 mx-auto w-50 table-hover">
      <thead>
        <th width="50">#</th>
        <th class="text-left">Product Name</th>
        <th class="text-right" width="100">QTY</th>
        <th class="text-right" width="100">Price</th>
      </thead>
      <tbody>
        <tr v-for="item in carts" :key="item.id">
          <td>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteProductInCart(item.id)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="text-left">
            {{ item.product.title }}
            <div colspan="5" class="text-success" v-if="item.coupon">
              Saveing
              <strong>{{
                (item.total - item.final_total).toFixed(0) | currency
              }}</strong>
              by using coupon!!
            </div>
          </td>
          <td class="text-right">{{ item.qty }}</td>
          <td class="text-right">
            {{ item.final_total | currency }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">
            Total
          </td>
          <td class="text-right">
            {{ amount.total | currency }}
          </td>
        </tr>

        <tr
          class="text-right primary"
          v-if="amount.final_total !== amount.total"
        >
          <td class="text-success text-right" colspan="3">After Discount</td>
          <td class="text-success text-right">
            {{ amount.final_total | currency }}
          </td>
        </tr>
      </tfoot>
    </table>
    <!-- coupon -->
    <form class="w-50 mx-auto mt-4">
      <div class="form-group row">
        <input
          type="text"
          class="form-control col-8"
          id="exampleInputCouponNo"
          placeholder="Coupon No."
          v-model="coupon_code"
        />
        <button
          @click="addCouponCode"
          type="button"
          class="btn btn-primary col-4"
        >
          Use COUPON
        </button>
      </div>
      <div class="form-group row">
        <input
          type="email"
          class="form-control col-8"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="name@example.com"
        />
        <button type="button" class="btn btn-primary col-4">Submit</button>
        <small id="emailHelp" class="form-text text-muted text-right"
          >We'll never share your email with anyone else.</small
        >
      </div>
    </form>
    <!-- the end of cart list -->

    <!-- start of order form -->

    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            :class="{ 'is-invalid': errors.has('email') }"
            v-model="form.user.email"
            v-validate="'required|email'"
            placeholder="請輸入 Email"
          />
          <span class="text-danger" v-if="errors.has('email')">
            {{ errors.first('email') }}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            :class="{ 'is-invalid': errors.has('name') }"
            v-model="form.user.name"
            v-validate="'required'"
            placeholder="輸入姓名"
          />
          <span class="text-danger" v-if="errors.has('name')"
            >Please enter your name</span
          >
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            name="phone_num"
            id="usertel"
            :class="{ 'is-invalid': errors.has('phone_num') }"
            v-model="form.user.tel"
            v-validate="'required'"
            placeholder="請輸入電話"
          />
          <span class="text-danger" v-if="errors.has('phone_num')"
            >Please enter your phone number</span
          >
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            :class="{ 'is-invalid': errors.has('address') }"
            v-model="form.user.address"
            v-validate="'required'"
            placeholder="請輸入地址"
          />
          <span class="text-danger" v-if="errors.has('address')"
            >Please enter your address</span
          >
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name=""
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
    <!-- end of order form -->

    <!-- start of the delete moodal -->
    <!-- <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div> -->
    <!-- end of the delete moodal -->
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      products: [],
      product: {},
      carts: [],
      amount: {},
      isLoading: false,
      status: {
        loadingItem: ''
      },
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        }
      }
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=:page`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        // console.log('getProducts', response.data)
        vm.isLoading = false
        vm.products = response.data.products
      })
    },
    getProduct (id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
      const vm = this
      vm.status.loadingItem = id
      this.$http.get(api).then(response => {
        vm.product = response.data.product
        $('#productModal').modal('show')
        // console.log('getProduct', response.data)
        vm.status.loadingItem = ''
      })
    },
    addToCart (id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, { data: cart }).then(response => {
        console.log('addToCart', response)
        vm.status.loadingItem = ''
        vm.getCart()
        $('#productModal').modal('hide')
      })
    },
    getCart () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        // console.log('getCart', response.data)
        vm.isLoading = false
        vm.amount = response.data.data
        vm.carts = response.data.data.carts
      })
    },
    deleteProductInCart (id) {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      vm.isLoading = true

      this.$http.delete(api).then(response => {
        console.log('deleteProductInCart', response)
        vm.isLoading = false

        vm.getCart()
      })
      // if (id) {
      //   $('#delProductModal').modal('show')
      //   vm.getProducts()
      //   vm.getCart()
      // }
    },
    addCouponCode () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      this.$http.post(api, { data: coupon }).then(response => {
        console.log('addCouponCode', response)
        vm.isLoading = false
        vm.getCart()
      })
    },
    createOrder () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      const order = vm.form
      this.$validator.validate().then(valid => {
        if (!valid) {
          console.log('Please complete the form')
        } else {
          vm.isLoading = true
          this.$http.post(api, { data: order }).then(response => {
            console.log('createOrder', response)
            vm.isLoading = false
          })
        }
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
