import { defineStore } from "pinia";
import axios from "axios";
import config from "../config";

export const useArticleStore = defineStore("article", {
  state: () => ({
    articles: [],
    isLoading: true,
    error: null,
    isDeleting: null,
    newArticle: {
      title: "",
      text: "",
    },
  }),

  getters: {
    // 2 funkce v sobe, abychom byli schopni predat do getter u id
    getById: (state) => (id) => state.articles.find((a) => a.id === id),
  },

  actions: {
    async loadData() {
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + "/articles");
        this.articles = response.data;
        console.log(response);
        this.error = null;
      } catch (e) {
        console.error(e);
        this.error = "Cannot fetch articles";
      }

      this.isLoading = false;
    },

    async loadById(id) {
      // id clanku, ktery chceme nacist
      try {
        this.isLoading = true;
        const response = await axios.get(config.backendUrl + "/articles/" + id);
        this.addOrUpdateInStore(id, response.data);
        this.error = null;
      } catch {
        this.error = "Cannot fetch articles";
      }

      this.isLoading = false;
    },

    addOrUpdateInStore(id, article) {
      // zaruci se, ze pole articlu bude obsahovat aktualni clanky
      const index = this.articles.findIndex((a) => a.id === id);

      if (index !== -1) {
        this.articles[index] = article;
      } else {
        this.articles.push(article);
      }
    },

    async createArticle(data) {
      try {
        const response = await axios.post(
          config.backendUrl + "/articles",
          data
        );
        this.articles.push(response.data);
        this.error = null;
        this.newArticle = {
          title: "",
          text: "",
        };
      } catch {
        this.error = "Cannot add new article";
      }
    },

    async deleteArticle(id) {
      try {
        this.isDeleting = id; // abychom to mazani mohli priradit ke clanku
        await axios.delete(config.backendUrl + "/articles/" + id); // smaze pouze clanek z backendu

        // delete na FE
        const index = this.articles.findIndex((a) => a.id == id);
        this.articles.splice(index, 1);
        this.error = null;
      } catch {
        this.error = "Cannot delete article";
      }
      this.isDeleting = false;
    },

    clearError() {
      this.error = null;
    },
  },
});
