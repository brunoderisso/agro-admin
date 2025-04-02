import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { InputAdornment, ListSubheader, Select, Typography } from "@mui/material"

import ThemedSelectFormControl from "../../../../../Common/Themed/ThemedSelectFormControl"
import ArrowDownIcon from "../../../../../../img/icons/arrowDown.svg?react"
import PredizaSearchIcon from "../../../../../../img/AdvancedMapIcons/PredizaSearchIcon.svg?react"
import CustomerMenuItem from "./CustomerMenuItem"
import useStyles from "../../../../../../styles/HomePanel/Tabs/Subscriptions/Select"
import stringsUtils from "../../../../../../utils/StringUtils"
import ThemedTextField from "../../../../../Common/Themed/ThemedTextField"
import { useCustomerStore } from "../../../../../../stores/SubscriptionStore"


function CustomerSelect({ customers }) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [open, setOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("")
  const customerStore = useCustomerStore()

  const displayedOptions = useMemo(() => {
    return customers.filter((customer) => (customer.name.toLowerCase().includes(searchText.toLowerCase())
      || customer.email.toLowerCase().includes(searchText.toLowerCase()))
      && customer.email.toLowerCase() !== customerStore.selected.email.toLowerCase())
  }, [searchText, customers, customerStore.selected])

  const clickSelectOption = (customer) => {
    customerStore.setSelected(customer)
    setOpen(false)
    setSearchText("")
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }

  const removeSelectedCustomer = () => {
    customerStore.setSelected(null)
  }

  return (
    <ThemedSelectFormControl fullWidth size="small">
      <Select
        name="customer"
        value={customerStore.selected.name}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        displayEmpty
        IconComponent={ArrowDownIcon}
        renderValue={selected => (
          <Typography className={classes.text}>{stringsUtils.toCapitalize(selected)}</Typography>
        )}
      >
        <ListSubheader className={classes.subheader}>
          <ThemedTextField
            name="customer"
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
            placeholder={t("homePanel.subscriptions.searchFieldCustomer")}
            variant="standard"
            fullWidth
            autoFocus
          />
          {customerStore.selected &&
            <CustomerMenuItem
              customer={customerStore.selected}
              selected={true}
              onClickHandle={removeSelectedCustomer}
            />
          }
        </ListSubheader>
        {searchText.length > 0 && displayedOptions.map((customer, index) => (
          <CustomerMenuItem key={index} customer={customer} onClickHandle={clickSelectOption} />
        ))}
      </Select>
    </ThemedSelectFormControl>
  )
}

CustomerSelect.propTypes = {
  customers: PropTypes.array.isRequired,
}

export default CustomerSelect