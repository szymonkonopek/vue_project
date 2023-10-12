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
  name: "AppYourFeed",
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
  },
  data() {
    return {
      apiUrl: "/articles/feed",
    };
  },
};
</script>
