<template>
  <div>
    <!-- Item title line -->
    <tr class='athing' :id='item.id'>
      <td align='right' valign='top' class='title'>
        <span class='rank'>{{index+1}}.</span>
      </td>
      <td valign='top' class='votelinks'>
        <center>
          <a :id='"up_" + item.id' onclick='return alert(\"Voting not currently supported.\")' href='#'>
            <div class='votearrow' title='upvote' v-bind:style="{ filter: 'grayscale(' + grayscale + ')' }"></div>
          </a>
        </center>
      </td>
      <td class='title'>
        <a :href='item.href' class='storylink'>{{item.title}}</a>
        <span v-if='!item.text' class='sitebit comhead'> (<a :href='"from?site=" + domain'><span class='sitestr'>{{domain}}</span></a>)</span>
      </td>
    </tr>
    <!-- Item comment line -->
    <tr>
      <td colspan='2'></td>
      <td class='subtext' v-if='item.story'>
        <span v-if='item.story' class='score' :id='"score_" + item.id'>{{item.pointCount}} points by </span>
        <a v-if='item.story' :href='"user?id= " + item.username' class='hnuser'>{{item.username}}</a>
        <span class='age'>
          <a :href='"item?id=" + item.id'> {{ageHuman}}</a>
        </span>
        <span :id='"unv_ " + item.id'></span> |
        <a href='#'>flag</a> |
        <a href='#' onclick='return'>hide</a> |
        <a :href='"item?id=" + item.id' v-bind:style='{ color:"#ff9900", fontWeight:"bold", filter:"grayscale(" + grayscaleComments + ")" }'>{{item.commentText}}</a>
      </td>
      <td class='subtext' v-if='!item.story'>
        <span class='age'>
          <a :href='"item?id=" + item.id'> {{ageHuman}} | </a>
        </span>
        <a href='#' onclick='return'>hide</a>
      </td>
    </tr>
    <tr class='spacer' style='height:5px'></tr>
  </div>
</template>
<script src="./NewsItem.js"></script>