<style  scoped>
    .lock-screen-back {
        border-radius: 50%;
        z-index: -1;
        box-shadow: 0 0 0 0 #667aa6 inset;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: all 3s;
    }

    .tags-con .unlock-con {
        width: 0px;
        height: 0px;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 11000;
    }
    .tags-con .sidebar-menu-con {
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 21;
        transition: width .3s;
    }
    .tags-con .layout-text {
        display: inline-block;
        white-space: nowrap;
        position: absolute;
    }
    .tags-con .tagList-hide-text .layout-text {
        display: none;
    }
    .tagList-content-container {
        position: relative;
    }
    .tagList-header-con {
        box-sizing: border-box;
        position: fixed;
        display: block;
        padding-left: 200px;
        width: 100%;
        height: 100px;
        z-index: 20;
        box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
        transition: padding .3s;
    }
    .tagList-breadcrumb {
        padding: 8px 15px 0;
    }
    .tagList-menu-left {
        background: #464c5b;
        height: 100%;
    }
    .tags-con {
        height: 40px;
        z-index: -1;
        overflow: hidden;
        background: #f0f0f0;
    }
     .tags-con .tags-outer-scroll-con {
        position: relative;
        box-sizing: border-box;
        padding-right: 120px;
        width: 100%;
        height: 100%;
    }
    .tags-con .tags-con .tags-outer-scroll-con .tags-inner-scroll-body {
        position: absolute;
        padding: 2px 10px;
        overflow: visible;
        white-space: nowrap;
        transition: left .3s ease;
    }
    .tags-con .tags-outer-scroll-con .close-all-tag-con {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        /*padding-top: 8px;*/
        text-align: center;
        width: 110px;
        height: 100%;
        /*box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);*/
        z-index: 10;
        background: #e9eaec;
    }


    .tags-con .single-page-con {
        position: absolute;
        top: 100px;
        right: 0;
        bottom: 0;
        overflow: auto;
        background-color: #F0F0F0;
        z-index: 1;
        transition: left .3s;
    }
    .tagList.single-page-con .single-page {
        margin: 10px;
    }
    .main-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .taglist-moving-animation-move {
        transition: transform .3s;
    }
    .logo-con {
        padding: 8px;
        text-align: center;
    }
    .logo-con img {
        height: 44px;
        width: auto;
    }
    .tagList .tags-inner-scroll-body{
        text-align: left;
    }
    .tagList .ivu-tag {
        margin:0;
        /*margin-right:2px;*/
    }


    .tagList .horLable .ivu-tag {
        display: table-cell;
        white-space: nowrap;
    }
    .ivu-select-dropdown {
        max-height:400px;
    }
</style>

<template  >
    <div ref="scrollCon" class="tags-outer-scroll-con">
        <div class="close-all-tag-con">


                <Dropdown trigger="click" style="max-height: 400px" transfer  @on-click="switchoRute">
                    <Icon type="navicon-round" :style="{fontSize:'19px',position:'relative',top:'4px'}"></Icon>
                    <!--</a>-->
                    <DropdownMenu slot="list" >
                        <DropdownItem v-for="(item,i) in pageTagsList" :name="item.path" :key="i">{{item.name}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>


            <Dropdown transfer @on-click="handleTagsOption">
                <Button size="small" type="dashed">
                    标签选项
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="clearTags">关闭所有</DropdownItem>
                    <DropdownItem name="closeOthers">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body horLable" :style="{left: tagBodyLeft + 'px'}">
                <Tag
                    type="dot"
                    v-for="(item,i) in pageTagsList"
                    ref="tagsPageOpened"
                    :key="i"
                    :name="item.name"
                    @on-close="closePage"
                    @click.native="linkTo(item)"
                    :closable="item.path ==='/main'? false : true"
                    :color="item.path === currentPage ? 'blue' : 'default'"
                >{{item.name}}</Tag>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
export default {
    name: 'tagsPageOpened',
    data () {
        return {
            currentPage: this.$route.path,
            pageTagsList:this.$store.state.opendPagesArray,
            tagBodyLeft: 0,
        };
    },
    watch: {
        '$route' (to) {
            this.$store.commit('opendPagesAdd',to);
            this.currentPage = to.path;
        },
    },
    created(){

    },
    methods: {
        handleTagsOption (type) {
            if(type == 'clearTags') {
                this.$store.commit('clearOpendPages')
                this.$router.push('/main')
            }

            if(type ==='closeOthers') {
                this.$store.commit('closeOtherPages', this.currentPage);
                let lastTag  = this.pageTagsList[this.pageTagsList.length - 1];
                this.linkTo(lastTag);
            }

        },
        switchoRute (path) {
            this.$router.replace(path);
        },
        closePage (event, name) {
            this.$store.commit('closeOpendPage', name);
            let lastTag  = this.pageTagsList[this.pageTagsList.length - 1];
            this.linkTo(lastTag);
        },
        linkTo (item) {
            let routerObj = {};
            this.currentPage = item.path;
            if(item.path == '/main') {
              return this.$router.replace('/main');
            }

            this.$router.replace({path:item.path,name:item.name,query:item.query});
        },

    },


};
</script>
