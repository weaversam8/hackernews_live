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

// number of stories to display
const NUMBER_TO_DISPLAY = 30;

// run once the component is created
const initialize = function() {
  // store the db for later
  this.db = firebase.database().ref("v0");

  // subscribe to updates on the top stories link
  this.db.child(this.type).on(
    "value",
    function(stories) {
      stories = stories.val();
      // get the first thirty
      stories = stories.slice(0, NUMBER_TO_DISPLAY);

      if (this.items.length == NUMBER_TO_DISPLAY) {
        for (let i = 0; i < 30; i++) this.items[i].id = stories[i];
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
            story: true,
            grayscale: 1,
            grayscaleComments: 0.9
          };
        });

        this.items = stories;
      }
    }.bind(this)
  );
};

export default {
  props: ["type"],
  created: initialize,
  data: () => {
    return { items: [] };
  }
};
