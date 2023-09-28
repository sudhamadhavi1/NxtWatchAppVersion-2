import styled from 'styled-components'
import {SiYoutubegaming} from 'react-icons/si'

export const UnlistedGames = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  overflow-y: visible;
`

export const GamingIcon = styled(SiYoutubegaming)`
  color: red;
  height: 30px;
  width: 50px;
`

export const BackgroundContainer = styled.div`
  padding: 10px;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  height: 100vh;
  width: 80vw;
`

export const GamingHeadingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #d7dfe9;
  height: 10vh;
  width: 90vw;
  padding: 10px;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#cbd5e1')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`
export const SidebarAndDetailsContainer = styled.div`
  display: flex;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`
