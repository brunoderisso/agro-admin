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
import PlanMenuItem from "./PlanMenuItem"
import PredizaScrollBar from "../../../../../Common/PredizaScrollBar"
import masksUtils from "../../../../../../utils/MasksUtils"
import { usePlanStore } from "../../../../../../stores/SubscriptionStore"


function PlanSelect({ plans, disable }) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [open, setOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("")
  const planStore = usePlanStore()

  const displayedOptions = useMemo(() => {
    return plans.filter((plan) => plan.name.toLowerCase().includes(searchText.toLowerCase()))
  }, [searchText, plans])

  const clickSelectOption = (plan) => {
    planStore.setSelected(plan)
    setOpen(false)
    setSearchText("")
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }

  return (
    <ThemedSelectFormControl fullWidth size="small">
      <Select
        name="plan"
        value={planStore.selected?.name || ""}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        displayEmpty
        disabled={disable}
        IconComponent={ArrowDownIcon}
        renderValue={selected => (
          <Typography className={classes.text}>
            {planStore.selected && selected
              && `${stringsUtils.toCapitalize(selected)} (${masksUtils.currencyFormatToReal(planStore.selected.value_cents)})`
            }
          </Typography>
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
            name="plan"
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
            placeholder={t("homePanel.subscriptions.searchFieldPlan")}
            variant="standard"
            fullWidth
            autoFocus
          />
        </ListSubheader>
        <PredizaScrollBar customHeight={"230px"}>
          {displayedOptions.map((plan, index) => (
            <PlanMenuItem key={index} plan={plan} onClickHandle={clickSelectOption} />
          ))}
        </PredizaScrollBar>
      </Select>
    </ThemedSelectFormControl>
  )
}

PlanSelect.propTypes = {
  plans: PropTypes.array.isRequired,
  disable: PropTypes.bool.isRequired,
}

export default PlanSelect