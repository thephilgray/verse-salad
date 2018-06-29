<template lang="pug">
    form.currentLine(@submit.prevent)
        label.currentLine__label.--sr-only(for="currentLine") Current Line
        input.currentLine__textInput(type="text" name="currentLine" v-model="line" ref="currentLine" @keyup="handleKeyUp" autocomplete="off" autofocus disalbed="isValid")
</template>

<script>
export default {
  props: {
    lastWord: {
      type: String,
      default: ""
    },
    isValid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      line: ""
    };
  },
  mounted() {
    this.setFocus();
  },
  methods: {
    handleKeyUp: function(e) {
      this.$emit("onUpdateCurrentLine", {
        keycode: e.keyCode,
        currentInput: this.line
      });
      if (e.keyCode === 13 && this.isValid) {
        this.line = "";
      }
    },
    setFocus() {
      this.$refs.currentLine.focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.currentLine {
  width: 100%;
}
.currentLine__textInput {
  width: 100%;
  padding: 1em;
  text-align: center;
}
</style>
