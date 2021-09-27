import Vue from 'vue'

Vue.prototype.$bus = new Vue()

// Message
// this.$bus.$emit('message:push', response.data.message, 'danger')
// 自定義名稱 'messsage:push'
// message(string): 傳入參數 訊息內容
// status(string): Alert樣式，預設值為 warning
