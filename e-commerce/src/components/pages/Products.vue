<template>
  <div>
    <div class="text-end mt-4">
      <button class="btn btn-primary text-light">Add New Product</button>
    </div>
    <table class="table mt-4">
      <thead>
          <th width="130">Category</th>
          <th>Product Name</th>
          <th width="120">Origin Price</th>
          <th width="120">Price</th>
          <th width="120">Status</th>
          <th width="120">Edict</th>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price}}</td>
            <td class="text-right">{{item.price}}</td>
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
  </div>
</template>
<script>
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
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
