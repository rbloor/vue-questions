<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="indigo" dark disable-resize-watcher>
      <v-list>
        <v-list-item :to="{ name: 'Login' }" v-if="!isLoggedIn">
          <v-list-item-content>Login</v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'Register' }" v-if="!isLoggedIn">
          <v-list-item-content>Register</v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'Dashboard' }" v-if="isLoggedIn">
          <v-list-item-content>Dashboard</v-list-item-content>
        </v-list-item>
        <v-list-item to="/quiz" v-if="isLoggedIn">
          <v-list-item-content>Take Quiz</v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout" v-if="isLoggedIn">
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-toolbar-title>Question Bank</v-toolbar-title>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn to="/" v-if="isLoggedIn" text class="hidden-sm-and-down">Home</v-btn>
      <v-btn :to="{ name: 'Login' }" v-if="!isLoggedIn" text class="hidden-sm-and-down">Login</v-btn>
      <v-btn :to="{ name: 'Register' }" v-if="!isLoggedIn" text class="hidden-sm-and-down">Register</v-btn>
      <v-btn to="/quiz" v-if="isLoggedIn" text class="hidden-sm-and-down">Take Quiz</v-btn>
      <v-btn :to="{ name: 'QuestionList' }" v-if="isLoggedIn" text class="hidden-sm-and-down">Questions</v-btn>
      <v-btn :to="{ name: 'CategoryList' }" v-if="isLoggedIn" text class="hidden-sm-and-down">Categories</v-btn>
      <v-btn @click="logout" v-if="isLoggedIn" text class="hidden-sm-and-down">Logout</v-btn>
    </v-app-bar>
  </span>
</template>

<script>
import User from "../apis/User"

export default {
  name: "AppNavigation",
  data() {
    return {
      drawer: false,
      isLoggedIn: false
    }
  },
  mounted() {
    this.$root.$on("login", () => {
      this.isLoggedIn = true
    })
    this.isLoggedIn = !!localStorage.getItem("user")
  },
  methods: {
    logout() {
      User.logout().then(() => {
        this.isLoggedIn = false
        this.$store.dispatch("logout")
        this.$router.push({ name: "Login" })
      })
    }
  }
}
</script>

<style scoped></style>
