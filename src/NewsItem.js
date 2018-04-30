import Vue from "vue";
import * as firebase from "firebase";
import { CSSPlugin, EasePack, TweenLite } from "gsap";

const storyUpdateFunction = function(fbItem) {
  console.log("Story #" + this.item.id + " updated.");
  let data = fbItem.val();
  // console.log(data);
  this.item.title = data.title;
  this.item.pointCount = data.score;
  this.item.commentText =
    data.descendants == 0 ? "discuss" : data.descendants + " comments";
  this.item.username = data.by;
  this.item.time = new Date(1000 * data.time);
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

  window.db
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

  window.db
    .child("item")
    .child(this.item.id)
    .off("value");
};

export default {
  props: ["item", "index"],
  created: newsLoadFunction,
  beforeDestroy: newsUnloadFunction
};
