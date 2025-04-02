import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { ConstantsUtils } from "../utils/ConstantsUtils"


function useParamsPagination() {
  const { search } = useLocation()

  const [pagination, setPagination] = useState({
    rowsPerPage: null,
    totalItems: 0
  })

  useEffect(() => {
    if (search?.length > 0) {
      const params = new URLSearchParams(search)
      const limit = +params.get("limit")
      const start = +params.get("start")

      setPagination({
        rowsPerPage: limit >= ConstantsUtils.RowsPerPage ? limit : ConstantsUtils.RowsPerPage,
        totalItems: start
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return pagination
}

export default useParamsPagination