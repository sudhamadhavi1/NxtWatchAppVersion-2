import {formatDistanceToNow} from 'date-fns'
import {ListItem, VideoThumnailImage, LinkItem} from './styledComponents'
import WatchContext from '../../context/WatchContext'

const VideoCard = props => {
  const {videoData} = props
  const {
    title,
    id,
    thumbnailUrl,
    viewCount,
    publishedAt,
    channelName,
  } = videoData

  const date = new Date(publishedAt)

  const dateDifference = formatDistanceToNow(date)

  const formattedDateDifference = dateDifference.split(' ')

  const strNewDate = formattedDateDifference.slice(1).join(' ')

  return (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <LinkItem to={`/videos/${id}`}>
            <ListItem isDarkTheme={isDarkTheme}>
              <VideoThumnailImage src={thumbnailUrl} alt="video thumbnail" />
              <div>
                <p>{title}</p>
                <p>{channelName}</p>
                <p>{viewCount} Views</p>
                <p>{strNewDate}</p>
              </div>
            </ListItem>
          </LinkItem>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default VideoCard
