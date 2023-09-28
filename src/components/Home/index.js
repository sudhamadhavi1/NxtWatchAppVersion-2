import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import WatchContext from '../../context/WatchContext'
import SideBar from '../SideBar'

import HomeVideoCard from '../HomeVideoCard'
import Banner from '../Banner'

import Header from '../Header'
import {
  UnlistedVideo,
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
  state = {
    apiStatus: apiStatusConstants.initial,
    VideosList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getVideosList()
  }

  getVideosList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        VideosList: updatedData,
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

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getVideosList()
  }

  render() {
    const {searchInput} = this.state

    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const renderVideoListFailureView = () => {
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
                <button type="button" onClick={this.getVideosList}>
                  Retry
                </button>
              </div>
            )
          }

          const renderVideosList = () => {
            const {VideosList} = this.state

            if (VideosList.length === 0) {
              return (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                  />
                  <h1>No Search results found</h1>
                  <p>Try different key words or remove search filter</p>
                  <button type="button" onClick={this.getVideosList}>
                    Retry
                  </button>
                </div>
              )
            }

            return (
              <div>
                <UnlistedVideo>
                  {VideosList.map(each => (
                    <HomeVideoCard videoData={each} key={each.id} />
                  ))}
                </UnlistedVideo>
              </div>
            )
          }

          const displayView = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderVideosList()
              case apiStatusConstants.failure:
                return renderVideoListFailureView()
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
                    data-testid="home"
                  >
                    <Banner />
                    <div>
                      <input
                        type="search"
                        value={searchInput}
                        placeholder="Search"
                        onChange={this.onChangeSearch}
                      />
                      <button
                        type="button"
                        onClick={this.onClickSearchButton}
                        data-testid="searchButton"
                      >
                        <AiOutlineSearch />
                      </button>
                    </div>
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
