<template>
  <header class="header">
    <slot name="leftArea" />
    <slot />
    <slot name="rightArea" />
  </header>
</template>

<script>
export default {
  name: 'THeader',
}
</script>
