import Loading from '../../components/common/Loading';
import Input from '../login/Input';

import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { signup } from '../../redux/modules/signup';
import '../login/Login.css';

class Signup extends Component {
  static propTypes = {
    creatingAccount: PropTypes.bool.isRequired,
    signupFailed: PropTypes.string.isRequired,
    signup: PropTypes.func.isRequired
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
      this.props.signup(email, pw);
    }
  }

  render() {
    const { emailError, pwError, email, password } = this.state;
    const { creatingAccount, signupFailed } = this.props;

    const emailClasses = classnames("login__input", { 'input-error': emailError });
    const pwClasses = classnames("login__input", { 'input-error': pwError });

    return (
      <div className="login">
          {
            creatingAccount ? (
              <Loading />
            ) : (
              <div className="login__container">
                <div>
                  <h1 className="login__title">Create Account</h1>
                  {signupFailed && <p className="login__error">{signupFailed}</p>}
                  {(emailError || pwError) && <p className="login__error">Oops. Looks like you forgot to enter something...</p>}
                  <form onSubmit={this.handleSubmit}>
                    <Input
                        classes={emailClasses}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleEmailInput} />
                    <Input
                        classes={pwClasses}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handlePasswordInput} />
                    <button className="login__input login__submit" type="submit">Signup</button>
                  </form>
                </div>
              </div>
            )
          }
      </div>
    );
  }
}

/**
 * REDUX
 */

function mapStateToProps ({ signup }) {
  return {
    creatingAccount: signup.isFetching,
    signupFailed: signup.error
  };
}

export default connect(mapStateToProps, { signup })(Signup);
