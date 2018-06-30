<template lang="pug">
    .endWordCheck
        span.endWordCheck__message(:class="{'--valid': matches}") {{matches}}
</template>

<script>
export default {
  props: {
    matches: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.endWordCheck__message {
  color: red;
  &.--valid {
    color: green;
  }
}
</style>
