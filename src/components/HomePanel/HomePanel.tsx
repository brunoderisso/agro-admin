import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Grid } from "@mui/material"
import Box from "@mui/material/Box"

import HomeMenu from "./HomeMenu"


function HomePanel() {
  const [pageHome, setPageHome] = useState<number>(null)
  const [tab, setTab] = useState<string>("")

  const navigate = useNavigate()
  const location = useLocation()
  const url = location.pathname.split("/")[1]

  useEffect(() => {
    if (url !== tab) {
      setTab(url || "customer")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (tab === "customer") {
      setPageHome(0)
    } else if (tab === "plan") {
      setPageHome(1)
    } else if (tab === "coupon") {
      setPageHome(2)
    } else if (tab === "subscription") {
      setPageHome(3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const handleChange = (newValue) => {
    let newTab = ""

    if (newValue === 0) {
      newTab = "customer?start=0&limit=10"
    } else if (newValue === 1) {
      newTab = "plan?start=0&limit=10"
    } else if (newValue === 2) {
      newTab = "coupon?start=0&limit=10"
    } else if (newValue === 3) {
      newTab = "subscription/new" // TODO: provisória
    }

    if (tab !== newTab) {
      setTab(newTab)
      navigate("/" + newTab)
    }
  }

  return (
    <Grid>
      <Box sx={{ margin: "0px 48px" }}>
        <HomeMenu onChange={handleChange} page={pageHome} />
        <Outlet />
      </Box>
    </Grid>
  )
}

export default HomePanel