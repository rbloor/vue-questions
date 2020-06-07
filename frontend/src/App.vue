<template>
  <v-app>
    <app-navigation></app-navigation>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppNavigation from "@/components/AppNavigation";
import AppFooter from "@/components/AppFooter";

export default {
  name: "App",

  components: {
    AppNavigation,
    AppFooter
  }
};
</script>
