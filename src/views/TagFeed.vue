<template>
  <div class="home-page">
    <app-banner></app-banner>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-toggler :tagName="tagName"></app-feed-toggler>
          <app-feed :api-url="apiUrl"></app-feed>
        </div>
        <div class="col-md-3"><app-popular-tags></app-popular-tags></div>
        {{ tagName }}
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from "@/components/Feed.vue";
import AppPopularTags from "@/components/PopularTags.vue";
import AppBanner from "@/components/Banner.vue";
import AppFeedToggler from "@/components/FeedToggler.vue";
export default {
  name: "AppTagFeed",
  components: {
    AppFeed,
    AppPopularTags,
    AppBanner,
    AppFeedToggler,
  },
  computed: {
    tagName() {
      return this.$route.params.slug;
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`;
    },
  },
};
</script>
