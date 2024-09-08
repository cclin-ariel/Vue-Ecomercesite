<template>
  <div>
    <div class="card-header">
      Orders
    </div>
    <!-- the start of order -->
    <table class="table">
      <thead>
        <tr>
          <th width="200"># Order ID</th>
          <th width="140">Payment</th>
          <th width="120">Total Amount</th>
          <th class="text-center">Products</th>
          <th width="170">Customer info</th>
          <th width="160" class="text-center overflow-auto">Message</th>
          <th width="80" class="text-center">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            # {{ order.num }} -
            {{ order.create_at | date }}
            <br />
            <br />
            {{ order.id }}
          </td>
          <td>
            <p v-if="order.is_paid" class="text-success">
              Comfirmed <br />
              {{ order.paid_date | date }}
            </p>
            <p v-else>Not comfirmed</p>
          </td>
          <td>
            <p v-if="!order.final_total" class="text-center">
              {{ order.total | currency }}
            </p>
            <p v-if="order.final_total">
              {{ order.final_total | currency }}<br />
              with coupon
            </p>
          </td>
          <td>
            <ul v-for="product in order.products" :key="product.id">
              <li v-if="product.qty != 0">
                {{ product.product.title }} * {{ product.qty }}
              </li>
            </ul>
          </td>
          <td>
            <p>Name: {{ order.user.name }}</p>
            <p>Tel: {{ order.user.tel }}</p>
            <p>Email: {{ order.user.email }}</p>
            <p>Address: {{ order.user.address }}</p>
          </td>
          <td>
            <p v-if="order.message">{{ order.message }}</p>
            <p class="text-center" v-else>-</p>
          </td>
          <td style="height: 100%" class=" align-middle">
            <div class="btn-group-vertical">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="openModal(true, order)"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="openModal(false)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- the end of order -->
    <Pagination
      :pagination-from-products="pagination"
      @trigger="getOrderList"
    />
    <!-- start of edit order modal modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>Edit Order</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>Ｆ
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <h4>Order info</h4>

                <div class="form-row">
                  <div class="col-md-6">
                    <p>Order ID: {{ tempOrder.id }}</p>
                  </div>
                  <div class="col-md-6">
                    <p>
                      Ordered Time:
                      <span>
                        {{ tempOrder.create_at | date }}
                      </span>
                    </p>
                  </div>

                  <div class="col-md-6">
                    <label for="payment">Payment: </label>
                    <span v-if="tempOrder.is_paid" class="text-success">
                      Comfirmed
                    </span>
                    <span v-else>Not comfirmed</span>
                  </div>
                  <div class="col-md-6">
                    <p>
                      Paid Date:
                      <span>
                        {{
                          new Date(
                            tempOrder.paid_date * 1000
                          ).toLocaleDateString()
                        }}
                      </span>
                    </p>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group-sm col-md-12">
                    <p>Products:</p>
                    <ul v-for="product in tempOrder.products" :key="product.id">
                      <li v-if="product.qty != 0">
                        <div class="input-group">
                          <div class="form-row col-md-6">
                            <div class="input-group-prepend"></div>
                            <select class="custom-select">
                              <option selected>{{
                                product.product.title
                              }}</option>
                              <!-- <option :value="products.product.title">{{ products.product.title }}</option> -->
                            </select>
                          </div>
                          <h5 class="align-center col-md-1">*</h5>
                          <input
                            type="number"
                            class="form-control col-md-1"
                            id="product_qty"
                            v-model="product.qty"
                          />
                          <p>= {{ product.final_total || product.total }}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="form-row">
                  <h6 v-if="tempOrder.final_total">Coupon Used!</h6>
                  <h3 style="width:98%" class="text-right">
                    Total:
                    <span class="text-success">
                      {{ tempOrder.total || tempOrder.final_total }}
                    </span>
                  </h3>
                </div>
                <hr />

                <h4>Customer info</h4>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="userName">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="userName"
                      v-model="tempOrder.user.name"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="userTel">Tel</label>
                    <input
                      type="number"
                      class="form-control"
                      id="userTel"
                      v-model="tempOrder.user.tel"
                    />
                  </div>
                </div>
                <label for="userEmail">email</label>
                <input
                  type="email"
                  class="form-control"
                  id="userEmail"
                  v-model="tempOrder.user.email"
                />

                <label for="userAddress">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="userAddress"
                  v-model="tempOrder.user.address"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="updateOrder"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- end of edit order modal -->
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data () {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      tempOrder: {
        user: {},
        products: []
      },
      isEdit: 'false'
    }
  },
  methods: {
    getOrderList (page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        console.log('getOrderList', response.data.orders)
        vm.isLoading = false
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    },
    openModal (isEdit, order) {
      if (isEdit) {
        this.tempOrder = Object.assign({}, order)
        this.isEdit = true
        $('#orderModal').modal('show')
        console.log(this.tempOrder)
      }
      if (!isEdit) {
        console.log('delete')
      }
    },
    updateOrder (id) {
      const vm = this
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`
      //   let httpMethod = 'post'
      //   if (!vm.isEdit) {
      //     api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      //     httpMethod = 'put'
      //   }
      this.$http.put(api, { data: vm.tempOrder }).then(response => {
        console.log(response.data)
        if (response.data.success) {
          $('#orderModal').modal('hide')
          vm.getOrderList()
          $('#orderModal').modal('hide')
        } else {
          vm.getOrderList()
          console.log('failure')
        }
        //   vm.products = response.data.products
      })
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>
