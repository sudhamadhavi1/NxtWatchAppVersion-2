import styled from 'styled-components'

export const BackgroundContainer = styled.div`
  padding: 10px;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : ' #f9f9f9')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  width: 80vw;
`

export const SidebarAndDetailsContainer = styled.div`
  display: flex;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`

export const Heading = styled.p`
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  font-size: 20px;
`

export const DateAndViewersContainer = styled.div`
  display: flex;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`

export const ViewDateParagraph = styled.p`
  color: #475569;
  margin: 2px;
  font-weight: bold;
`

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-right: 10px;
`

export const LikeDislikeSaveButtonsContainer = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
`
export const ButtonIcon = styled.button`
  display: flex;
  align-items: center;
  padding: 2px;
  background-color: transparent;
  border: solid 0px;
  font-weight: bold;
  margin: 5px;
  color: ${props => (props.isChange ? '#2563eb' : '#64748b')};
`

export const Underline = styled.hr`
  height: 2px;
  border: none;

  background-color: #616e7c;
`
