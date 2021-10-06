<template>
  <div>
    <loading :active.sync="isLoading" />

    <div class="text-right mt-4">
      <button
        class="btn btn-primary text-light"
        @click="openModal(true, false, false)"
      >
        Add New Coupon
      </button>
    </div>
    <!-- start of coupon list -->
    <table class="table mt-4">
      <thead>
        <th class="text-center" width="90">Status</th>
        <th width="140">Coupon Name</th>
        <th width="110">Coupon Code</th>
        <th class="text-center" width="110">Percent</th>
        <th class="text-center" width="110">Due Day</th>
        <th width="50">Edit</th>
        <th width="50">Delete</th>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">Launched</span>
            <span v-else>Hidden</span>
          </td>
          <td>{{ item.title }}</td>
          <td >{{ item.code }}</td>
          <td class="text-center">{{ item.percent }}</td>
          <td class="text-center">{{ item.due_date }}</td>
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
    <!-- end of coupon list -->
    <Pagination :pagination-from-products="pagination" @trigger="getCoupons" />
    <!-- start of add new coupon modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">New Coupon</span>
              <span v-else>Edit Coupon</span>
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
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">Coupon Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempCoupon.title"
                    placeholder="Enter the Coupon Name"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">Discount Percentage</label>
                    <input
                      type="num"
                      class="form-control"
                      id="percent"
                      v-model="tempCoupon.percent"
                      placeholder="Enter the Discount Percentage"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="due_date">Due Date</label>
                    <input
                      type="date"
                      class="form-control"
                      id="due_date"
                      v-model="tempCoupon.due_date"
                      placeholder="Enter the Due Date"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="coupon_code">Coupon Code</label>
                    <input
                      type="text"
                      class="form-control"
                      id="coupon_code"
                      v-model="tempCoupon.code"
                      placeholder="Enter the code"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempCoupon.is_enabled"
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
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of add new coupon modal -->
    <!-- start of the delete moodal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>Delete Coupon</span>
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
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
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
            <button type="button" class="btn btn-danger" @click="deleteCoupon">
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
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },

  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
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
    getCoupons (page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then(response => {
        console.log('getCoupons', response.data)
        vm.isLoading = false
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item, isDelete) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
        this.modalType = '#couponModal'
      }
      if (!isNew) {
        this.tempCoupon = Object.assign({}, item) // 避免傳參考而覆蓋物件的值
        this.isNew = false
        this.modalType = '#couponModal'
      }
      if (isDelete) {
        this.tempCoupon = item // no value in this modal, no need to避免傳參考而覆蓋物件的值
        this.modalType = '#delCouponModal'
      }
      $(this.modalType).modal('show')
    },
    updateCoupon () {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.code}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        console.log(response.data)
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponModal').modal('hide')
          vm.getCoupons()
          console.log('failure')
        }
        vm.coupons = response.data.coupons
      })
    },
    deleteCoupon () {
      console.log(this.tempCoupon)

      const vm = this
      const delApi = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.code}`
      this.$http.delete(delApi).then(response => {
        console.log(response.data)
        if (response.data.success) {
          $('#delCouponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#delCouponModal').modal('hide')
          vm.getCoupons()
          console.log('failure')
        }
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
