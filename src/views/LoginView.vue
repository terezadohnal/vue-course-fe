<template>
  <h1>Login</h1>
  <div v-if="userStore.loginMessage">{{ userStore.loginMessage }}</div>
  <button @click="login()">Log in</button>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { mapStores } from "pinia/dist/pinia";

export default {
  name: "Login",
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async login() {
      await this.userStore.login("terka", "heslo");
      if (!this.userStore.error) {
        this.$router.push(
          this.userStore.afterLoginRoute ?? { name: "articles" }
        ); // pokud je prvni null, pouzije se druhe
      }
      this.userStore.setAfterLoginRoute(null); // aby se uzi nepresmeroval nekam opakovane
    },
  },
};
</script>
