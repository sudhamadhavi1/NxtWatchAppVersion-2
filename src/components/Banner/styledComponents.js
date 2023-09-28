import styled from 'styled-components'

export const BackgroundContainer = styled.div`
  height: 20vh;
  width: 70vw;
  margin-right: 2px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  flex-wrap: wrap;
  background-color: ${props => (props.isDarkTheme ? 'black' : ' #f9f9f9')};
`

export const Image = styled.img`
  height: 40px;
  width: 120px;
  margin-right: 2px;
`

export const LogoCloseContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
