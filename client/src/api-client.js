import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const client = {
  redirect: undefined,
  getLocation: function() {
    if (this.redirect !== undefined) {
      return this.redirect;
    }

    return window.location.origin;
  }
};

export default client;
