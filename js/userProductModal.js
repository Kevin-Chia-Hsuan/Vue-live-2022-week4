/* global bootstrap */

export default {
  template: '#userProductModal',
  props: ['tempProduct', 'isNew'],
  data() {
    return {
      productModal: '',
    };
  },
  mounted() {
    // console.log(this.$refs);
    // console.log(this.$refs.productModal);
    this.productModal = new bootstrap.Modal(this.$refs.productModal, {
      // 點擊背景/按鍵盤，不關閉視窗
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    // 圖片新增
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
    openModal() {
      this.productModal.show();
    },
    hideModal() {
      this.productModal.hide();
    },
  },
};
