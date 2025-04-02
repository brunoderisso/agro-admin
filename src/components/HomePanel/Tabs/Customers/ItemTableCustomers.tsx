import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import PropTypes from "prop-types"

import { Grid, IconButton, Link, Menu, MenuItem, TableCell, TableRow, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"

import useStyles from "../../../../styles/HomePanel/Tabs/Customers/ItemTableCustomers"
import theme from "../../../../styles/Utils/Theme"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import { CustomerTableType } from "../../../../interfaces/Customers"


function ItemTableCustomers(props) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null)
  const [customer, setCustomer] = useState<CustomerTableType>(null)

  useEffect(() => {
    if (props.customer) {
      setCustomer(props.customer)
    }
  }, [props.customer])

  const optionCardMenu = [
    { text: t("homePanel.customers.menuOption.text1") },
    { text: t("homePanel.customers.menuOption.text2") },
    { text: t("homePanel.customers.menuOption.text3"), color: theme.colors.error[40] },
  ]

  const handleClickBt = (event) => {
    setAnchorEl(event.currentTarget)
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
        })
        }
      </Menu>
    )
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleMenuItem = (text) => {
    handleCloseMenu()

    switch (text) {
      case t("homePanel.customers.menuOption.text1"): {
        if (typeof props.handleContactModal === "function") {
          props.handleContactModal(true, customer)
        }

        break
      }
      case t("homePanel.customers.menuOption.text2"): {
        navigate("/customer/" + customer.objectId + "/invoice?start=0&limit=10")

        break
      }
      case t("homePanel.customers.menuOption.text3"): {
        if (typeof props.handleModal === "function") {
          props.handleModal(true, customer)
        }

        break
      }
      default: {
        break
      }
    }
  }

  return (
    <TableRow>
      <TableCell sx={{ maxWidth: "304px" }}>
        <Grid className={classes.truncateText}>
          <Link href={"/finance/#/customer/" + customer?.objectId + "/data"} underline="none">
            <Typography className={cx(classes.commonText, classes.textTable)} noWrap>
              {customer?.name || ConstantsUtils.NullFieldMask}
            </Typography>
          </Link>
        </Grid>
      </TableCell>
      <TableCell sx={{ maxWidth: "204px" }}>
        <Grid className={classes.truncateText}>
          <Typography className={cx(classes.commonText, classes.textTable)} noWrap>
            {customer?.email || ConstantsUtils.NullFieldMask}
          </Typography>
        </Grid>
      </TableCell>
      <TableCell>
        <Grid container sx={{ gap: "16px" }}>
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

ItemTableCustomers.propTypes = {
  customer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
    phone: PropTypes.any
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleContactModal: PropTypes.func.isRequired,
}

export default ItemTableCustomers