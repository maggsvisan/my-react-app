import { decorate, observable, action } from 'mobx';
import firebaseApp from '../firebase/firebaseApp';

class _UserStore {
  user = null;

  constructor() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user);
      } else {
        this.setUser(null);
      }
    });
  }

  setUser(user) {
    this.user = user;
  }

  signIn = (email, password) => {
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then((u) => {
        // No action
      }).catch((error) => {
          if (error.code === "auth/user-not-found") {
              alert("User not found");
          }

          if (error.code === "auth/wrong-password") {
              alert("Wrong password");
          }

          console.log(error);
      });
  }

  signUp = (email, password) => {
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            console.log(error);
        })
  }

  signOut = () => {
    firebaseApp.auth().signOut();
  }
}

const UserStore = decorate(_UserStore, {
  user: observable,
  setUser: action,
  signIn: action,
  signUp: action,
  signOut: action
});

export default new UserStore();