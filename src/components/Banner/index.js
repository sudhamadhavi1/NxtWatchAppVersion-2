import {Component} from 'react'

import {AiOutlineClose} from 'react-icons/ai'
import {
  BackgroundContainer,
  Image,
  LogoCloseContainer,
} from './styledComponents'
import WatchContext from '../../context/WatchContext'

class Banner extends Component {
  state = {isDisplay: true}

  onClickCloseButton = () => {
    this.setState({isDisplay: false})
  }

  displayView = () => {
    const {isDisplay} = this.state

    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const imageUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          if (isDisplay) {
            return (
              <BackgroundContainer
                isDarkTheme={isDarkTheme}
                data-testid="banner"
              >
                <LogoCloseContainer>
                  <Image src={imageUrl} alt="nxt watch logo" />
                  <button
                    type="button"
                    className="trigger-button"
                    onClick={this.onClickCloseButton}
                    data-testid="close"
                  >
                    <AiOutlineClose />
                  </button>
                </LogoCloseContainer>
                <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                <button type="button">GET IT NOW</button>
              </BackgroundContainer>
            )
          }
          return null
        }}
      </WatchContext.Consumer>
    )
  }

  render() {
    return <div>{this.displayView()}</div>
  }
}

export default Banner
