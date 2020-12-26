import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule  from './modules/Auth/index.js';
import MyDataModule from './modules/MyData/index.js';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth:  AuthModule,
        myData: MyDataModule,
    },
});

export default store;