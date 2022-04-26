<template>
  <main>
    <h1>Articles</h1>

    <Error
      v-if="articleStore.error"
      :text="articleStore.error"
      @hide="articleStore.clearError()"
    ></Error>
    <!-- <div v-if="error" class="error">
      {{ error }}
    </div> -->

    <h5>Add new article:</h5>
    <label for="newArticle">Title: </label>
    <input
      type="text"
      name="title"
      id="title"
      v-model="articleStore.newArticle.title"
    />
    <br />
    <label for="newArticle">Text: </label>
    <textarea name="text" id="text" v-model="articleStore.newArticle.text" />
    <br />
    <input
      type="submit"
      value="Submit"
      @click="articleStore.createArticle(articleStore.newArticle)"
    />

    <!-- <select v-model="filterCategory">
      <option value="all">all</option>
      <option value="cryptocurrencies">Cryptocurrencies</option>
      <option value="news">News</option>
    </select> -->
    <p>List of articles</p>

    <div v-if="articleStore.isLoading">Loading articles..</div>
    <ul v-else>
      <li :key="article.id" v-for="article in articleStore.articles">
        <router-link
          :to="{ name: 'article-datail', params: { id: article.id } }"
          >{{ article.title }}
        </router-link>
        <button @click="articleStore.deleteArticle(article.id)">
          {{ articleStore.isDeleting === article.id ? "Deleting.." : "Delete" }}
        </button>
        <button @click="articleStore.editArticle(article, article.id)">
          Edit
        </button>
      </li>
    </ul>
  </main>
</template>

<script>
import config from "../config";
import axios from "axios";
import { useArticleStore } from "../stores/article";
import { mapStores } from "pinia";
import Error from "../components/Error.vue";

export default {
  name: "Articles",
  components: {
    Error,
  },
  data() {
    return {
      // reaktivni promenne
      // articles: [],
      // filterCategory: "",
      // error: null,
      // isLoading: true,
      // isDeleting: false,
      newArticle: {
        title: "",
        text: "",
      },
    };
  },

  created() {
    // metoda komponenty
    this.articleStore.loadData();
  },

  computed: {
    // filteredArticles() {
    //   if (this.filterCategory === "all") {
    //     return this.articles;
    //   } else {
    //     return this.articles.filter(
    //       (article) => article.category === this.filterCategory
    //     );
    //   }
    // },
    ...mapStores(useArticleStore),
  },

  methods: {
    // nase vlastni metody
    // premistene do storu

    async editArticle(data, id) {
      try {
        this.newArticle = data;
        await axios.put(config.backendUrl + "/articles/" + id, data);
        this.error = null;
      } catch {
        this.error = "Cannot edit this article";
      }
    },
  },
};
</script>

<style scoped></style>
