<template>
  <div class="home-page">
    Banner
    <div class="container page">
      <div class="row">
        <div class="col-md-9">Feed</div>
        <div class="col-md-3">Popular Task</div>
      </div>
      <app-feed :api-url="apiUrl"></app-feed>
    </div>
  </div>
</template>

<script>
import AppFeed from "@/components/Feed.vue";
export default {
  name: "AppGlobalFeed",
  components: {
    AppFeed,
  },
  data() {
    return {
      apiUrl: "/articles",
    };
  },
};
</script>
