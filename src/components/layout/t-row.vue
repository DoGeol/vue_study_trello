<script>
export default {
  name: 'TRow',
  render(h) {
    return h(
      'div',
      {
        class: ['t-row'],
      },
      this.$slots.default,
    )
  },
}
</script>
