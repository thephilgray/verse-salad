<template lang="pug">
    .userPoemPreview
        p.userPoemPreview__line(v-for="line in userPoem") {{line}}
</template>

<script>
export default {
  props: {
    userPoem: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style lang="scss" scoped>
.userPoemPreview {
  width: 100%;
  padding: 0.5em;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0.5;
}
.userPoemPreview__line {
  text-align: center;
}
</style>
