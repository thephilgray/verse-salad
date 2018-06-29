<template lang="pug">
    .previousLine
        p.previousLine__text {{line}}
</template>

<script>
export default {
  props: {
    line: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.previousLine {
  width: 100%;
  padding: 0.5em;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0.5;
}
.previousLine__text {
  text-align: center;
}
</style>
