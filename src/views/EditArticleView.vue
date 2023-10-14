<template>
  <div>
    <app-article-form
      v-if="initialValues"
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
import { actionTypes } from "@/store/modules/editArticle";
export default {
  name: "AppEditArticle",
  components: {
    AppArticleForm,
  },

  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug;
      this.$store
        .dispatch(actionTypes.updateArticle, { articleInput, slug })
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
      validationErrors: (state) => state.editArticle.validationErrors,
      isSubmitting: (state) => state.editArticle.isSubmitting,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
    }),
    initialValues() {
      if (!this.article) {
        return null;
      }
      return {
        title: this.article.title,
        body: this.article.body,
        description: this.article.description,
        tagList: this.article.tagList,
      };
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: `/articles/${this.$route.params.slug}`,
    });
  },
};
</script>
