import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import demo from  '@/pages/demo/demo'

Vue.use(Router);

// 独立页面
export const singleRouter  = [
    {
        path: '/home',
        name: '首页',
        meta: {
            title: '你丁哥在学习Vue'
        },
        component: resolve => { require(['@/pages/Home.vue'], resolve) }
    }, {
        path: '/login',
        meta: {
            title: 'Login - 登录'
        },
        name: 'Login',
        component: resolve => { require(['@/pages/Login.vue'], resolve) }
    },


];

// 做为 main 的子页面但不在左侧菜单显示
export const otherRouter = [
    {   path:'/',
        redirect:'main',
        component:Main,

        children: [{
            path:'main',
            component:  resolve => { require(['@/pages/main-components/main-index.vue'], resolve) },
            meta: {
                title:'融信通'
            },
        }]
    },
];

//   Main的 子页面
export  const appRouter = [


    {
        path: '/organization',
        name: '机构管理',
        icon:'clipboard',
        component: Main,
        children: [{
            path: 'orgList',
            name: '机构列表',
            meta: {
                keepAlive:true
            },
            icon:'',
            component: resolve => { require(['@/pages/organization/orgList.vue'], resolve) }
        }, {
            path: 'three',
            name: '第三方机构',
            meta: {
                keepAlive:true
            },
            icon:'',
            component: demo
        }]
    },
    {
        path: '/customer',
        name: '客户管理',
        icon:'ios-person',
        component: Main,
        children: [{
            path: 'enterprise',
            name: '核心企业查询',
            meta: {
                keepAlive:true
            },
            icon:'',
            component: demo
        }, {
            path: 'small',
            name: '小微客户',
            icon:'',
            component: demo
        }, {
            path: 'partner',
            name: '合作方管理',
            icon:'',
            component: demo
        }]
    },
    {
        path: '/business',
        name: '业务管理',
        icon:'cube',
        component: Main,
        children: [{
            path: 'trade',
            name: '交易平台',
            icon:'',
            component: demo
        }, {
            path: 'charge',
            name: '收费管理',
            icon:'',
            component: demo
        }, {
            path: 'sync',
            name: '异步通知',
            icon:'',
            component: demo
        }]
    },
    {
        path: '/special',
        name: '特殊项目',
        icon:'ios-body',
        component: Main,
        children: [{
            path: 'YKBSP',
            name: '亚科BSP',
            icon:'',
            component: demo
        }, {
            path: 'precious',
            name: '贵交所',
            icon:'',
            component: demo
        }, {
            path: 'pvloan',
            name: '光伏贷',
            icon:'',
            component: demo
        }]
    },

];


export const appRouterMap  = ( function tailRecs(arr ,map){
    for(let item of arr){
        map[item.path.replace('/','')] = item.name;
        if(item.children && item.children.length ) {
            // 尾递归
            tailRecs(item.children, map)
        }
    }
    return map
})(appRouter,{});

export default new Router({
    routes: [
        ...singleRouter,
        ...otherRouter,
        ...appRouter,
    ]
})


