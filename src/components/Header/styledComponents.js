import styled from 'styled-components'
import {IoSunnyOutline, IoMoonSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'

export const BackgroundContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => (props.isDarkTheme ? 'black' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`

export const LinkItem = styled(Link)`
  text-decoration: none;
`

export const LogoImage = styled.img`
  height: 30px;
  width: 200px;
`

export const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  margin: 5px;
`

export const RightContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;

  align-items: center;
`

export const ThemeButton = styled.button`
  background-color: ${props => (props.isDarkTheme ? 'black' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  border: solid 0px;
  align-items: center;
`

export const StyledSunIcon = styled(IoSunnyOutline)`
  height: 40px;
  width: 40px;
  color: white;
  margin: 2px;
`
export const StyledMoonIcon = styled(IoMoonSharp)`
  height: 40px;
  width: 40px;
  margin: 2px;
`

export const PopUpContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? 'black' : ' #f1f5f9')};
  color: ${props => (props.isDarkTheme ? 'white' : '#3b82f6')};
  border: solid 0px;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
`

export const PopupButton = styled.button`
  background-color: ${props => (props.solid ? '#3b82f6' : ' #f9f9f9')};
  color: ${props => (props.solid ? 'white' : '#3b82f6')};
  font-size: 18px;
  border: solid 1px #3b82f6;
  align-items: center;
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
`

export const LogoutButton = styled.button`
  background-color: transparent;
  border-color: ${props => (props.isDarkTheme ? 'white' : ' #3b82f6')};

  color: ${props => (props.isDarkTheme ? 'white' : '#3b82f6')};
  font-size: 15px;
  border: solid 1px;
  align-items: center;
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
`
