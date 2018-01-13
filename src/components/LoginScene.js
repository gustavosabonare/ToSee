import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import firebase from 'firebase';
// import {Link} from 'react-router';


const styles = {
  Page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  LoginBox: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: '5px',
    padding: 10,
    paddingTop: 0,
  },
  TextField: {
    paddingTop: 0,
  },
  Buttom: {
    paddingTop: 10,
  },
  Message: {
    textAlign: 'center',
    color: 'rgba(237,82,66,1)',
    fontSize: '12px',
    fontFamily: 'sans-serif',
  },
};

class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorText: 'none',
    };

    this.Login = this.Login.bind(this);
  }

  Login(e) {
    e.preventDefault();
    this.loginButton.click();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => browserHistory.push('/home'))
      .catch(() => this.setState({ errorText: true }));
  }

  render() {
    return (
      <div className="app" style={styles.Page}>
        <div style={styles.LoginBox}>
          <form onSubmit={this.Login}>
            <div style={styles.TextField}>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                required
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <div style={styles.TextField}>
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                required
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            <div style={styles.Buttom}>

              <RaisedButton
                label="Login"
                primary
                onClick={() => this.loginButton.click()}
              />

              <button style={{ display: 'none' }} ref={(ref) => { this.loginButton = ref; }} />
            </div>
            <div>
              <p
                style={{ display: this.state.errorText, ...styles.Message }}
              >
                Login Failed
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginScene;
