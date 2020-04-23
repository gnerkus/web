import React from 'react'
import Header from './Header'
import styled, { createGlobalStyle } from 'styled-components'
import Constants from '../Constants'
import Footer from './Footer'
import media from 'styled-media-query'

interface Props {
  overridesLayout: boolean
}

const Layout: React.SFC<Props> = ({ children, overridesLayout }) => {
  if (overridesLayout) {
    return (
      <div>
        <GlobalStyle {...Constants} />
        {children}
      </div>
    )
  }

  return (
    <div>
      <GlobalStyle {...Constants} />
      <StickyFooterContainer>
        <Header />
        <Container>{children}</Container>
      </StickyFooterContainer>
      <Footer />
    </div>
  )
}

export default Layout

export const GlobalStyle = createGlobalStyle<typeof Constants>`
  html,
  body {
    position: relative;
  }

  html {
    height: 100%;
    overflow-x: hidden;
    margin-right: calc(-1 * (100vw - 100%));
  }

  body {
    background: ${props => props.colors.lighter};
    font-family: ${props => props.fonts.sansSerif};
    margin: 0;
    padding: 0;
  }

  ::selection {
    background: ${props => props.colors.primary};
    color: ${props => props.colors.light};
  }

  a {
    color: ${props => props.colors.dark};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover, &:active, &:focus {
      color: ${props => props.colors.primary}
    }
  }

  h1, h2, h3, h4, h5, h6, h7 {
    font-family: ${props => props.fonts.serif};
  }

  a[href],
  input[type='submit']:not([disabled]),
  input[type='image']:not([disabled]),
  label[for]:not([disabled]),
  select:not([disabled]),
  button:not([disabled]) {
    cursor: pointer;
  }
`

const Container = styled.div`
  box-sizing: border-box;
  max-width: ${Constants.maxWidth};
  margin: 50px auto 60px;
  padding: 0 30px;
  box-sizing: border-box;

  ${media.lessThan('medium')`
    padding: 0 20px;
  `}
`

const StickyFooterContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  ${media.greaterThan('medium')`
    padding-bottom: 250px;
  `}
`
