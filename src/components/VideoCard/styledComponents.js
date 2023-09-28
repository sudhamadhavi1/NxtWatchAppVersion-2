import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const ListItem = styled.li`
  margin: 10px;
  background-color: ${props => (props.isDarkTheme ? 'black' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  padding: 10px;
  display: flex;
`

export const VideoThumnailImage = styled.img`
  height: 20vh;
  width: 20vw;
  margin-right: 5px;
`

export const LinkItem = styled(Link)`
  text-decoration: none;
`
