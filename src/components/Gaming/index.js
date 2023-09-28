import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import WatchContext from '../../context/WatchContext'
import SideBar from '../SideBar'

import GameCard from '../GameCard'

import Header from '../Header'
import {
  UnlistedGames,
  GamingIcon,
  BackgroundContainer,
  GamingHeadingContainer,
  SidebarAndDetailsContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {apiStatus: apiStatusConstants.initial, gamesList: []}

  componentDidMount() {
    this.getGamesList()
  }

  getGamesList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    // console.log(apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(game => ({
        title: game.title,
        id: game.id,
        thumbnailUrl: game.thumbnail_url,
        viewCount: game.view_count,
      }))
      this.setState({
        gamesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const renderGameFailureView = () => {
            const failureView = isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

            return (
              <div>
                <img src={failureView} alt="failure view" />
                <h1>Oops! Something Went Wrong</h1>
                <p>
                  We are having some trouble to complete your request. Please
                  try again.
                </p>
                <button type="button" onClick={this.getGamesList}>
                  Retry
                </button>
              </div>
            )
          }

          const renderGamesList = () => {
            const {gamesList} = this.state
            return (
              <div>
                <UnlistedGames className="unlisted-games">
                  {gamesList.map(each => (
                    <GameCard gameData={each} key={each.id} />
                  ))}
                </UnlistedGames>
              </div>
            )
          }

          const displayView = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderGamesList()
              case apiStatusConstants.failure:
                return renderGameFailureView()
              case apiStatusConstants.inProgress:
                return this.renderLoadingView()
              default:
                return null
            }
          }

          return (
            <>
              <Header />
              <SidebarAndDetailsContainer isDarkTheme={isDarkTheme}>
                <div>
                  <SideBar />
                </div>
                <div>
                  <BackgroundContainer
                    isDarkTheme={isDarkTheme}
                    data-testid="gaming"
                  >
                    <GamingHeadingContainer
                      isDarkTheme={isDarkTheme}
                      data-testid="banner"
                    >
                      <GamingIcon />
                      <h1>Gaming</h1>
                    </GamingHeadingContainer>
                    {displayView()}
                  </BackgroundContainer>
                </div>
              </SidebarAndDetailsContainer>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Gaming
