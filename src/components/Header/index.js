import {withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import Popup from 'reactjs-popup'

import WatchContext from '../../context/WatchContext'

import {
  BackgroundContainer,
  LogoImage,
  ProfileImage,
  RightContainer,
  ThemeButton,
  StyledSunIcon,
  StyledMoonIcon,
  PopUpContainer,
  PopupButton,
  LogoutButton,
  LinkItem,
} from './styledComponents'

const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value

        const onClickTheme = () => {
          toggleTheme()
        }

        const logoImageUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        return (
          <BackgroundContainer isDarkTheme={isDarkTheme}>
            <LinkItem to="/">
              <LogoImage src={logoImageUrl} alt="website logo" />
            </LinkItem>

            <RightContainer>
              <ThemeButton
                type="button"
                onClick={onClickTheme}
                data-testid="theme"
                isDarkTheme={isDarkTheme}
              >
                {isDarkTheme ? <StyledSunIcon /> : <StyledMoonIcon />}
              </ThemeButton>

              <ProfileImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              <div className="popup-container">
                <Popup
                  modal
                  trigger={
                    <LogoutButton type="button" isDarkTheme={isDarkTheme}>
                      Logout
                    </LogoutButton>
                  }
                >
                  {close => (
                    <PopUpContainer isDarkTheme={isDarkTheme}>
                      <div>
                        <p>Are you sure, you want to logout</p>
                      </div>
                      <PopupButton
                        type="button"
                        onClick={() => close()}
                        solid={false}
                      >
                        Cancel
                      </PopupButton>
                      <PopupButton type="button" onClick={onClickLogout} solid>
                        Confirm
                      </PopupButton>
                    </PopUpContainer>
                  )}
                </Popup>
              </div>
            </RightContainer>
          </BackgroundContainer>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default withRouter(Header)
