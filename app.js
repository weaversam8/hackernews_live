// initialize the database
window.db = firebase.database().ref("v0");

// define the component for a news item
// by the way this is hideous and gross and I know.
Vue.component("news-item", {
  props: ["item", "index"],
  created: function() {
    // in this we fetch the data based off the ID passed to the item

    window.db
      .child("item")
      .child(this.item.id)
      .once("value")
      .then(
        function(fbItem) {
          let data = fbItem.val();
          this.item.title = data.title;
          console.log(this);
        }.bind(this)
      );
  },
  template:
    "<div>" +
    "<!-- Item title line -->" +
    "<tr class='athing' :id='item.id'>" +
    "<td align='right' valign='top' class='title'>" +
    "<span class='rank'>{{index+1}}.</span>" +
    "</td>" +
    "<td valign='top' class='votelinks'>" +
    "<center>" +
    "<a :id='\"up_\" + item.id' onclick='return' href='#'>" +
    "<div class='votearrow' title='upvote'></div>" +
    "</a>" +
    "</center>" +
    "</td>" +
    "<td class='title'>" +
    "<a :href='item.href' class='storylink'>{{item.title}}</a>" +
    "<span class='sitebit comhead'> (" +
    "<a :href='\"from?site=\" + item.domain'>" +
    "<span class='sitestr'>{{item.domain}}</span>" +
    "</a>)</span>" +
    "</td>" +
    "</tr>" +
    "<!-- Item comment line -->" +
    "<tr>" +
    "<td colspan='2'></td>" +
    "<td class='subtext'>" +
    "<span class='score' :id='\"score_\" + item.id'>{{item.pointCount}} points</span> by " +
    "<a :href='\"user?id=\" + item.username' class='hnuser'>{{item.username}}</a>" +
    "<span class='age'>" +
    "<a :href='\"item?id=\" + item.id'> {{item.age}}</a>" +
    "</span>" +
    "<span :id='\"unv_\" + item.id'></span> | " +
    "<a href='#'>flag</a> | " +
    "<a href='#' onclick='return'>hide</a> | " +
    "<a :href='\"item?id=\" + item.id'>{{item.commentCount}}&nbsp;comments</a>" +
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
  stories = stories.map(story => {
    return {
      title: "Test Title",
      id: story,
      domain: "example.com",
      age: "0 minutes ago",
      username: "AlphaWeaver",
      commentCount: story,
      pointCount: 999
    };
  });

  window.App.items = stories;
};

window.db
  .child("topstories")
  .on("value", best => bestStoriesUpdated(best.val()));
