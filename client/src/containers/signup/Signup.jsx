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
    nameError: false,
    emailError: false,
    pwError: false,
    name: '',
    email: '',
    password: ''
  };

  handleNameInput = (e) => {
    this.setState({
      name: e.target.value,
      nameError: false,
      emailError: false,
      pwError: false
    });
  }

  handleEmailInput = (e) => {
    this.setState({
      email: e.target.value,
      nameError: false,
      emailError: false,
      pwError: false
    });
  }

  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value,
      nameError: false,
      emailError: false,
      pwError: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const pw = e.target.password.value.trim();

    if (name.length === 0) {
      this.setState({ nameError: true });
    } else if (email.length === 0) {
      this.setState({ emailError: true });
    } else if (pw.length === 0) {
      this.setState({ pwError: true });
    } else {
      this.props.signup(name, email, pw);
    }
  }

  render() {
    const { nameError, emailError, pwError, name, email, password } = this.state;
    const { creatingAccount, signupFailed } = this.props;

    const nameClasses = classnames("login__input", { 'input-error': nameError });
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
                        classes={nameClasses}
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={this.handleNameInput} />
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
