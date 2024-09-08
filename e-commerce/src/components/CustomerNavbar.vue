<template>
  <div>
    <header class="site-header sticky-top py-1 bg-mainColor">
      <nav
        class="
          container-fluid
          d-flex
          flex-column flex-md-row
          justify-content-between
        "
      >
        <a class="py-2" href="#" aria-label="Product">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="#f1f1ef"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="d-block mx-auto"
            role="img"
            viewBox="0 0 24 24"
          >
            <title>Bims logo</title>
            <circle cx="12" cy="12" r="10" />
            <path
              d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"
            />
          </svg>
        </a>
        <a
          class="
            py-2
            d-none d-md-inline-block
            link-bgColor
            text-decoration-none
            text-uppercase
          "
          href="#"
          >Sale</a
        >
        <a
          class="
            py-2
            d-none d-md-inline-block
            link-bgColor
            text-decoration-none
            text-uppercase
          "
          href="#"
          >Inspiration</a
        >
        <a
          class="
            py-2
            d-none d-md-inline-block
            link-bgColor
            text-decoration-none
            text-uppercase
          "
          href="#"
          >Product</a
        >
        <a
          class="
            py-2
            d-none d-md-inline-block
            link-bgColor
            text-decoration-none
            text-uppercase
          "
          href="#"
          >Support</a
        >
        <a
          class="
            py-2
            d-none d-md-inline-block
            link-bgColor
            text-decoration-none
            text-uppercase
          "
          href="#"
          >FAQ</a
        >
        <a
          class="
            py-2
            d-none d-md-inline-block
            link-bgColor
            text-decoration-none
            text-uppercase
          "
          href="#"
          >Cart</a
        >
        <form class="input-group-sm my-auto row g-0">
          <div class="col-auto">
            <input
              class="form-control-sm col-auto"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
          <button class="btn btn-secondaryColor col-auto" type="">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </nav>
    </header>
  </div>
</template>
<script>
export default {
  name: 'CustomerNavbar',
  data () {
    return {}
  }
}
</script>
