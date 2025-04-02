import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import HomePanel from "../components/HomePanel/HomePanel"
import View from "../components/View"


function Home() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/customer?start=0&limit=10")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View>
      <HomePanel />
    </View>
  )
}

export default Home