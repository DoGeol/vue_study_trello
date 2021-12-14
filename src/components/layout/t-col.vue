<script>
export default {
  name: 'TCol',
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    col: {
      type: [String, Number],
      default: '24',
    },
  },
  render(h) {
    const classList = [`col-${this.col}`]
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
