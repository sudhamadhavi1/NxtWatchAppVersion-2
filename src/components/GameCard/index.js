import {ListItem, GameThumnailImage, LinkItem} from './styledComponents'
import WatchContext from '../../context/WatchContext'

const GameCard = props => {
  const {gameData} = props
  const {title, id, thumbnailUrl, viewCount} = gameData

  return (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <LinkItem to={`/videos/${id}`}>
            <ListItem isDarkTheme={isDarkTheme}>
              <GameThumnailImage src={thumbnailUrl} alt="video thumbnail" />
              <p>{title}</p>
              <p>{viewCount} Watching Worldwide</p>
            </ListItem>
          </LinkItem>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default GameCard
