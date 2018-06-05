import Vue from 'vue';
import Vuex from 'vuex';

// import app from './modules/app';
// import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        opendPagesArray : [ { path:'/main' ,name:'首页'} ],
        opendPagesMap : { '/main' : '首页'}
    },
    mutations: {
        opendPagesAdd(state,page){
            if(!state.opendPagesMap[page.path] ) {
                state.opendPagesMap[page.path]  = page.name;
                state.opendPagesArray.push(page);
            }


        },
        clearOpendPages (state) {
            state.opendPagesArray.splice(1)
            state.opendPagesMap = { '/main' : '首页'};
        },
        closeOpendPage(state,name) {
            let i = -1;
            for(let item of  state.opendPagesArray){
                i++;
                if( item.name === name ) {
                    state.opendPagesArray.splice(i,1);
                    delete state.opendPagesMap[item.path];
                    break;
                }
            }

        },
        closeOtherPages (state,currentPath) {
            let currentIndex = -1;

            for(let item of state.opendPagesArray) {
                currentIndex  ++ ;
                if (item.path === currentPath) {
                  break;
                }
            }

            console.info(currentPath,currentIndex);
            if (currentIndex === 0) {
                state.opendPagesArray.splice(1);
            } else {
                state.opendPagesArray.splice(currentIndex + 1);
                state.opendPagesArray.splice(1, currentIndex - 1);
            }

            for(let k  in state.opendPagesMap) {
                if( k !== currentPath && k !== '/main') {
                  delete  state.opendPagesMap[k]
                }
            }

        }
    },
    actions: {

    },
    modules: {
        // app,
        // user
    }
});

export default store;
