/* global bootstrap */

export default {
  template: '#delProductModal',
  props: ['tempProduct', 'isNew'],
  data() {
    return {
      delProductModal: '',
    };
  },
  mounted() {
    // console.log(this.$refs);
    this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
      // 點擊背景/按鍵盤，不關閉視窗
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    openModal() {
      this.delProductModal.show();
    },
    hideModal() {
      this.delProductModal.hide();
    },
  },
};
