// initialize the database
window.db = firebase.database().ref("v0");

// define the component for a news item
// by the way this is hideous and gross and I know.
Vue.component("news-item", {
  props: ["item", "index"],
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
    items: [
      {
        title: "Test",
        id: 123,
        rank: 1,
        domain: "example.com",
        age: "0 minutes ago",
        username: "AlphaWeaver",
        commentCount: 999,
        pointCount: 999
      }
    ]
  }
});
