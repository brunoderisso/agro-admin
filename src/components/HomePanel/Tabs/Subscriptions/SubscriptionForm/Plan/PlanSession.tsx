import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Grid, Skeleton, Typography } from "@mui/material"

import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/PlanSession"
import PlanSelect from "./PlanSelect"
import planStore from "../../../../../../stores/PlanStore"
import CancelToken from "../../../../../../helpers/cancelToken"


function PlanSession({ handleErrorStatus }) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()

    getPlans()

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPlans = () => {
    setLoading(true)
    planStore.getListPlans(CancelToken(), null, responseGetPlans)
  }

  const responseGetPlans = (response) => {
    CancelToken().remove(response.id)
    setLoading(false)

    if (response.data?.items?.length > 0) {
      setPlans(response.data.items)
    }

    if (response.status) {
      handleErrorStatus(response.status.toString())
    }
  }

  return (
    <Grid container className={classes.container}>
      <Grid item container className={classes.header}>
        <Typography variant="overline" className={classes.title}>
          {t("homePanel.coupons.modal.labelSelect")}
        </Typography>
      </Grid>
      <Grid item container>
        {loading
          ? <Skeleton variant="rounded" width={"100%"} height={39} />
          : <PlanSelect
            plans={plans}
            disable={loading}
          />
        }

      </Grid>
    </Grid>
  )
}

PlanSession.propTypes = {
  handleErrorStatus: PropTypes.func.isRequired,
}

export default PlanSession