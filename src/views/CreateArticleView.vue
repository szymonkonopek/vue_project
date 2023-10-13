<template>
  <div>
    Create
    <app-article-form
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    >
    </app-article-form>
  </div>
</template>

<script>
import AppArticleForm from "@/components/ArticleForm.vue";
export default {
  name: "AppCreateArticle",
  components: {
    AppArticleForm,
  },
  data() {
    return {
      initialValues: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      validationErrors: null,
      isSubmitting: false,
      title: "",
      description: "",
      body: "",
      tagList: "",
    };
  },
  methods: {
    onSubmit(data) {
      console.log(data);
    },
  },
};
</script>
