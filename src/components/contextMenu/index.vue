<template>
  <!-- TODO. 좌표 계산하여 우측에서 클릭시 왼쪽에 나오게 변경 필요 -->
  <!-- TODO. 다이얼로그 상단에 고정되는거 수정 필요 -->
  <t-dialog
    class="context-menu"
    :visible.sync="visible"
    :border-radius="''"
    position="absolute"
    :modal="false"
    :close-button="false"
    :before-close="handleClose"
    :top="`${this.top}px`"
    :left="`${this.left}px`"
    :width="width"
    :align-center-x="false"
    :align-center-y="false"
  >
    <slot />
  </t-dialog>
</template>

<script>
export default {
  name: 'TContextMenu',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: '200px',
    },
  },
  data() {
    return {
      top: 0,
      left: 0,
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.top = this.position.y
        this.left = this.position.x
      }
    },
  },
  methods: {
    handleClose(reset) {
      this.$emit('handleClose', reset === true)
    },
  },
}
</script>
