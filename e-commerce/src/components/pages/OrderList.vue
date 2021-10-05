<template>
  <div>
    <div class="card">
      <div class="card-header">
        Orders
      </div>
      <!-- the start of order -->
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="order in orders" :key="order.id">
          <h4>#{{ order.num }}</h4>
          <h6>Ordered Time: {{ new Date(order.create_at) }}</h6>
          <h6>Order ID: {{ order.id }}</h6>
          <h6>Payment Received: {{ order.is_paid }}</h6>
          <h6 v-if="order.is_paid">Paid Date: {{ new Date(order.paid_date) }}</h6>
          <h6 v-if="order.is_paid">Payment Method: {{ order.payment_method }}</h6>
          <h6>Message: {{ order.message }}</h6>
          <h6>Ordered Products:</h6>
          <p v-for="product in orders.products" :key="product.id">
            {{ product.product_id }} * {{ product.qty }}
          </p>
          <h4>Customer info</h4>
          <h6>Address: {{ orders.address }}</h6>
          <h6>Email: {{ orders.email }}</h6>
          <h6>Name: {{ orders.name }}</h6>
          <h6>Tel: {{ orders.tel }}</h6>
        </li>
      </ul>
      <!-- the end of order -->
    </div>
  </div>
</template>
<script>
// import $ from 'jquery'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },

  data () {
    return {
      orders: [],
      pagination: {},
      isLoading: false
    }
  },
  methods: {
    getOrderList (page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        console.log(response.data)
        vm.isLoading = false
        // vm.orders = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    updateOrder (id) {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${id}`
      //   let httpMethod = 'post'
      const vm = this
      //   if (!vm.isNew) {
      //     api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      //     httpMethod = 'put'
      //   }
      this.$http.put(api, { data: vm.tempProduct }).then(response => {
        console.log(response.data)
        if (response.data.success) {
          //   $('#productModal').modal('hide')
          vm.getOrderList()
        } else {
          //   $('#productModal').modal('hide')
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
