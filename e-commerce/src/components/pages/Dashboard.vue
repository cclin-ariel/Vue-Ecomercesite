<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <Navbar />
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
export default {
  components: {
    Sidebar,
    Navbar
  },
  created () {
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)ecToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    // console.log('myCookie', myCookie)
    this.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>
