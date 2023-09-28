import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import WatchContext from '../../context/WatchContext'

import './index.css'
import {LoginButton} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isChecked: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    // console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          //  console.log(isDarkTheme)

          const {showSubmitError, errorMsg} = this.state
          const jwtToken = Cookies.get('jwt_token')
          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }
          const imageUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          //   console.log(imageUrl)

          const loginForm = isDarkTheme
            ? 'login-form-container-dark'
            : 'login-form-container-light'

          const renderPasswordField = () => {
            const {password, isChecked} = this.state
            const showtype = isChecked ? 'text' : 'password'

            return (
              <>
                <label className="input-label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  type={showtype}
                  id="password"
                  className="password-input-field"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </>
            )
          }

          const renderUsernameField = () => {
            const {username} = this.state
            return (
              <>
                <label className="input-label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="username-input-field"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </>
            )
          }

          const formContainer = isDarkTheme
            ? 'form-container-dark'
            : 'form-container-light'

          return (
            <div className={loginForm}>
              <form className={formContainer} onSubmit={this.submitForm}>
                <img src={imageUrl} alt="website logo" />
                <div className="input-container">{renderUsernameField()}</div>
                <div className="input-container">{renderPasswordField()}</div>
                <label>
                  <input type="checkbox" onChange={this.onChangeCheckbox} />
                  Show Password
                </label>

                <LoginButton type="submit">Login</LoginButton>

                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
              </form>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Login
