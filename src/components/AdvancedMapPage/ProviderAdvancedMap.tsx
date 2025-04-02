import { createContext, useEffect, useState } from "react"

import GMapStore from "../../stores/GoogleMapStore"
import stringsUtils from "../../utils/StringUtils"
import CancelToken from "../../helpers/cancelToken"
import { MarketType } from "../../interfaces/AdvancedMapPage/GoogleMaps"


const ContextMarkets = createContext(undefined)

const ProviderMarkets = ({ children }) => {
  const [markets, setMarkets] = useState<MarketType[] | { error: string }>([])

  useEffect(() => {
    const controller = new AbortController()

    getMarkets()

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    GMapStore.emit("mapMarkets_load", markets)

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markets])

  const getMarkets = () => {
    GMapStore.getMarketsRequest(CancelToken(), responseGetMarkets)
  }

  const responseGetMarkets = (response) => {
    CancelToken().remove(response.id)

    if (response.data) {
      const marketsOutput: MarketType[] = response.data
      const marketSelectListOutput = []

      if (marketsOutput.length > 0) {
        marketsOutput.forEach(market => {
          marketSelectListOutput.push({
            name: stringsUtils.patternMarketName(market.name),
            objectid: market.objectid,
            bounds: market.bounds,
            market: true
          })
        })

        GMapStore.storeTotalMarkets(marketSelectListOutput)
        setMarkets(marketSelectListOutput)
      }

    } else {
      setMarkets({ error: response.status.toString() })
    }
  }

  return (
    <ContextMarkets.Provider value={{ markets, setMarkets }}>
      {children}
    </ContextMarkets.Provider>
  )
}

export { ContextMarkets, ProviderMarkets }