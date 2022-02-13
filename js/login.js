/* global Vue */
/* global axios */
/* global swal */

// 加入站點
const apiUrl = 'https://vue3-course-api.hexschool.io/v2/';

const app = {
  data() {
    return {
      // 回傳user物件中，帳號及密碼欄位內容
      user: {
        username: '',
        password: '',
      },
    };
  },
  created() {

  },
  methods: {
    login() {
      // 發出登入請求
      axios.post(`${apiUrl}/admin/signin`, this.user).then((response) => {
        const { token, expired } = response.data;
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        window.location = 'index.html';
      }).catch((error) => {
        console.log(error);
        swal('出錯了!', '登入失敗，請檢查帳號、密碼', 'error');
      });
    },
  },
};
Vue.createApp(app).mount('#app');
