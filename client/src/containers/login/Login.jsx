import Loading from '../../components/common/Loading';

import { login } from '../../redux/modules/auth';
import Input from './Input';
import './Login.css';

import React, { PropTypes, Component } from 'react';
import Link from 'react-router/Link';
import { connect } from 'react-redux';
import classnames from 'classnames';

class Login extends Component {
  static propTypes = {
    authenticating: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
  }

  state = {
    emailError: false,
    pwError: false,
    email: '',
    password: ''
  };

  handleEmailInput = (e) => {
    this.setState({
      email: e.target.value,
      emailError: false,
      pwError: false
    });
  }

  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value,
      emailError: false,
      pwError: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const pw = e.target.password.value.trim();

    if (email.length === 0) {
      this.setState({ emailError: true });
    } else if (pw.length === 0) {
      this.setState({ pwError: true });
    } else {
      this.props.login(email, pw);
    }
  }

  render () {
    const { emailError, pwError, email, password } = this.state;
    const { authenticating, authFailed } = this.props;

    const emailClasses = classnames("login__input", { 'input-error': emailError });
    const pwClasses = classnames("login__input", { 'input-error': pwError });

    return (
      <div className="login">
          {
            authenticating ? (
              <Loading />
            ) : (
              <div className="login__container">
                <div>
                  <h1 className="login__title">Login</h1>
                  {authFailed && <p className="login__error">{authFailed}</p>}
                  {(emailError || pwError) && <p className="login__error">Oops. Looks like you forgot to enter something...</p>}
                  <form onSubmit={this.handleSubmit}>
                    <Input
                        classes={emailClasses}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleEmailInput} />
                    <Input
                        classes={pwClasses}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handlePasswordInput} />
                    <button className="login__input login__submit" type="submit">Login</button>
                  </form>
                </div>
                <p>Or <Link to="/signup">create a new account.</Link></p>
              </div>
            )
          }
      </div>
    )
  }
}

/**
 * REDUX
 */

function mapStateToProps ({ auth }) {
  return {
    authenticating: auth.isFetching,
    authFailed: auth.error
  };
}

function mapDispatchToProps (dispatch) {
  return {
    login(email, pw) {
      dispatch(login(email, pw));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
