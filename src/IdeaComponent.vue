<template>
  <span>
    <span :style="{ backgroundColor: idea.color, lineHeight: '1.4' }">{{
      idea.text[lang].trim()
    }}</span
    >&nbsp;</span
  >
</template>
<script>
export default {
  name: "IdeaComponent",
  props: {
    idea: Object,
    lang: Number,
  },
};
</script>
<style scoped>
span {
  word-wrap: break-word;
}
</style>
