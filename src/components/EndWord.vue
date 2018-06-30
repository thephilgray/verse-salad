<template lang="pug">
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
</style>
