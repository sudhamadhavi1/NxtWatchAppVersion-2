import styled from 'styled-components'
import {SiYoutubegaming} from 'react-icons/si'

export const UnlistedVideo = styled.ul`
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
  background-color: ${props => (props.isDarkTheme ? '#181818' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  width: 80vw;
  height: 100vh;
`

export const SidebarAndDetailsContainer = styled.div`
  display: flex;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`
