// import modules
import Vue from "vue";
import TopBar from "./TopBar.vue";
import NewsItem from "./NewsItem.vue";
import FooterBar from "./FooterBar.vue";
import * as firebase from "firebase";

// initialize the firebase app
firebase.initializeApp({
  databaseURL: "https://hacker-news.firebaseio.com"
});

// initialize the database
window.db = firebase.database().ref("v0");

// define the components
Vue.component("TopBar", TopBar);
Vue.component("spacer", {
  template: "<tr style='height:10px'></tr>"
});
Vue.component("news-item", NewsItem);
Vue.component("Footer", FooterBar);

// create the application
window.App = new Vue({
  el: "#app",
  data: {
    items: []
  }
});

// create the hooks for firebase updates
window.bestStoriesUpdated = function(stories) {
  stories = stories.slice(0, 30);

  if (window.App.items.length == 30) {
    for (let i = 0; i < 30; i++) window.App.items[i].id = stories[i];
  } else {
    stories = stories.map(story => {
      return {
        title: "Loading",
        id: story,
        href: "example.com",
        age: new Date(),
        username: "loading",
        commentText: "loading",
        pointCount: "loading",
        story: true
      };
    });

    window.App.items = stories;
  }
};

// subscribe to updates on the top stories link
window.db
  .child("topstories")
  .on("value", best => bestStoriesUpdated(best.val()));
