import WatchContext from '../../context/WatchContext'

import {
  BackgroundContainer,
  LinkItem,
  HomeIcon,
  FireIcon,
  UnlistedItems,
  GamingIcon,
  SaveIcon,
  Paragraph,
} from './styledComponents'

import Footer from '../Footer'

const SideBar = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      return (
        <BackgroundContainer isDarkTheme={isDarkTheme}>
          <div>
            <UnlistedItems>
              <li>
                <LinkItem to="/">
                  <HomeIcon />
                  <Paragraph isDarkTheme={isDarkTheme}>Home</Paragraph>
                </LinkItem>
              </li>
              <li>
                <LinkItem to="/trending">
                  <FireIcon />
                  <Paragraph isDarkTheme={isDarkTheme}>Trending</Paragraph>
                </LinkItem>
              </li>
              <li>
                <LinkItem to="/gaming">
                  <GamingIcon />
                  <Paragraph isDarkTheme={isDarkTheme}>Gaming</Paragraph>
                </LinkItem>
              </li>
              <li>
                <LinkItem to="/saved-videos">
                  <SaveIcon />
                  Saved videos
                </LinkItem>
              </li>
            </UnlistedItems>
          </div>
          <Footer />
        </BackgroundContainer>
      )
    }}
  </WatchContext.Consumer>
)

export default SideBar
