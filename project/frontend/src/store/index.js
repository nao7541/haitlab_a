import Vue from 'vue'
import Vuex from 'vuex'

import AuthModule  from './modules/Auth/index.js';
import EventModule from './modules/Event/index.js';
import TagModule   from './modules/Tag/index.js';

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth:  AuthModule,
        event: EventModule,
        tag:   TagModule,
    },
});

export default store;