import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import WatchContext from '../../context/WatchContext'
import SideBar from '../SideBar'

import VideoCard from '../VideoCard'

import Header from '../Header'
import {
  TrendingHeadingContainer,
  UnlistedTrending,
  TrendingIcon,
  BackgroundContainer,
  SidebarAndDetailsContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {apiStatus: apiStatusConstants.initial, trendingList: []}

  componentDidMount() {
    this.getTrendingList()
  }

  getTrendingList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
      const updatedData = fetchedData.videos.map(video => ({
        title: video.title,
        id: video.id,

        thumbnailUrl: video.thumbnail_url,
        channelName: video.channel.name,
        profileImageUrl: video.channel.profile_image_url,

        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))
      this.setState({
        trendingList: updatedData,
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
                <button type="button" onClick={this.getTrendingList}>
                  Retry
                </button>
              </div>
            )
          }

          const renderTrendingList = () => {
            const {trendingList} = this.state
            return (
              <div>
                <UnlistedTrending>
                  {trendingList.map(each => (
                    <VideoCard videoData={each} key={each.id} />
                  ))}
                </UnlistedTrending>
              </div>
            )
          }

          const displayView = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderTrendingList()
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
                    data-testid="trending"
                  >
                    <TrendingHeadingContainer
                      isDarkTheme={isDarkTheme}
                      data-testid="banner"
                    >
                      <TrendingIcon />
                      <h1>Trending</h1>
                    </TrendingHeadingContainer>
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
