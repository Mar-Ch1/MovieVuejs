import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';




Vue.use(ElementUI);
Vue.config.productionTip = false;
let app = '';
var config = {
    apiKey: "AIzaSyBDayE34o8ALkAgX1YqOuD6iijD0qzoKvc",
    authDomain: "food-12c94.firebaseapp.com",
    databaseURL: "https://food-12c94.firebaseio.com",
    projectId: "food-12c94",
    storageBucket: "food-12c94.appspot.com",
    messagingSenderId: "579868313562",
    appId: "1:579868313562:web:78def2a61e2cd242"
};

firebase.initializeApp(config);

export default firebase;

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
