<template lang="pug">
.endWord__wrapper
  transition(name="drop")
    .endWord
        span.endWord__letter(v-for="letter in lettersArray")
            h2 {{letter}}
      
</template>
<script>
export default {
  props: {
    word: {
      type: String,
      default: ""
    }
  },
  computed: {
    lettersArray() {
      return this.word.split("");
    }
  }
};
</script>
<style lang="scss" scoped>
.endWord {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.endWord__letter {
  background: #bdd684;
  color: #10222b;
  padding: 0.25em 1em;
  margin: 0.25em;
}

.drop-enter-active {
  animation: drop-in 300ms cubic-bezier(0.17, 0.67, 0.34, 1.54);
}
.drop-leave-active {
  animation: drop-in 300ms cubic-bezier(0.17, 0.67, 0.34, 1.54) reverse;
}
@keyframes drop-in {
  0% {
    transform: translateY(-10%);
  }
  50% {
    transform: translateY(0) scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
