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
import PropertyMenuItem from "./PropertyMenuItem"
import { usePropertyStore } from "../../../../../../stores/SubscriptionStore"


function PropertySelect({ properties }) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [open, setOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("")
  const propertyStore = usePropertyStore()

  const displayedOptions = useMemo(() => {
    return properties.filter((property) => property.name.toLowerCase().includes(searchText.toLowerCase())
      && property.name.toLowerCase() !== propertyStore.selected.name.toLowerCase()
    )
  }, [searchText, properties, propertyStore.selected])

  const clickSelectOption = (property) => {
    propertyStore.setSelected(property)
    setOpen(false)
    setSearchText("")
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }

  const removeSelectedProperty = () => {
    propertyStore.setSelected(null)
  }

  return (
    <ThemedSelectFormControl fullWidth size="small">
      <Select
        name="property"
        value={propertyStore.selected.name}
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
            }}
            onKeyDown={event => {
              if (event.key !== "Escape") {
                event.stopPropagation()
              }
            }}
            value={searchText}
            onChange={handleChange}
            placeholder={t("homePanel.subscriptions.searchFieldProperty")}
            variant="standard"
            fullWidth
            autoFocus
          />
          {propertyStore.selected &&
            <PropertyMenuItem
              property={propertyStore.selected}
              selected={true}
              onClickHandle={removeSelectedProperty}
            />
          }
        </ListSubheader>
        {searchText.length > 0 && displayedOptions.map((property, index) => (
          <PropertyMenuItem key={index} property={property} onClickHandle={clickSelectOption} />
        ))}
      </Select>
    </ThemedSelectFormControl>
  )
}

PropertySelect.propTypes = {
  properties: PropTypes.array.isRequired,
}

export default PropertySelect