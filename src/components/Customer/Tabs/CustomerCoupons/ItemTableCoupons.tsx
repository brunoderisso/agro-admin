import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { TableCell, TableRow, Typography } from "@mui/material"

import useStyles from "../../../../styles/Customer/CustomerCoupons/ItemTableCoupons"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import { CouponType } from "../../../../interfaces/Coupons"


function ItemTableCoupons(props) {
  const { classes, cx } = useStyles()

  const [coupon, setCoupon] = useState<CouponType>(null)

  useEffect(() => {
    if (props.coupon) {
      setCoupon(props.coupon)
    }
  }, [props.coupon])

  return (
    <TableRow>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: coupon?.status === "Ativo",
          [classes.inactiveText]: coupon?.status === "Inativo",
        })}>
          {coupon?.name || ConstantsUtils.NullFieldMask}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: coupon?.status === "Ativo",
          [classes.inactiveText]: coupon?.status === "Inativo",
        })}>
          {coupon?.value}%
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: coupon?.status === "Ativo",
          [classes.inactiveText]: coupon?.status === "Inativo",
        })}>
          {coupon?.created_at}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={cx(classes.commonText, {
          [classes.textTable]: coupon?.status === "Ativo",
          [classes.inactiveText]: coupon?.status === "Inativo",
        })}>
          {coupon?.status}
        </Typography>
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
    recurrent: PropTypes.bool,
  }).isRequired,
}

export default ItemTableCoupons