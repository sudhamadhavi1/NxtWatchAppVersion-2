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

  onSavedVideo = saveData => {
    const {savedVideoList} = this.state
    // console.log('SaveVideoList-App')
    const findIndexSaveItem = savedVideoList.findIndex(
      each => each.id === saveData.id,
    )
    // console.log(findIndexSaveItem)
    let updatedOnlySave
    if (findIndexSaveItem === -1) {
      const updatedSavedData = [...savedVideoList, saveData]
      updatedOnlySave = updatedSavedData.filter(each => each.isSave === true)
    } else {
      savedVideoList[findIndexSaveItem].isSave = saveData.isSave
      updatedOnlySave = savedVideoList.filter(each => each.isSave === true)
    }

    // console.log('---------App-Data- Save-------------')

    this.setState({savedVideoList: updatedOnlySave})
  }

  render() {
    const {isDarkTheme, savedVideoList} = this.state

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
            component={VideoItemDetails}
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
