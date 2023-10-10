<template>
  <div id="app">
    <app-topbar></app-topbar>
    <router-view></router-view>
    <!-- <h1>foooter</h1> -->
  </div>
</template>

<script>
import AppTopbar from "@/components/Topbar.vue";
import { actionTypes } from "@/store/modules/auth";
export default {
  name: "App",
  components: {
    AppTopbar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
};
</script>

<style></style>
