import React from 'react'

const WatchContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideoList: [],
  onSavedVideo: () => {},
})

export default WatchContext
