// import modules
import Vue from "vue";
import VueRouter from "vue-router";
import TopBar from "./TopBar.vue";
import NewsItem from "./NewsItem.vue";
import FooterBar from "./FooterBar.vue";
import LiveNews from "./LiveNews.vue";
import * as firebase from "firebase";

// set up the router
Vue.use(VueRouter);

// define the components
Vue.component("TopBar", TopBar);
Vue.component("spacer", {
  template: "<tr style='height:10px'></tr>"
});
Vue.component("news-item", NewsItem);
Vue.component("Footer", FooterBar);
Vue.component("LiveNews", LiveNews);

// create the routes
const routes = [
  {
    path: "/news",
    component: LiveNews,
    props: { type: "topstories" },
    alias: ["/", "index.html"]
  },
  {
    path: "/newest",
    component: LiveNews,
    props: { type: "newstories" }
  },
  {
    path: "/show",
    component: LiveNews,
    props: { type: "showstories" }
  },
  {
    path: "/ask",
    component: LiveNews,
    props: { type: "askstories" }
  },
  {
    path: "/jobs",
    component: LiveNews,
    props: { type: "jobstories" }
  }
];

// create the router
const router = new VueRouter({
  routes // short for `routes: routes`
  // mode: "history"
});

// create the application
window.App = new Vue({
  router
}).$mount("#app");
