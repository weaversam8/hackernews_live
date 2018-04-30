// import modules
import Vue from "vue";
import TopBar from "./TopBar.vue";
import NewsItem from "./NewsItem.vue";
import FooterBar from "./FooterBar.vue";
import LiveNews from "./LiveNews.vue";
import * as firebase from "firebase";

// define the components
Vue.component("TopBar", TopBar);
Vue.component("spacer", {
  template: "<tr style='height:10px'></tr>"
});
Vue.component("news-item", NewsItem);
Vue.component("Footer", FooterBar);
Vue.component("LiveNews", LiveNews);

// create the application
window.App = new Vue({
  el: "#app",
  data: {
    items: []
  }
});
