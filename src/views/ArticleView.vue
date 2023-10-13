<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="isLoading" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <app-article-tag-list :tagList="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes as articleActionTypes } from "@/store/modules/article";
import { getterTypes as authGetterTypes } from "@/store/modules/auth";
import { mapState, mapGetters } from "vuex";
import AppArticleTagList from "@/components/ArticleTagList.vue";

export default {
  name: "AppArticle",
  components: {
    AppArticleTagList,
  },
  computed: {
    ...mapState({
      article: (state) => state.article.data,
    }),
    articleName() {
      return this.$route.params.slug;
    },
    apiUrl() {
      return `/articles/${this.articleName}`;
    },
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }
      return this.currentUser.username === this.article.author.username;
    },
  },
  methods: {
    fetchArticle() {
      this.$store.dispatch(articleActionTypes.getArticle, {
        apiUrl: this.apiUrl,
      });
    },
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.$route.params.slug,
        })
        .then(() => {
          this.$router.push({ name: "home" });
        });
    },
  },

  mounted() {
    this.fetchArticle();
  },
};
</script>
