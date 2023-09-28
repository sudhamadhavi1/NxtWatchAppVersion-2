import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

export const BackgroundContainer = styled.div`
  padding: 10px;
  background-color: ${props => (props.isDarkTheme ? 'black' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  width: 20vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const LinkItem = styled(Link)`
  padding: 10px;
  display: flex;
  text-decoration: none;
  align-items: center;
`

export const HomeIcon = styled(AiFillHome)`
  padding: 2px;
  height: 30px;
  width: 30px;
  margin-right: 2px;
`

export const FireIcon = styled(AiFillFire)`
  padding: 2px;
  height: 30px;
  width: 30px;
  margin-right: 2px;
`

export const UnlistedItems = styled.ul`
  padding: 2px;
  list-style: none;
`
export const GamingIcon = styled(SiYoutubegaming)`
  padding: 2px;
  height: 30px;
  width: 30px;
  margin-right: 2px;
`

export const SaveIcon = styled(MdPlaylistAdd)`
  padding: 2px;
  height: 30px;
  width: 30px;
  margin-right: 2px;
`

export const Paragraph = styled.p`
  padding: 2px;
  list-style: none;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`
