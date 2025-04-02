import { CookiesProvider } from "react-cookie"
import { HashRouter } from "react-router-dom"
import ReactGA from "react-ga"

import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material"

import "./lib/i18n"
import theme from "./styles/Utils/Theme"
import Main from "./components/Main"
import MenuBar from "./components/MenuBar/MenuBar"


ReactGA.initialize("UA-116621847-1")
ReactGA.pageview('/finance' + window.location.hash.replace('#', ''))

function App() {
  return (
    <HashRouter>
      <CookiesProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MenuBar />
            <Main />
          </ThemeProvider>
        </StyledEngineProvider>
      </CookiesProvider>
    </HashRouter>
  )
}

export default App
