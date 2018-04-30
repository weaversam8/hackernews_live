<template>
    <tr>
        <td bgcolor="#ff6600">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding:2px">
                <tr>
                    <!-- Logo -->
                    <td style="width:18px;padding-right:4px">
                        <a href="https://news.ycombinator.com">
                            <img src="https://news.ycombinator.com/y18.gif" width="18" height="18" style="border:1px white solid;">
                        </a>
                    </td>
                    <!-- Menubar -->
                    <td style="line-height:12pt; height:10px;">
                        <span class="pagetop">
                            <b class="hnname">
                                <router-link to="/">Hacker News
                                </router-link>
                                <a href="https://github.com/weaversam8/hackernews_live">
                                    <u>Live</u>
                                </a>
                            </b>
                            <router-link to="/newest">new</router-link> |
                                        <!-- <a href="newcomments">comments</a> | -->
                                        <router-link to="/show">show</router-link> |
                                        <router-link to="/ask">ask</router-link> |
                                        <router-link to="/jobs">jobs</router-link>
                                        <!-- <a href="submit">submit</a> -->
                        </span>
                    </td>
                    <!-- Login link -->
                    <td style="text-align:right;padding-right:4px;">
                        <span class="pagetop">
                            <a href="#">login unsupported</a>
                        </span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</template>