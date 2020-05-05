import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/app";
import "firebase/analytics";
import isTouchDevice from "is-touch-device";
import responsive from "vue-responsive";
import apiClient from "./api-client";

Vue.config.productionTip = false;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADeQx9KKqv1hEPcnq5JiMg4H0iRbo8fz4",
  authDomain: "adamw-ph.firebaseapp.com",
  databaseURL: "https://adamw-ph.firebaseio.com",
  projectId: "adamw-ph",
  storageBucket: "adamw-ph.appspot.com",
  messagingSenderId: "726653327686",
  appId: "1:726653327686:web:ac21ec1d0625c591b1ed47",
  measurementId: "G-T4L34R61Z0"
};

firebase.initializeApp(firebaseConfig);

Vue.use(responsive);

const isMobile = isTouchDevice();
const isDev = process.env.NODE_ENV === undefined ? false : process.env.NODE_ENV.trim() === "dev";

apiClient.redirect = isDev ? "http://localhost:5000" : undefined;

Vue.mixin({
  data: function() {
    return {
      get firebase() {
        return firebase;
      },
      get isMobile() {
        return isMobile;
      },
      get api() {
        return apiClient;
      }
    };
  }
});

function open() {
  new Vue({
    router,
    render(h) {
      return h(App);
    }
  }).$mount("#app");
}

// Main
open();
