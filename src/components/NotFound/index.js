import WatchContext from '../../context/WatchContext'
import SideBar from '../SideBar'

import Header from '../Header'
import {
  BackgroundContainer,
  NotFoundImage,
  SidebarAndDetailsContainer,
} from './styledComponents'

const SavedVideos = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const notFoundImage = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <>
          <Header />
          <SidebarAndDetailsContainer isDarkTheme={isDarkTheme}>
            <div>
              <SideBar />
            </div>
            <div>
              <BackgroundContainer isDarkTheme={isDarkTheme}>
                <NotFoundImage
                  isDarkTheme={isDarkTheme}
                  src={notFoundImage}
                  alt="not found"
                />
                <h1>Page Not Found</h1>
                <p>we are sorry, the page you requested could not be found.</p>
              </BackgroundContainer>
            </div>
          </SidebarAndDetailsContainer>
        </>
      )
    }}
  </WatchContext.Consumer>
)

export default SavedVideos
