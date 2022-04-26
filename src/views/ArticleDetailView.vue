<template>
  <main>
    <Error
      v-if="articleStore.error"
      :text="articleStore.error"
      @hide="articleStore.clearError()"
    ></Error>
    <div v-if="articleStore.isLoading">Loading article..</div>
    <div v-else>
      <h1>Article {{ article.title }}</h1>
      <p>{{ article.text }}</p>
    </div>
  </main>
</template>

<script>
import { mapStores } from "pinia";
import { useArticleStore } from "../stores/article";
import Error from "../components/Error.vue";

export default {
  name: "ArticleDetail",

  components: {
    Error,
  },

  created() {
    this.articleStore.loadById(this.id);
  },

  computed: {
    ...mapStores(useArticleStore),
    id() {
      return parseInt(this.$route.params.id);
    },
    article() {
      return this.articleStore.getById(this.id);
    },
  },
};
</script>
