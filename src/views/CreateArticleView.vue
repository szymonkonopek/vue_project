<template>
  <div>
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
import { mapState } from "vuex";
import AppArticleForm from "@/components/ArticleForm.vue";
import { actionTypes } from "@/store/modules/createArticle";
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
    };
  },
  methods: {
    onSubmit(articleInput) {
      console.log("art", articleInput);
      this.$store
        .dispatch(actionTypes.createArticle, { articleInput })
        .then((article) => {
          this.$router.push({
            name: "article",
            params: { slug: article.slug },
          });
        });
    },
  },
  computed: {
    ...mapState({
      validationErrors: (state) => state.createArticle.validationErrors,
      isSubmitting: (state) => state.createArticle.isSubmitting,
    }),
  },
};
</script>
