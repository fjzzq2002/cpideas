<template>
  <span>
    <div :style="{ display: flow?'inline':'flex' }">
    <span v-html="flow?'':'◼'" :style="{paddingRight: '3px', marginTop: '-4px', display:flow?'none':'block', color: idea.color[1]}"></span>
    <span :style="{ backgroundColor: idea.color[0], lineHeight: flow?'1.4':'1.3', display: flow?'inline':'block' }">{{
      idea.text[lang].trim()
    }}</span
    ></div>&nbsp;</span
  >
</template>
<script>
export default {
  name: "IdeaComponent",
  props: {
    idea: Object,
    lang: Number,
    flow: Number
  },
};
</script>
<style scoped>
span {
  word-wrap: break-word;
}
</style>
