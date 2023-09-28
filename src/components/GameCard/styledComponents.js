import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const ListItem = styled.li`
  margin: 10px;
  background-color: ${props => (props.isDarkTheme ? 'black' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  padding: 10px;
`

export const GameThumnailImage = styled.img`
  height: 100px;
  width: 120px;
  border-radius: 10px;
`

export const LinkItem = styled(Link)`
  text-decoration: none;
`
