<template lang="pug">
.progressBar
    .progressBar__fill(:style="{width: percentage + '%'}")
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style lang="scss" scoped>
.progressBar {
  position: relative;
  width: 100%;
  height: 1em;
  border: 1px solid black;
  overflow: hidden;
}
.progressBar__fill {
  position: absolute;
  background: #2cab63;
  height: 1em;
  padding: 0;
  margin: 0;
  transition: all 100ms cubic-bezier(0.17, 0.67, 0.34, 1.54);
}
</style>
