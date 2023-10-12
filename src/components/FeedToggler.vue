<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          :to="{ name: 'yourFeed' }"
          class="nav-link"
          :class="{ active: routeName == 'yourFeed' }"
        >
          Your Feed
        </router-link>
      </li>

      <li class="nav-item">
        <router-link
          :to="{ name: 'home' }"
          class="nav-link"
          :class="{ active: routeName == 'home' }"
        >
          Global Feed
        </router-link>
      </li>

      <li class="nav-item" v-if="tagName">
        <router-link
          :to="{ name: 'home' }"
          class="nav-link"
          :class="{ active: routeName == 'tag' }"
        >
          <i class="ion-pound" />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getterTypes } from "@/store/modules/auth";
export default {
  name: "AppFeedToggler",
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
    }),
    routeName() {
      return this.$route.name;
    },
  },
};
</script>
