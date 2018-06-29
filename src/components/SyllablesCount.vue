<template lang="pug">
    .syllablesCount
        span.syllablesCount__label Syllables Count: 
        span.syllablesCount__complete(:class="{'--isValid': isValid}") {{complete}}
        span.syllablesCount__divider  / 
        span.syllablesCount__total {{total}}
</template>
<script>
export default {
  props: {
    complete: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    isValid: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.syllablesCount__complete {
  color: red;
  &.--isValid {
    color: green;
  }
}
</style>
