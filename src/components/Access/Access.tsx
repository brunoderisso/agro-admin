import { useState, useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import queryString from "query-string"

import Grow from "@mui/material/Fade"
import Grid from "@mui/material/Grid"

import AcessPage from "./AccessPage"
import SessionStore from "../../stores/SessionStore"
import StringUtils from "../../utils/StringUtils"

function Access() {
  const [selectedPage, setSelectedPage] = useState("")
  const [token, setToken] = useState<string | string[]>("")

  const { search } = useLocation()
  const { page } = useParams()
  const navigate = useNavigate()

  const pages = ["login", "signin", "active", "forgotsent", "forgot"]

  useEffect(() => {
    const obj = document.cookie.split("")
    const cookies: Record<string, string> = {}

    obj.forEach((cookie) => {
      const c = cookie.split("=")
      if (c.length === 2 && c[1] !== "undefined") {
        cookies[c[0].replace(" ", "")] = c[1]
      }
    })

    if (cookies.token !== undefined) {
      if (SessionStore.setToken(cookies.token)) {
        document.cookie = "token= domain=.prediza.io expires=Thu, 01 Jan 1970 00:00:00 UTC path=/"
        SessionStore.fetchEnvironments(() => { })
        SessionStore.fetchPreference();
        navigate("/customer?start=0&limit=10")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if ((page || "") !== selectedPage) {
      setSelectedPage(page || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    const values = queryString.parse(search)
    if (values.token || "" !== token) {
      setToken(values.token || "")
    }

    const tk = StringUtils.getParameterByName("token")
    if (tk !== null && tk !== undefined && tk !== "" && tk !== "") {
      setToken(tk)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <HelmetProvider>
      <Grid container justifyContent="center" alignItems="center">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Prediza | Login</title>
          <meta name="description" content="Prediza | Login" />
        </Helmet>
        {selectedPage !== "" &&
          <Grow in={selectedPage !== null} timeout={500}>
            <Grid>
              {pages.includes(selectedPage) &&
                <Grid item>
                  <AcessPage page={selectedPage} token={token} />
                </Grid>
              }
            </Grid>
          </Grow>
        }
      </Grid>
    </HelmetProvider>
  )
}

export default Access