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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.endWord__letter {
  background: yellow;
  padding: 0.25em 1em;
  margin: 0.25em;
}
</style>
