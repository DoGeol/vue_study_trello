<script>
export default {
  name: 'TRow',
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
  },
  render(h) {
    return h(
      this.tagName,
      {
        class: ['t-row'],
      },
      this.$slots.default,
    )
  },
}
</script>
