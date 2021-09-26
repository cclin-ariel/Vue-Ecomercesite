<template>
  <div>
    <loading :active.sync="isLoading" />

    <div class="text-right mt-4">
      <button class="btn btn-primary text-light" @click="openModal(true)">
        Add New Product
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <th class="text-center" width="110">Category</th>
        <th>Product Name</th>
        <th class="text-center" width="110">Origin Price</th>
        <th class="text-center" width="110">Price</th>
        <th class="text-center" width="100">Status</th>
        <th class="text-center" width="50">Edit</th>
        <th class="text-center" width="50">Delete</th>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="text-center">{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price }}</td>
          <td class="text-right">{{ item.price }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">Launched</span>
            <span v-else>Hidden</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openModal(false, item, true)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- start of add new product modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
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
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-pulse"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt=""
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true="1"
                      :false="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
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
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of add new product modal -->
    <!-- start of the delete moodal -->
    <div
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
      </div>
      <!-- end of the delete moodal -->
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      modalType: '',
      isDelete: true,
      isLoading: false,
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        console.log(response.data)
        vm.isLoading = false
        vm.products = response.data.products
      })
    },
    openModal (isNew, item, isDelete) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true // ????
        this.modalType = '#productModal'
      }
      if (!isNew) {
        this.tempProduct = Object.assign({}, item)
        this.isNew = false // ????
        this.modalType = '#productModal'
      }
      if (isDelete) {
        this.tempProduct = Object.assign({}, item)
        this.modalType = '#delProductModal'
      }
      $(this.modalType).modal('show')
    },
    updateProduct () {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response.data)
        if (response.data.success) {
          $('#productModal').modal('hide')
          vm.getProducts()
        } else {
          $('#productModal').modal('hide')
          vm.getProducts()
          console.log('failure')
        }
        //   vm.products = response.data.products
      })
    },
    deleteProduct () {
      console.log(this.tempProduct)

      const vm = this
      const delApi = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      this.$http.delete(delApi).then(response => {
        console.log(response.data)
        if (response.data.success) {
          $('#delProductModal').modal('hide')
          vm.getProducts()
        } else {
          $('#delProductModal').modal('hide')
          vm.getProducts()
          console.log('failure')
        }
      })
    },
    uploadFile () {
      console.log(this)
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`

      vm.status.fileUploading = true
      this.$http
        .post(api, formData, {
          headers: {
            'content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response.data)
          if (response.data.success) {
            vm.status.fileUploading = false
            // vm.tempProduct.imageUrl = response.data.imageUrl
            // console.log(vm.tempProduct)
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          }
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
