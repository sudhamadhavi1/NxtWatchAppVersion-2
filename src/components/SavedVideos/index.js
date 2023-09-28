import WatchContext from '../../context/WatchContext'
import SideBar from '../SideBar'

import VideoCard from '../VideoCard'

import Header from '../Header'
import {
  UnlistedVideo,
  SavedVideoIcon,
  BackgroundContainer,
  SavedVideoHeadingContainer,
  SidebarAndDetailsContainer,
  NoSavedVideo,
} from './styledComponents'

const SavedVideos = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideoList} = value
      //  console.log('SavedVideos')
      // console.log(savedVideoList)

      const displaySavedVideoList = () => (
        <div>
          <SavedVideoHeadingContainer
            isDarkTheme={isDarkTheme}
            data-testid="banner"
          >
            <SavedVideoIcon />
            <h1>Saved Videos</h1>
          </SavedVideoHeadingContainer>
          <UnlistedVideo className="unlisted-games">
            {savedVideoList.map(each => (
              <VideoCard videoData={each} key={each.id} />
            ))}
          </UnlistedVideo>
        </div>
      )

      const displayZeroList = () => (
        <div>
          <NoSavedVideo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <h1>No saved videos found</h1>
          <p>Save your videos by clicking a button</p>
        </div>
      )

      const displayView = () => {
        // console.log(savedVideoList.length)
        if (savedVideoList.length === 0) {
          return displayZeroList()
        }
        return displaySavedVideoList()
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
                data-testid="savedVideos"
              >
                {displayView()}
              </BackgroundContainer>
            </div>
          </SidebarAndDetailsContainer>
        </>
      )
    }}
  </WatchContext.Consumer>
)

export default SavedVideos
