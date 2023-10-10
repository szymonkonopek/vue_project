<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happed</div>

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
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
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
      <app-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :url="baseUrl"
        :current-page="currentPage"
      >
      </app-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { limit } from "@/helpers/vars";
import AppPagination from "@/components/Pagination.vue";
import { actionTypes } from "@/store/modules/feed";
import QueryString from "query-string";

export default {
  name: "McvFeed",
  components: {
    AppPagination,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    limit() {
      return limit;
    },
    baseUrl() {
      return this.$route.path;
    },
    currentPage() {
      console.log(this.$route.query.page);
      return Number(this.$route.query.page) || "1";
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },

  mounted() {
    this.fetchFeed();
  },

  methods: {
    fetchFeed() {
      const parsedUrl = QueryString.parseUrl(this.apiUrl);
      const stringifiedParams = QueryString.stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
    },
  },
};
</script>
