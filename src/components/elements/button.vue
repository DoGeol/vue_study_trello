<template>
  <button type="button" :class="['button', size]" @click.stop.exact="handleClick">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'TButton',
  props: {
    size: {
      type: String,
      default: 'large',
    },
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>
