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
          <p>
            Ordered Time:
            {{ new Date(order.create_at * 1000).toLocaleDateString() }}
          </p>
          <p>Order ID: {{ order.id }}</p>
          <p>Payment Received: {{ order.is_paid }}</p>
          <p v-if="order.is_paid">
            Paid Date: {{ new Date(order.paid_date*1000).toLocaleDateString() }}
          </p>
          <p v-if="order.is_paid">Payment Method: {{ order.payment_method }}</p>
          <p>Message: {{ order.message }}</p>
          <p>Ordered Products:</p>
          <ol v-for="product in orders.products" :key="product.id">
            <li>{{ product.product_id }} * {{ product.qty }}</li>
          </ol>
          <p v-if="!order.final_total">Total: {{ order.total | currency }}</p>
          <p v-if="order.final_total">
            Total: {{ order.final_total | currency }}
          </p>
          <h4>Customer info</h4>
          <h6>Name: {{ order.user.name }}</h6>
          <h6>Tel: {{ order.user.tel }}</h6>
          <h6>Email: {{ order.user.email }}</h6>
          <h6>Address: {{ order.user.address }}</h6>
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
      orders: [
        {
          order: {
            products: {},
            user: {}
          }
        }
      ],
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
        console.log('getOrderList', response.data.orders)
        vm.isLoading = false
        vm.orders = response.data.orders
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
