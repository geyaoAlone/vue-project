<template>

    <Menu :theme="theme"  @on-select ="menuSelect">
        <Submenu v-for="(item ,index ) in menuList" :name="item.path" :key="index" >
            <template slot="title">
                <Icon :type="item.icon"></Icon>
               {{ item.name}}
            </template>
            <template v-if="item.children && item.children.length > 0 ">
                <MenuItem v-for="(child,i) in item.children" :name="item.path+'/'+child.path" :key="i">{{child.name}}</MenuItem>
            </template>

        </Submenu>
        <!--<Submenu name="org">-->
            <!--<template slot="title">-->
                <!--<Icon type="ios-paper"></Icon>-->
                <!--机构管理-->
            <!--</template>-->
            <!--<MenuItem name="orgInfo" >机构信息</MenuItem>-->
            <!--<MenuItem name="hello">哈喽我的</MenuItem>-->
            <!--<MenuItem name="1-3">举报管理</MenuItem>-->
        <!--</Submenu>-->
        <!--<Submenu name="2">-->
            <!--<template slot="title">-->
                <!--<Icon type="ios-people"></Icon>-->
                <!--用户管理-->
            <!--</template>-->
            <!--<MenuItem name="2-1">新增用户</MenuItem>-->
            <!--<MenuItem name="2-2">活跃用户</MenuItem>-->
        <!--</Submenu>-->
        <!--<Submenu name="3">-->
            <!--<template slot="title">-->
                <!--<Icon type="stats-bars"></Icon>-->
                <!--统计分析-->
            <!--</template>-->
            <!--<MenuGroup title="使用">-->
                <!--<MenuItem name="3-1">新增和启动</MenuItem>-->
                <!--<MenuItem name="3-2">活跃分析</MenuItem>-->
                <!--<MenuItem name="3-3">时段分析</MenuItem>-->
            <!--</MenuGroup>-->
            <!--<MenuGroup title="留存">-->
                <!--<MenuItem name="3-4">用户留存</MenuItem>-->
                <!--<MenuItem name="3-5">流失用户</MenuItem>-->
            <!--</MenuGroup>-->
        <!--</Submenu>-->
    </Menu>
</template>
<script>
    import {appRouter} from  '../../router';
    const merge = require('webpack-merge')
export default {
    name: 'Menus',
    data () {
        return {
            theme:'dark',
            menuList:[],
        }
    },
    mounted() {

        // 权限菜单过滤 这里只控制根据角色不同显示不同菜单 ，不过滤跳转，跳转过滤需要设置router
        this.menuList  = appRouter;

    },
    methods: {
        menuSelect(item) {
            this.$router.replace( merge({path:item},{query: {msg:item }}));

        },




    },


}

</script>
