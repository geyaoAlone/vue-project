<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    .ivu-layout {
        height: 100%;
    }
    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }
    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon {
        transition: all .3s;
    }
    .rotate-icon {
        transform: rotate(-90deg);
    }
    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .ivu-menu {
        width: 100% !important;
    }
    .logo-con {
        padding: 18px;
        text-align: center;
    }
    .header-avator-con {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        display: flex;
        width: 300px;
        align-items: center;
        justify-content: flex-end;
    }
    .avator-item {
        margin: 0 10px;
    }
    .ivu-layout-content {
        overflow-y: auto;
    }
    .ivu-layout-header {
        height: auto;
        padding: 0;
    }
    .barList {
        height: 60px;
    }
    .tagList {
        height: 34px;
        line-height: 34px;
        background: #e9eaec;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <div class="logo-con">
                    <img src="../img/logo-rxt.png">
                </div>
                <Menus></Menus>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                    <div class="barList" :style="{padding: 0,position:'relative'}">
                        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0',float:'left',cursor:'pointer'}" type="navicon-round" size="24"></Icon>
                        <Breadcrumb :style="{position:'absolute',left:'77px'}">
                            <Breadcrumb-item href="/main">首页</Breadcrumb-item>
                            <Breadcrumb-item v-for="item in nameArr" :key="item">{{item}}</Breadcrumb-item>
                            <!--<Breadcrumb-item>Breadcrumb</Breadcrumb-item>-->
                        </Breadcrumb>

                        <div class="header-avator-con">

                            <fullScreen v-model="isFullScreen" class="avator-item" :style="{marginTop:'10px'}"></fullScreen>
                            <div class="user-dropdown-menu-con avator-item">
                                <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                                    <Dropdown transfer trigger="click" @on-click="">
                                        <a href="javascript:void(0)">
                                            <span class="main-user-name">admin</span>
                                            <Icon type="arrow-down-b"></Icon>
                                        </a>
                                        <DropdownMenu slot="list">
                                            <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                            <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>

                                </Row>
                            </div>
                            <div class="avator-item">
                                <Avatar style="background-color: #87d068" icon="person" />

                            </div>

                        </div>
                    </div>
                    <div class="tagList tags-con">
                        <tagsPageOpened></tagsPageOpened>
                    </div>

                </Header>
                <Content>
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive" ></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive" :key="nowTime"></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import fullScreen from './main-components/fullscreen.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import Menus from './main-components/menu.vue'
    import { appRouterMap } from './../router'
    export default {
        components: {
            fullScreen,
            tagsPageOpened,
            Menus
        },
        data() {
            return {
                isCollapsed: false,
                isFullScreen: false,
                nameArr: [],
                nowTime:new Date().getTime()

            }
        },
        computed: {
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },

        },
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            }

        },
        created() {
//                console.info(appRouterMap)
        },
        watch: {
            '$route' (to) {
                let getPathName = path => {
                    let pathArr = path.split('/');

                    let nameArr = pathArr.map(value => {
                        return appRouterMap[value];
                    })
                    return nameArr;
                }

                let trimSpace = array => {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == "" || typeof (array[i]) == "undefined") {
                            array.splice(i, 1);
                            i = i - 1;

                        }
                    }
                    return array;
                }
                this.nameArr = trimSpace(getPathName(to.path));
            }
        }
    }
</script>
