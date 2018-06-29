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
