import {deviceStateMixin} from "./core/mixins/deviceStateMixin";

require('@/assets/scss/styles.scss')

/**
 *  For prevent a Mr IE11 says "Unhandled promise rejection ReferenceError 'Promise''
 *  @see https://syon.github.io/refills/rid/1495634/
 */
import 'whatwg-fetch'

import Vue from 'vue'
import App from './App.vue'

import './core/exceptions';
import store from "./store";

Vue.config.productionTip = false

Vue.mixin(deviceStateMixin);

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
