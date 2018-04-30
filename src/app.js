// import modules
import moment from "moment";
import Vue from "vue";
import NewsItem from "./NewsItem.vue";
import * as firebase from "firebase";

// initialize the firebase app
firebase.initializeApp({
  databaseURL: "https://hacker-news.firebaseio.com"
});

// initialize the database
window.db = firebase.database().ref("v0");

// make libraries available
Vue.prototype.moment = moment;

window.extractHostname = function(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("://") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
};

// https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
window.extractRootDomain = function(url) {
  var domain = window.extractHostname(url),
    splitArr = domain.split("."),
    arrLen = splitArr.length;

  //extracting the root domain here
  //if there is a subdomain
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + "." + splitArr[arrLen - 1];
    //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
      //this is using a ccTLD
      domain = splitArr[arrLen - 3] + "." + domain;
    }
  }
  return domain;
};

Vue.prototype.extractRootDomain = window.extractRootDomain;

// define the component for a news item
Vue.component("news-item", NewsItem);

window.App = new Vue({
  el: "#app",
  data: {
    items: []
  }
});

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

window.db
  .child("topstories")
  .on("value", best => bestStoriesUpdated(best.val()));
