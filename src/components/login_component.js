import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: 'none',
    };
  }

  render() {
    return (
      <div className="app" style={styles.Page}>
        <div style={styles.LoginBox}>
          <div>
            <div style={styles.TextField}>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                required
              />
            </div>
            <div style={styles.TextField}>
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                required
                type="password"
              />
            </div>
            <div style={styles.Buttom}>

              <RaisedButton
                label="Login"
                primary
                onClick={() => this.setState({ errorText: '' })}
              />
            </div>
            <div>
              <p
                style={{ display: this.state.errorText, ...styles.Message }}
              >
                Login Failed
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
