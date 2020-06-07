<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="card">
      <div class="card-body" v-if="user">
        <h3>Hello, {{ user.name }}</h3>
        <span>{{ user.email }}</span>
      </div>
    </div>
  </div>
</template>

<script>
//import User from "../apis/User";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"])
  }
};
</script>
