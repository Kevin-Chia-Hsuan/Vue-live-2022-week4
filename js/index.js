/* global Vue */
/* global axios */
/* global swal */

// 區域註冊: 載入 分頁頁碼 元件
import pagination from './pagination.js';
// 區域註冊: 載入新增、編輯產品 Modle 元件
import userProductModal from './userProductModal.js';
// 區域註冊: 載入刪除產品 Modle 元件
import delProductModal from './delProductModal.js';

const app = {
  data() {
    return {
      // 一律使用 function return
      // 加入站點
      url: 'https:///vue3-course-api.hexschool.io/v2',
      // 加入個人 API Path
      path: 'kevinapog2022',
      products: [],
      isNew: false, // 判斷點擊的是新增按鈕方法還是編輯按鈕方法
      tempProduct: {
        // 預計調整資料使用結構，如:新增產品時的暫時資料儲存
        imagesUrl: [], // 第二層結構
      },
      pagination: {},
      userProductModal: {},
    };
  },
  // 區域註冊
  // 註冊 分頁頁碼 元件
  // BS實體
  // 註冊 載入新增、編輯產品 Modle 元件
  // 註冊 載入刪除產品 Modle 元件
  components: {
    pagination,
    userProductModal,
    delProductModal,
  },
  mounted() {
    // 取得資料、DOM元素
    this.getProducts();

    // console.log(this.$refs.userProductModal);
    // BS實體，建立新產品、編輯產品
    // this.productModal = new bootstrap.Modal(this.$refs.productModal, {
    //   // keyboard:false時，按下esc時不關閉當前畫面
    //   keyboard: false,
    // });

    // 刪除產品
    // delProductModal = new bootstrap.Modal(
    //   document.getElementById('delProductModal'),
    //   {
    //     // keyboard:false時，按下esc時不關閉當前畫面
    //     keyboard: false,
    //   }
    // );
  },
  methods: {
    getProducts(page = 1) {
      // 取得產品列表
      const url = `${this.url}/api/${this.path}/admin/products?page=${page}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data.success) {
            this.products = response.data.products;
            this.pagination = response.data.pagination;
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 開啟建立新產品、編輯、刪除方法
    openModal(isNew, item) {
      if (isNew === 'new') {
        // 傳入new，等於新增產品

        // 把暫存資料清空
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.userProductModal.openModal();
      } else if (isNew === 'edit') {
        // 傳入edit，等於編輯產品
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.userProductModal.openModal();
      } else if (isNew === 'delete') {
        // 傳入delete，等於刪除產品
        this.tempProduct = { ...item };
        this.$refs.delProductModal.openModal();
      }
    },

    // // 圖片新增
    // createImages() {
    //   this.tempProduct.imagesUrl = [];
    //   this.tempProduct.imagesUrl.push('');
    // },

    // 編輯訂單內容
    updateProduct(tempProduct) {
      let url = `${this.url}/api/${this.path}/admin/product`;
      let method = 'post'; // post 新增產品
      if (!this.isNew) {
        url = `${this.url}/api/${this.path}/admin/product/${tempProduct.id}`;
        method = 'put'; // put 編輯產品
      }
      axios[method](url, { data: tempProduct })
        .then((response) => {
          if (response.data.success) {
            swal('成功!', '產品新增、編輯成功', 'success');
            this.$refs.userProductModal.hideModal();
            this.getProducts();
          } else {
            // alert(response.data.message);
            const errorMsg = response.data.message;
            swal('出錯了!', `${errorMsg}`, 'error');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 刪除產品方法
    delProduct(tempProduct) {
      const url = `${this.url}/api/${this.path}/admin/product/${tempProduct.id}`;
      axios
        .delete(url)
        .then((response) => {
          if (response.data.success) {
            swal('成功!', '產品刪除成功', 'success');
            this.$refs.delProductModal.hideModal();
            this.getProducts();
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // 元件生成，必定會執行的項目
    // 取得 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    if (token === '') {
      // promise 先跳出提示視窗，按確定後才跳轉回登入頁
      swal('出錯了!', '您尚未登入請重新登入。', 'error')
        .then(() => {
          window.location = 'login.html';
        })
        .catch((error) => {
          console.log(error);
        });
    }
    axios.defaults.headers.common.Authorization = token;
  },
};

Vue.createApp(app).mount('#app');
