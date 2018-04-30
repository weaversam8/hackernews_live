import Vue from "vue";
import moment from "moment";
import * as firebase from "firebase";
import { CSSPlugin, EasePack, TweenLite } from "gsap";
import * as tldjs from "tldjs";

const storyUpdateFunction = function(fbItem) {
  console.log("Story #" + this.item.id + " updated.");

  // extract the data from the firebase object
  let data = fbItem.val();

  // these are used to animate the vote and comment buttons
  this.grayscale = 1;
  this.grayscaleComments = 0.9;

  // copy in the relevant information
  this.item.title = data.title;
  this.item.pointCount = data.score;
  this.item.commentCount = data.descendants;
  this.item.commentText =
    data.descendants == 0 ? "discuss" : data.descendants + " comments";
  this.item.username = data.by;
  this.item.time = new Date(1000 * data.time);
  this.ageHuman = moment(this.item.time).fromNow();
  this.item.story = data.type == "story";
  this.item.href = data.url;

  if (!data.url) {
    this.item.href = "https://news.ycombinator.com/item?id=" + this.item.id;
    this.item.text = true;
  }
};

const newsLoadFunction = function() {
  // in this we attach a listener for the
  // data based off the ID passed to the item

  console.log("Story #" + this.item.id + " is now listening for updates.");

  this.db
    .child("item")
    .child(this.item.id)
    .on("value", storyUpdateFunction.bind(this));
};

const newsUnloadFunction = function() {
  // in this we detach the listener attached on load

  // if for some reason we never had an item, we can ignore it
  if (!this.item) return;

  console.log(
    "Story #" + this.item.id + " is no longer listening for updates."
  );

  this.db
    .child("item")
    .child(this.item.id)
    .off("value", storyUpdateFunction.bind(this));
};

export default {
  props: ["db", "item", "index"],
  created: newsLoadFunction,
  beforeDestroy: newsUnloadFunction,
  computed: {
    domain: function() {
      return tldjs.parse(this.item.href).domain;
    }
  },
  watch: {
    "item.pointCount": function(newValue) {
      this.grayscale = 0;
      // tween
      TweenLite.to(this, 1, {
        grayscale: 1.0,
        onUpdate: function() {
          this.$forceUpdate();
        }.bind(this)
      });
    },
    "item.commentText": function(newValue) {
      this.grayscaleComments = 0;
      // tween
      TweenLite.to(this, 1, {
        grayscaleComments: 0.9,
        onUpdate: function() {
          this.$forceUpdate();
        }.bind(this)
      });
    },
    "item.time": function(newValue) {
      this.ageHuman = moment(newValue).fromNow();
    }
  }
};
