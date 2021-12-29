<script>
export default {
  name: 'TCol',
  props: {
    cols: {
      type: [String, Number],
      default: '24',
    },
    xs: {
      type: [String, Number],
      default: null,
    },
    md: {
      type: [String, Number],
      default: null,
    },
    lg: {
      type: [String, Number],
      default: null,
    },
  },
  render(h) {
    //TODO. Script의 데이터를 SCSS로 던져주는 방법 찾아보고 적용해보기
    const classList = [`col-${this.cols}`]
    if (this.xs) {
      classList.push(`col-xs-${this.xs}`)
    }
    if (this.md) {
      classList.push(`col-md-${this.md}`)
    }
    if (this.lg) {
      classList.push(`col-lg-${this.lg}`)
    }
    return h(
      'div',
      {
        class: ['t-col', ...classList],
      },
      this.$slots.default,
    )
  },
}
</script>
