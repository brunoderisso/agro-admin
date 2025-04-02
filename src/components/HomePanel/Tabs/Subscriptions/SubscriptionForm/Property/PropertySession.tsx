import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Button, CircularProgress, Grid, InputAdornment, Menu, Typography } from "@mui/material"

import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/PropertySession"
import AddIcon from "../../../../../../img/icons/addIcon.svg?react"
import PredizaSearchIcon from "../../../../../../img/AdvancedMapIcons/PredizaSearchIcon.svg?react"
import ThemedTextField from "../../../../../Common/Themed/ThemedTextField"
import PropertyMenuItem from "./PropertyMenuItem"
import PropertySelect from "./PropertySelect"
import environmentStore from "../../../../../../stores/EnvironmentStore"
import CancelToken from "../../../../../../helpers/cancelToken"
import { useCustomerStore, usePropertyStore } from "../../../../../../stores/SubscriptionStore"


function PropertySession({ handleDrawer, handleErrorStatus }) {
  const [searchText, setSearchText] = useState<string>("")
  const [properties, setProperties] = useState([])
  const [disableAddBt, setDisableAddBt] = useState<boolean>(true)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 })
  const [anchorEl, setAnchorEl] = useState(null)
  const [flagMode, setFlagMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const customerStore = useCustomerStore()
  const propertyStore = usePropertyStore()

  const { classes, cx } = useStyles({ disableAddBt })
  const { t } = useTranslation()

  const displayedOptions = useMemo(() => {
    return properties.filter((property) => property.name.toLowerCase().includes(searchText.toLowerCase()))
  }, [searchText, properties])

  const flagGetPropertiesRef = useRef(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!customerStore.selected) {
      propertyStore.setSelected(null)
      setSearchText("")
      handleDisableAddBt(true)
    } else {
      handleDisableAddBt(false)
    }
  }, [customerStore.selected])

  useEffect(() => {
    if (searchText.length > 0 && !flagGetPropertiesRef.current) {
      getProperties()
    }
  }, [searchText, customerStore.selected])

  useEffect(() => {
    if (propertyStore.selected) {
      setFlagMode(true)
    }
  }, [propertyStore.selected])

  const handleDisableAddBt = (status) => {
    setDisableAddBt(status)
  }

  const getProperties = () => {
    flagGetPropertiesRef.current = true
    setLoading(true)
    environmentStore.getEnvironmentList(CancelToken(), responseGetProperties)
  }

  const responseGetProperties = (response) => {
    CancelToken().remove(response.id)
    setLoading(false)

    if (response.data?.items?.length > 0) {
      setProperties(response.data.items)
    }

    if (response.status) {
      flagGetPropertiesRef.current = false
      handleErrorStatus(response.status.toString())
    }
  }

  // const getCustomerProperties = () => {
  //   flagGetPropertiesRef.current = true
  //   customerStore.getPropertiesByCustomer(CancelToken(), selectedCustomer.objectid, null, responseGetCustomerProperties)
  // }

  // const responseGetCustomerProperties = (response) => {
  //   CancelToken().remove(response.id)

  //   if (response.data?.items?.length > 0) {
  //     setProperties(response.data.items)
  //   }

  //   if (response.status) {
  //     flagGetPropertiesRef.current = false
  //     handleErrorStatus(response.status.toString())
  //   }
  // }

  const addNewProperty = () => {
    if (typeof handleDrawer === "function") {
      handleDrawer(true)
    }
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)

    if (event.target.value) {
      const rect = event.currentTarget.getBoundingClientRect()

      setMenuPosition({
        top: rect.bottom + window.scrollY - 6, // Posiciona abaixo do textField
        left: rect.left - 40,
        width: rect.width + 40
      })

      setAnchorEl(event.currentTarget)
    } else {
      setAnchorEl(null)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)

    // Mantém o focus no CustomOutlinedText ao fechar o menu
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleMenuOpen = () => {
    // Mantém o focus no CustomOutlinedText
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const selectProperty = (property) => {
    propertyStore.setSelected(property)
    setSearchText("")
    handleClose()
  }

  return (
    <Grid container className={classes.container}>
      <Grid item container className={classes.header}>
        <Typography variant="overline" className={classes.title}>
          {t("homePanel.subscriptions.property")}
        </Typography>
        <Button color="primary" className={classes.primaryBtn} onClick={addNewProperty} disabled={disableAddBt}>
          <AddIcon className={cx({ [classes.disabledButton]: disableAddBt })} />
          <Typography className={classes.addTextBtn}>
            {t("homePanel.subscriptions.newProperty")}
          </Typography>
        </Button>
      </Grid>
      <Grid item container>
        {flagMode && propertyStore.selected?.name
          ? <PropertySelect properties={properties} />
          : <>
            <ThemedTextField
              name="property"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PredizaSearchIcon />
                  </InputAdornment>
                ),
                endAdornment: loading
                  ? (
                    <InputAdornment position="end">
                      <CircularProgress size={18} />
                    </InputAdornment>
                  )
                  : null
              }}
              value={searchText}
              onChange={handleChange}
              placeholder={t("homePanel.subscriptions.searchFieldProperty")}
              variant="outlined"
              fullWidth
              inputRef={inputRef}
            />
            {displayedOptions.length > 0 &&
              <Menu
                anchorReference="anchorPosition"
                anchorPosition={menuPosition}
                elevation={4}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
                disableAutoFocusItem
                disableEnforceFocus
                TransitionProps={{ onEnter: handleMenuOpen }}
                slotProps={{
                  paper: {
                    sx: { width: menuPosition.width }
                  },
                }}
              >
                {displayedOptions.map((property, index) => (
                  <PropertyMenuItem key={index} property={property} onClickHandle={selectProperty} />
                ))}
              </Menu>
            }
          </>
        }
      </Grid>
    </Grid>
  )
}

PropertySession.propTypes = {
  handleDrawer: PropTypes.func.isRequired,
  handleErrorStatus: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.object,
}

export default PropertySession