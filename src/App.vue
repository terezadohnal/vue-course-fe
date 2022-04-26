<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home </router-link> |
    <router-link :to="{ name: 'articles' }">Articles </router-link> |
    <router-link :to="{ name: 'about' }">About</router-link> |
    <button v-if="!userStore.isAuthenticated" @click="login">Log In</button>
    <button v-else @click="logout">Log Out</button>
  </nav>

  <main>
    <router-view />
  </main>
</template>

<script>
import { mapStores } from "pinia/dist/pinia";
import { useUserStore } from "./stores/UserStore";

export default {
  name: "App",

  data() {
    return {
      name: "world",
      showHelp: false,
      names: [],
      newName: "",
      articles: [
        {
          title: "Bitcoin je super.",
          text: "Kupte si Bitcoin",
          views: 1231,
          hidden: false,
        },
        {
          title: "Ethereum je super.",
          text: "Kupte si Ethereum",
          views: 801,
          hidden: false,
        },
        {
          title: "Dogecoin je super.",
          text: "Kupte si Dogecoin",
          views: 125,
          hidden: true,
        },
      ],
    };
  },

  computed: {
    hasAnyNames() {
      return this.names.length > 0;
    },
    ...mapStores(useUserStore),
  },

  methods: {
    addName() {
      this.names.push(this.newName);
      this.newName = "";
    },

    deleteArticle(index) {
      this.articles.splice(index, 1);
    },

    login() {
      this.$router.push({ name: "login" }); // pushneme na konec historie novou stranku login
    },
    logout() {
      this.userStore.logout();
      this.$router.push({ name: "home" }); // presmerovani
    },
  },
};
</script>

<style scoped>
th,
td {
  border: 1px solid lightgray;
}
.article {
  color: darkcyan;
}
.article.hidden {
  color: gray;
}
</style>
