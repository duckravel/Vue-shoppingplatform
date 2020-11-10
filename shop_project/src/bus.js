import Vue from 'vue';

Vue.prototype.$bus=new Vue();
//把event bus掛在圓形下,我們就可以在不同component中呼叫