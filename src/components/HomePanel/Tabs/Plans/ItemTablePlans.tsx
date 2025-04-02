import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import PropTypes from "prop-types"

import { Grid, IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CreditCardIcon from "@mui/icons-material/CreditCard"

import useStyles from "../../../../styles/HomePanel/Tabs/Plans/ItemTablePlans"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import PixIcon from "../../../../img/icons/pixIcon_dark.svg?react"
import PixOutlineIcon from "../../../../img/icons/pixIcon_outline.svg?react"
import CreditCardOutlineIcon from "../../../../img/icons/creditCardIcon_outline.svg?react"
import BarCodeIcon from "../../../../img/icons/barcode.svg?react"
import theme from "../../../../styles/Utils/Theme"
import CustomCondition from "../../../Common/CustomCondition"
import masksUtils from "../../../../utils/MasksUtils"
import stringsUtils from "../../../../utils/StringUtils"
import planStore from "../../../../stores/PlanStore"
import CancelToken from "../../../../helpers/cancelToken"
import { PlansTableType } from "../../../../interfaces/Plans"


function ItemTablePlans(props) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null)
  const [plan, setPlan] = useState<PlansTableType>(null)

  const optionCardMenu = [
    { text: t("homePanel.plans.menuOption.text1") },
    { text: t("homePanel.plans.menuOption.text2") },
    { text: t("homePanel.plans.menuOption.text3"), color: theme.colors.error[40] },
  ]

  useEffect(() => {
    if (props.plan) {
      setPlan(props.plan)
    }
  }, [props.plan])

  const inactivateStatusPlan = () => {
    const body = {
      enable: false
    }

    planStore.updatePlan(CancelToken(), plan.objectid, body, responseInactivateStatusPlan)
  }

  const responseInactivateStatusPlan = (response) => {
    CancelToken().remove(response.id)

    if (response.data?.status === 200) {
      planStore.emit("plans_reload")
      planStore.emit("plans_feedback", response.data.status.toString())
    }

    if (response.status) {
      planStore.emit("plans_feedback", response.status.toString())
    }
  }

  const menuOption = () => {
    return (
      <Menu
        id="option-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        elevation={4}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {optionCardMenu.map((item, index) => {
          return (
            <Grid key={index}>
              {(index !== 1 || plan?.status === t("homePanel.plans.tableRowActive")) &&
                <MenuItem onClick={() => { handleMenuItem(item.text) }}>
                  <Typography className={classes.textItemMenu} sx={{ color: item.color }}>
                    {item.text}
                  </Typography>
                </MenuItem>
              }
            </Grid>
          )
        })}
      </Menu>
    )
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleMenuItem = (text) => {
    handleCloseMenu()

    switch (text) {
      case t("homePanel.plans.menuOption.text1"): {
        navigate("/plan/" + plan.objectid + "/edit")

        break
      }
      case t("homePanel.plans.menuOption.text2"): {
        inactivateStatusPlan()

        break
      }
      case t("homePanel.plans.menuOption.text3"): {
        props.handleModal(true, plan)

        break
      }
      default: {
        break
      }
    }
  }

  const handleClickBt = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <TableRow>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: plan?.status === t("homePanel.plans.tableRowActive"),
          [classes.inactiveText]: plan?.status === t("homePanel.plans.tableRowInactive"),
        })}>
          {plan?.name ? stringsUtils.toCapitalize(plan.name) : ConstantsUtils.NullFieldMask}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: plan?.status === t("homePanel.plans.tableRowActive"),
          [classes.inactiveText]: plan?.status === t("homePanel.plans.tableRowInactive"),
        })}>
          {plan?.value ? masksUtils.currencyFormat(+plan.value) : ConstantsUtils.NullFieldMask}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: plan?.status === t("homePanel.plans.tableRowActive"),
          [classes.inactiveText]: plan?.status === t("homePanel.plans.tableRowInactive"),
        })}>
          {plan?.interval ? stringsUtils.toCapitalize(plan.interval) : ConstantsUtils.NullFieldMask}
        </Typography>
      </TableCell>
      <TableCell>
        <Grid container sx={{ gap: "16px" }}>
          {plan?.payments?.length > 0
            ? plan.payments.map((payment, index) => {
              return (
                <Grid key={index}>
                  <CustomCondition
                    test={[payment === "Cartão de Crédito", payment === "Pix"]}
                  >
                    {plan?.status === t("homePanel.plans.tableRowActive")
                      ? <CreditCardIcon fontSize="small" />
                      : <CreditCardOutlineIcon className={classes.cardIcon} />
                    }
                    {plan?.status === t("homePanel.plans.tableRowActive")
                      ? <PixIcon fontSize="small" />
                      : <PixOutlineIcon className={classes.pixIcon} />
                    }
                    <BarCodeIcon fontSize="small" className={cx({
                      [classes.barCodeOutline]: plan?.status === t("homePanel.plans.tableRowInactive")
                    })} />
                  </CustomCondition>
                </Grid>
              )
            })
            : ConstantsUtils.NullFieldMask
          }
        </Grid>
      </TableCell>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: plan?.status === t("homePanel.plans.tableRowActive"),
          [classes.inactiveText]: plan?.status === t("homePanel.plans.tableRowInactive"),
        })}>
          {plan?.status}
        </Typography>
      </TableCell>
      <TableCell>
        <Grid container>
          <IconButton
            aria-label="option"
            size="small"
            color="inherit"
            className={classes.btOptions}
            onClick={handleClickBt}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          {menuOption()}
        </Grid>
      </TableCell>
    </TableRow>
  )
}

ItemTablePlans.propTypes = {
  plan: PropTypes.shape({
    objectid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    interval: PropTypes.string,
    status: PropTypes.string.isRequired,
    payments: PropTypes.arrayOf(PropTypes.string).isRequired,
    features: PropTypes.arrayOf(PropTypes.any),
    subitems: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  handleModal: PropTypes.func.isRequired,
}

export default ItemTablePlans