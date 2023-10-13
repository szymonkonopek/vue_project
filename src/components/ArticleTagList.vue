<template>
  <span class="tag-list">
    <div
      v-for="(tag, index) in tagList"
      :key="index"
      class="tag-default tag-pill tag-outline"
    >
      {{ tag }}
    </div>
  </span>
</template>

<script>
export default {
  name: "appArticleTagList",
  props: {
    tagList: {
      type: Array,
      required: true,
    },
  },
};
</script>
