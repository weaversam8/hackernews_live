<template>
    <table id="hnmain" border="0" cellpadding="0" cellspacing="0" width="85%" bgcolor="#f6f6ef">
        <tbody>
            <!-- Top Bar -->
            <tr is="TopBar"></tr>
            <tr is="spacer"></tr>
            <!-- News entries -->
            <tr>
                <td>
                    <transition-group name="news-list" tag="table" border="0" cellpadding="0" cellspacing="0" class="itemlist">
                        <news-item v-for="(item, index) in items" v-bind:db="db" v-bind:item="item" v-bind:index="index" v-bind:key="item.id"></news-item>
                        <tr class="morespace" style="height:10px"></tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="title">
                                <a href="news?p=2" class="morelink" rel="nofollow">More</a>
                            </td>
                        </tr>
                    </transition-group>
                </td>
            </tr>
            <!-- Footer -->
            <tr is="Footer"></tr>
        </tbody>
    </table>
</template>
<script src="./LiveNews.js"></script>
