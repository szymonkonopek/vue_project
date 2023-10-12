<template>
  <div>
    <app-loading v-if="isLoading">Loading....</app-loading>
    <app-error-message v-if="error"></app-error-message>
    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{ name: 'tag', params: { slug: popularTag } }"
          class="tag-default tag-pill"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/popularTags";
import AppLoading from "@/components/Loading.vue";
import AppErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "AppPopularTags",
  components: {
    AppLoading,
    AppErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      popularTags: (state) => state.popularTags.data,
      error: (state) => state.popularTags.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags);
  },
};
</script>
