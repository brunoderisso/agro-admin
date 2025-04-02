import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { InputAdornment, ListSubheader, Select, Typography } from "@mui/material"

import ThemedSelectFormControl from "../../../../../Common/Themed/ThemedSelectFormControl"
import ArrowDownIcon from "../../../../../../img/icons/arrowDown.svg?react"
import PredizaSearchIcon from "../../../../../../img/AdvancedMapIcons/PredizaSearchIcon.svg?react"
import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/Select"
import stringsUtils from "../../../../../../utils/StringUtils"
import ThemedTextField from "../../../../../Common/Themed/ThemedTextField"
import PredizaScrollBar from "../../../../../Common/PredizaScrollBar"
import CouponMenuItem from "./CouponMenuItem"
import { useCouponStore, usePlanStore } from "../../../../../../stores/SubscriptionStore"


function CouponSelect({ coupons  }) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState("")

  const planStore = usePlanStore()
  const couponStore = useCouponStore()

  const displayedOptions = useMemo(() => {
    return coupons.filter((coupon) => coupon.name.toLowerCase().includes(searchText.toLowerCase()))
  }, [searchText, coupons])

  const clickSelectOption = (coupon) => {
    couponStore.setSelected(coupon)
    setOpen(false)
    setSearchText("")
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }

  return (
    <ThemedSelectFormControl fullWidth size="small">
      <Select
        name="coupon"
        value={couponStore.selected?.name || ""}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        displayEmpty
        disabled={!planStore.selected}
        IconComponent={ArrowDownIcon}
        renderValue={selected => (
          <Typography className={classes.text}>{stringsUtils.toCapitalize(selected)}</Typography>
        )}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 300,
              overflow: "hidden"
            },
          },
        }}
      >
        <ListSubheader className={classes.subheader}>
          <ThemedTextField
            name="coupon"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PredizaSearchIcon />
                </InputAdornment>
              ),
            }}
            onKeyDown={event => {
              if (event.key !== "Escape") {
                event.stopPropagation()
              }
            }}
            value={searchText}
            onChange={handleChange}
            placeholder={t("homePanel.subscriptions.searchFieldCoupon")}
            variant="standard"
            fullWidth
            autoFocus
          />
        </ListSubheader>
        <PredizaScrollBar customHeight={"230px"}>
          {displayedOptions.map((coupon, index) => (
            <CouponMenuItem key={index} coupon={coupon} onClickHandle={clickSelectOption} />
          ))}
        </PredizaScrollBar>
      </Select>
    </ThemedSelectFormControl>
  )
}

CouponSelect.propTypes = {
  coupons: PropTypes.array.isRequired,
}

export default CouponSelect