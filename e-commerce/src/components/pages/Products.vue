<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary text-light" @click="openModal">
        Add New Product
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <th class="text-center" width="130">Category</th>
        <th>Product Name</th>
        <th class="text-center" width="120">Origin Price</th>
        <th class="text-center" width="120">Price</th>
        <th class="text-center" width="100">Status</th>
        <th class="text-center" width="50">Edict</th>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price }}</td>
          <td class="text-right">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">Enabled</span>
            <span v-else>Disenabled</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">Edict</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- start of add new product modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
            ...
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
      <!-- end of add new product modal -->
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`
      const vm = this
      this.$http.get(api).then(response => {
        console.log(response.data)
        vm.products = response.data.products
      })
    },
    openModal () {
      $('#productModal').modal('show')
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
