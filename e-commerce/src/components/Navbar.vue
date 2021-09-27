<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">company name</h1>
    <div class="mb-2 mb-md-0 mr-4">
      <a href="#" @click.prevent="signout"> Sign Out</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  },
  methods: {
    signout () {
      const api = `${process.env.APIPATH}/logout`
      const vm = this
      this.$http.post(api).then(response => {
        console.log(response.data)
        if (response.data.success) {
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>
