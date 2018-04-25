// initialize the database
window.db = firebase.database().ref("v0");

// make libraries available
Vue.prototype.moment = window.moment;

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

window.storyLoadFunction = function() {
  // in this we fetch the data based off the ID passed to the item

  window.db
    .child("item")
    .child(this.item.id)
    .once("value")
    .then(
      function(fbItem) {
        let data = fbItem.val();
        this.item.title = data.title;
        this.item.pointCount = data.score;
        this.item.commentText =
          data.descendants == 0 ? "discuss" : data.descendants + " comments";
        this.item.username = data.by;
        this.item.time = new Date(1000 * data.time);
        this.item.story = data.type == "story";
        this.item.href = data.url;
        if (!data.url) {
          this.item.href =
            "https://news.ycombinator.com/item?id=" + this.item.id;
          this.item.text = true;
        }
      }.bind(this)
    );
};

// define the component for a news item
// by the way this is hideous and gross and I know.
Vue.component("news-item", {
  props: ["item", "index"],
  created: storyLoadFunction,
  updated: storyLoadFunction,
  template:
    "<div>" +
    "<!-- Item title line -->" +
    "<tr class='athing' :id='item.id'>" +
    "<td align='right' valign='top' class='title'>" +
    "<span class='rank'>{{index+1}}.</span>" +
    "</td>" +
    "<td valign='top' class='votelinks'>" +
    "<center>" +
    "<a :id='\"up_\" + item.id' onclick='return alert(\"Voting not currently supported.\")' href='#'>" +
    "<div class='votearrow' title='upvote'></div>" +
    "</a>" +
    "</center>" +
    "</td>" +
    "<td class='title'>" +
    "<a :href='item.href' class='storylink'>{{item.title}}</a>" +
    "<span v-if='!item.text' class='sitebit comhead'> (" +
    "<a :href='\"from?site=\" + extractRootDomain(item.href)'>" +
    "<span class='sitestr'>{{extractRootDomain(item.href)}}</span>" +
    "</a>)</span>" +
    "</td>" +
    "</tr>" +
    "<!-- Item comment line -->" +
    "<tr>" +
    "<td colspan='2'></td>" +
    "<td class='subtext' v-if='item.story'>" +
    "<span v-if='item.story' class='score' :id='\"score_\" + item.id'>{{item.pointCount}} points by </span>" +
    "<a v-if='item.story' :href='\"user?id=\" + item.username' class='hnuser'>{{item.username}}</a>" +
    "<span class='age'>" +
    "<a :href='\"item?id=\" + item.id'> {{moment(item.time).from(moment())}}</a>" +
    "</span>" +
    "<span :id='\"unv_\" + item.id'></span> | " +
    "<a href='#'>flag</a> | " +
    "<a href='#' onclick='return'>hide</a> | " +
    "<a :href='\"item?id=\" + item.id'>{{item.commentText}}</a>" +
    "</td>" +
    "<td class='subtext' v-if='!item.story'>" +
    "<span class='age'>" +
    "<a :href='\"item?id=\" + item.id'> {{moment(item.time).from(moment())}} | </a>" +
    "</span>" +
    "<a href='#' onclick='return'>hide</a>" +
    "</td>" +
    "</tr>" +
    "<tr class='spacer' style='height:5px'></tr>" +
    "</div>"
});

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
