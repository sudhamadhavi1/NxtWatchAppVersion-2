import styled from 'styled-components'

import {ImFire} from 'react-icons/im'

export const UnlistedTrending = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  overflow-y: visible;
`

export const TrendingIcon = styled(ImFire)`
  color: red;
  height: 30px;
  width: 50px;
`

export const BackgroundContainer = styled.div`
  padding: 10px;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  width: 80vw;
`

export const TrendingHeadingContainer = styled.div`
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
