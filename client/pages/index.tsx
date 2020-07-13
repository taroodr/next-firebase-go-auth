import * as React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "isomorphic-unfetch";
import axios from "axios";

type State = {
  user: any;
};

export default class Index extends React.Component<{}, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
    };
    this.apiPublic = this.apiPublic.bind(this);
    this.apiPrivate = this.apiPrivate.bind(this);
  }

  componentDidMount() {
    firebase.initializeApp({
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      apiKey: process.env.FIREBASE_PUBLIC_API_KEY
    });

    
    firebase.auth().onAuthStateChanged(user => {
      console.log({user})
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  async apiPublic() {
    let res = await axios.get("http://localhost:8080/public");
    console.log(res.data);
  }

  async apiPrivate() {
    if (this.state.user) {
      const token = await this.state.user.getIdToken();
      let res = await axios.get("http://localhost:8080/private", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res.data);
    }
  }

  handleLogin() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  handleLogout() {
    firebase.auth().signOut();
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        {user ? (
          <button onClick={this.handleLogout}>Logout</button>
        ) : (
          <button onClick={this.handleLogin}>Login</button>
        )}
        <button onClick={this.apiPrivate}>private</button>
        <button onClick={this.apiPublic}>public</button>
      </div>
    );
  }
}
