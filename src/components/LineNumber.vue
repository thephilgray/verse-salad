<template lang="pug">
    .lineNumber
        span.lineNumber__label.--sr-only Lines Complete: 
        span.lineNumber__linesComplete {{linesComplete}}
        span.lineNumber__divider  / 
        span.lineNumber__total {{total}}
</template>
<script>
export default {
  props: {
    linesComplete: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  }
};
</script>
