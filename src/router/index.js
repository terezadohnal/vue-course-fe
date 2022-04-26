import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ArticlesView from "../views/ArticlesView.vue";
import ArticleDetailView from "../views/ArticleDetailView.vue";
import AboutView from "../views/AboutView.vue";
import AuthSection from "../AuthSection.vue";
import { useUserStore } from "../stores/UserStore";
import LoginView from "../views/LoginView.vue";
// import Example from "../views/Example.vue";

// views - samostatne stranky
// components - komponenty pouzitelne na strankach / views

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // zapina vyuziti history api v prohlizeci -> jsme stale na stejne strance, ale muze upravovat URL adresu a zmeni svuj obsah
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthSection,
      beforeEnter: checkAuthentication, // funkce, ktera se vola pokazne, nez vstoupina na children routy
      children: [
        {
          path: "articles", // nesmi byt /, aby to navazovalo na home route
          name: "articles",
          component: ArticlesView,
        },
        {
          path: "articles/:id",
          name: "article-datail",
          component: ArticleDetailView,
        },
      ],
    },

    // {
    //   path: '/example',
    //   name: 'example',
    //   component: Example
    // }
  ],
});

function checkAuthentication(to, from, next) {
  // zdrojova route, cilova route, dalsi route
  // middleware
  const store = useUserStore();
  if (store.isAuthenticated) {
    // overeni prihlaseni
    next(); // router vi, ze muze zobrazit children komponentu
  } else {
    store.setLoginMessage("To access articles you must log in."); // uvidime ji jen kdyz pujdeme pres articles
    store.setAfterLoginRoute(to); // to - cilova route, kde smeruje
    next({ name: "login" }); // pokud uzi neni prihlaseny a chce jit treba na clanky, ktere nema pristupne, zobrazi se mu misto toho login
  }
}
export default router;
