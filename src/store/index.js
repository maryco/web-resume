import Vue from 'vue'
import Vuex from 'vuex'

import jobResume from './modules/jobResume'
import appCommon from './modules/appCommon';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        jobResume,
        appCommon,
    }
})