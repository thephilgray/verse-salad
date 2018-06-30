<template lang="pug">
    .statusMessage
        p.statusMessage__text {{message}}
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.statusMessage {
  text-align: center;
  // background: #10222b;
  // color: #f6ffe0;
  padding: 0.5em;
}
</style>
