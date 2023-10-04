import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import './App.css'

import WatchContext from './context/WatchContext'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import NotFound from './components/NotFound'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideoList: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  onSavedVideo = videoData => {
    console.log('IsSave Value in App.js')
    console.log(videoData.isSave)
    const {savedVideoList} = this.state
    const indexVideoData = savedVideoList.findIndex(
      each => each.id === videoData.id,
    )

    if (indexVideoData === -1) {
      const list = [...savedVideoList, videoData]
      this.setState({savedVideoList: list})
    } else if (videoData.isSave === false) {
      const filteredList = savedVideoList.filter(
        each => each.id !== videoData.id,
      )

      this.setState({savedVideoList: filteredList})
    }
  }

  render() {
    const {isDarkTheme, savedVideoList} = this.state
    console.log('Saved-----list')
    console.log(savedVideoList)

    return (
      <WatchContext.Provider
        value={{
          isDarkTheme,
          savedVideoList,
          toggleTheme: this.toggleTheme,
          onSavedVideo: this.onSavedVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />

          <ProtectedRoute
            exact
            path="/videos/:id"
            component={routeProps => (
              <VideoItemDetails
                {...routeProps}
                savedVideoList={savedVideoList}
                onSavedVideo={this.onSavedVideo}
              />
            )}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <Route component={NotFound} />
        </Switch>
      </WatchContext.Provider>
    )
  }
}

export default App
