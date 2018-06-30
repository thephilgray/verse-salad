<template lang="pug">
    .userPoemPreview(:class="{'--writing': writingMode}")
      slot(name="LinesComplete")
      .userPoemPreview__contentBox
        transition-group(name="slide-up" mode="in-out" tag="div" v-if="userPoem.length > 0")
          p.userPoemPreview__line(v-for="line in userPoem" :key="line") {{line}}
</template>

<script>
export default {
  props: {
    userPoem: {
      type: Array,
      default: () => []
    },
    writingMode: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.userPoemPreview {
  width: 100%;

  background: #10222b;
  color: #f6ffe0;
  position: relative;
  padding: 1em;
}
.userPoemPreview.--writing {
  padding: 0;
  margin-bottom: 0;
  overflow: hidden;
  height: 4em;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    margin: 0;
    height: 60%;
    z-index: 100;
    /* "transparent" only works here because == rgba(0,0,0,0) */
    background-image: linear-gradient(to top, transparent, #10222b 35%);
  }
}

.--writing .userPoemPreview__contentBox {
  position: absolute;

  bottom: 0%;
  width: 100%;
  margin: 0;
  left: 0;
  padding: 1em 0 0;
}

.userPoemPreview__line {
  text-align: center;
  line-height: 1.4;
  padding: 0;
  margin: 0;
}

.lineNumber {
  position: absolute;
  padding: 0.5em;
  color: white;
  z-index: 101;
}

.slide-up-item {
  display: inline-block;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 100ms cubic-bezier(0.17, 0.67, 0.34, 1.54);
}

.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
