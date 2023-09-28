import styled from 'styled-components'

export const BackgroundContainer = styled.div`
  padding: 10px;
  background-color: ${props => (props.isDarkTheme ? 'black' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  height: 100%;
  width: 80vw;
`

export const SidebarAndDetailsContainer = styled.div`
  display: flex;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`

export const NotFoundImage = styled.img`
  padding: 10px;
  background-color: ${props => (props.isDarkTheme ? 'black' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  height: 100vh;
`
