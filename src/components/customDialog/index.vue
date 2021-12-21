<template>
  <!-- TODO.이후 dialog 직접 만들어보기 -->
  <transition name="transition-fade">
    <div class="dialog-wrapper" v-if="visible">
      <div :style="[{ width: width }, { height: height }, { minWidth: minWidth }, { minHeight: minHeight }, { maxWidth: maxWidth }, { maxHeight: maxHeight }]" class="dialog">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TCustomDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '400px',
    },
    height: {
      type: String,
      default: 'auto',
    },
    minWidth: {
      type: String,
      default: '70%',
    },
    minHeight: {
      type: String,
      default: '500px',
    },
    maxWidth: {
      type: String,
      default: '100%',
    },
    maxHeight: {
      type: String,
      default: '90%',
    },
  },
}
</script>
