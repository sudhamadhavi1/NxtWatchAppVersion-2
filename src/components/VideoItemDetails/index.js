import {Component} from 'react'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import WatchContext from '../../context/WatchContext'

import Header from '../Header'
import SideBar from '../SideBar'

import {
  SidebarAndDetailsContainer,
  BackgroundContainer,
  Heading,
  DateAndViewersContainer,
  ViewDateParagraph,
  MenuContainer,
  LikeDislikeSaveButtonsContainer,
  ButtonIcon,
  Underline,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoData: [],
    isLike: false,
    isDisLike: false,
    isSave: false,
  }

  componentDidMount() {
    this.getVideoItemData()
  }

  getVideoItemData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match, savedVideoList} = this.props
    console.log('In Video Item Details')
    console.log(savedVideoList)
    // console.log(match)

    const {params} = match
    const {id} = params
    const checkIndex = savedVideoList.findIndex(each => each.id === id)
    console.log(checkIndex)
    if (checkIndex !== -1) {
      this.setState({isSave: savedVideoList[checkIndex].isSave})
    }

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
      // console.log(fetchedData)

      const updatedData = {
        title: fetchedData.video_details.title,
        id: fetchedData.video_details.id,
        videoUrl: fetchedData.video_details.video_url,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        channelName: fetchedData.video_details.channel.name,
        profileImageUrl: fetchedData.video_details.channel.profile_image_url,
        subscriberCount: fetchedData.video_details.channel.subscriber_count,
        viewCount: fetchedData.video_details.view_count,
        publishedAt: fetchedData.video_details.published_at,
        description: fetchedData.video_details.description,
      }
      // console.log(updatedData)
      this.setState({
        videoData: updatedData,
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

  onClickLike = () => {
    const {isLike} = this.state

    if (isLike === false) {
      this.setState({
        isLike: true,
        isDisLike: false,
      })
    } else {
      this.setState(prevState => ({
        isLike: !prevState.isLike,
      }))
    }
  }

  onClickDisLike = () => {
    const {isDisLike} = this.state
    if (isDisLike === false) {
      this.setState({
        isLike: false,
        isDisLike: true,
      })
    } else
      this.setState(prevState => ({
        isDisLike: !prevState.isDisLike,
      }))
  }

  onUpdateSave = () => {
    const {isSave, videoData} = this.state
    const {onSavedVideo} = this.props

    const updateVideoData = {...videoData, isSave}
    onSavedVideo(updateVideoData)
  }

  onClickSave = () => {
    this.setState(prevState => ({isSave: !prevState.isSave}), this.onUpdateSave)
  }

  render() {
    const {isLike, isDisLike, isSave, videoData} = this.state
    console.log('IsSave in Video Details Render')
    console.log(isSave)

    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const {
            title,
            videoUrl,

            channelName,
            profileImageUrl,
            subscriberCount,
            viewCount,
            publishedAt,
            description,
          } = videoData

          const renderVideoDataSuccess = () => {
            const date = new Date(publishedAt)

            const dateDifference = formatDistanceToNow(date)

            const formattedDateDifference = dateDifference.split(' ')

            const strNewDate = formattedDateDifference.slice(1).join(' ')

            const saveText = isSave ? 'Saved' : 'Save'

            return (
              <>
                <div className="video-container">
                  <div className="responsive-container">
                    <ReactPlayer url={videoUrl} controls />
                  </div>
                </div>

                <Heading isDarkTheme={isDarkTheme}>{title}</Heading>
                <MenuContainer>
                  <DateAndViewersContainer isDarkTheme={isDarkTheme}>
                    <ViewDateParagraph>{`${viewCount} views .`}</ViewDateParagraph>
                    <ViewDateParagraph> {strNewDate}</ViewDateParagraph>
                  </DateAndViewersContainer>
                  <LikeDislikeSaveButtonsContainer>
                    <ButtonIcon
                      type="button"
                      onClick={this.onClickLike}
                      isChange={isLike}
                    >
                      <AiOutlineLike />
                      Like
                    </ButtonIcon>

                    <ButtonIcon
                      type="button"
                      onClick={this.onClickDisLike}
                      isChange={isDisLike}
                    >
                      <AiOutlineDislike />
                      DisLike
                    </ButtonIcon>

                    <ButtonIcon
                      type="button"
                      onClick={this.onClickSave}
                      isChange={isSave}
                    >
                      <MdPlaylistAdd />
                      {saveText}
                    </ButtonIcon>
                  </LikeDislikeSaveButtonsContainer>
                </MenuContainer>
                <Underline />

                <p>{channelName}</p>
                <img src={profileImageUrl} alt="channel logo" />
                <p>{subscriberCount} subscribers</p>
                <p>{description}</p>
              </>
            )
          }

          const renderVideoFailureView = () => {
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
                <button type="button" onClick={this.getVideoItemData}>
                  Retry
                </button>
              </div>
            )
          }

          const displayView = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderVideoDataSuccess()
              case apiStatusConstants.failure:
                return renderVideoFailureView()
              case apiStatusConstants.inProgress:
                return this.renderLoadingView()
              default:
                return null
            }
          }

          return (
            <div>
              <Header />
              <SidebarAndDetailsContainer isDarkTheme={isDarkTheme}>
                <SideBar />

                <BackgroundContainer
                  isDarkTheme={isDarkTheme}
                  data-testid="videoItemDetails"
                >
                  {displayView()}
                </BackgroundContainer>
              </SidebarAndDetailsContainer>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
