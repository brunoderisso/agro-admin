import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

import PropTypes from "prop-types"

import { Grid, IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"

import useStyles from "../../../../styles/HomePanel/Tabs/Coupons/ItemTableCoupons"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import theme from "../../../../styles/Utils/Theme"
import couponStore from "../../../../stores/CouponStore"
import { CouponType } from "../../../../interfaces/Coupons"
import CancelToken from "../../../../helpers/cancelToken"


function ItemTableCoupons(props) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()
  const { search } = useLocation()

  const [coupon, setCoupon] = useState<CouponType>(null)
  const [anchorEl, setAnchorEl] = useState(null)

  const optionCardMenu = [
    { text: t("homePanel.coupons.menuOption.text1") },
    {
      text: coupon?.status === t("homePanel.plans.tableRowActive")
        ? t("homePanel.coupons.menuOption.text3")
        : t("homePanel.coupons.menuOption.text2")
    },
    { text: t("homePanel.coupons.menuOption.text4"), color: theme.colors.error[40] },
  ]

  useEffect(() => {
    if (props.coupon) {
      setCoupon(props.coupon)
    }
  }, [props.coupon])

  const handleStatusCoupon = () => {
    const body = {
      enable: coupon?.status === t("homePanel.plans.tableRowActive") ? false : true
    }

    couponStore.updateCoupon(CancelToken(), coupon.objectid, body, responseHandleStatusCoupon)
  }

  const responseHandleStatusCoupon = (response) => {
    CancelToken().remove(response.id)

    if (response.data) {
      couponStore.emit(
        "coupons_reload",
        [+search.replace("?", "").split("&")[0].split("=")[1], +search.replace("?", "").split("&")[1].split("=")[1]]
      )
      couponStore.emit("coupons_feedback", "200")
    }

    if (response.status) {
      couponStore.emit("coupons_feedback", response.status.toString())
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
            <MenuItem key={index} onClick={() => { handleMenuItem(item.text) }}>
              <Typography className={classes.textItemMenu} sx={{ color: item.color }}>
                {item.text}
              </Typography>
            </MenuItem>
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
      case t("homePanel.coupons.menuOption.text1"): {
        props.handleModal(true, "edit", coupon)

        break
      }
      case t("homePanel.coupons.menuOption.text2"): {
        handleStatusCoupon()

        break
      }
      case t("homePanel.coupons.menuOption.text3"): {
        handleStatusCoupon()

        break
      }
      case t("homePanel.coupons.menuOption.text4"): {
        props.handleModal(true, "remove", coupon)

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
          [classes.textTable]: coupon?.status === t("homePanel.plans.tableRowActive"),
          [classes.inactiveText]: coupon?.status === t("homePanel.plans.tableRowInactive"),
        })}>
          {coupon?.name || ConstantsUtils.NullFieldMask}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: coupon?.status === t("homePanel.plans.tableRowActive"),
          [classes.inactiveText]: coupon?.status === t("homePanel.plans.tableRowInactive"),
        })}>
          {coupon?.value}%
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: coupon?.status === t("homePanel.plans.tableRowActive"),
          [classes.inactiveText]: coupon?.status === t("homePanel.plans.tableRowInactive"),
        })}>
          {coupon?.created_at}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: coupon?.status === t("homePanel.plans.tableRowActive"),
          [classes.inactiveText]: coupon?.status === t("homePanel.plans.tableRowInactive"),
        })}>
          {coupon?.expirer_at}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: coupon?.status === t("homePanel.plans.tableRowActive"),
          [classes.inactiveText]: coupon?.status === t("homePanel.plans.tableRowInactive"),
        })}>
          {coupon?.status}
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

ItemTableCoupons.propTypes = {
  coupon: PropTypes.shape({
    objectid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    expirer_at: PropTypes.string.isRequired,
    recurrent: PropTypes.bool,
  }).isRequired,
  handleModal: PropTypes.func.isRequired
}

export default ItemTableCoupons