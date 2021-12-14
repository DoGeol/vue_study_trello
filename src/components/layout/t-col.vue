<script>
export default {
  name: 'TCol',
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    cols: {
      type: [String, Number],
      default: '24',
    },
    isResponse: {
      type: Boolean,
      default: false,
    },
  },
  render(h) {
    const classList = [`col-${this.cols}`]
    if (this.isResponse) {
      const breakPointList = ['xs', 'md', 'lg']
      breakPointList.forEach((breakPoint) => {
        if (breakPoint === 'xs') {
          classList.push(`col-${breakPoint}-${this.cols}`)
        } else if (breakPoint === 'md') {
          classList.push(`col-${breakPoint}-${this.cols / 2}`)
        } else {
          classList.push(`col-${breakPoint}-${this.cols / 4}`)
        }
      })
    }
    return h(
      this.tagName,
      {
        class: ['t-col', ...classList],
      },
      this.$slots.default,
    )
  },
}
</script>
