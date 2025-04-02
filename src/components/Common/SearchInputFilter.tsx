import { useState, useEffect } from "react"

import {
  FormControl,
  Select,
  ListSubheader,
  MenuItem,
  TextField,
  InputAdornment,
  Box,
  FormControlLabel,
  Grid,
} from "@mui/material"

import PredizaSearchIcon from "../../img/AdvancedMapIcons/PredizaSearchIcon.svg?react"
import CustomCheckBox from "./Themed/ThemedCheckBox"
import useStyles from "../../styles/Common/SearchInputFilter"
import GMapStore from "../../stores/GoogleMapStore"


const SearchInputFilter = ({
  selectedOption,
  setSelectedOption,
  displayedOptions,
  setSearchText,
  placeholder,
  marketSelectList,
  setMarketSelectList
}) => {
  const { classes } = useStyles()

  const [checkboxes, setCheckboxes] = useState(null)
  const [allChecked, setAllChecked] = useState<boolean>(false)

  useEffect(() => {
    bind()

    return clear
  }, [])

  useEffect(() => {
    if (checkboxes) {
      setAllChecked(Object.values(checkboxes).every(item => item))
    }
  }, [checkboxes])

  useEffect(() => {
    let newCheckboxes = { ...checkboxes }

    GMapStore.getTotalMarkets().forEach(market => {
      if (marketSelectList.some(selected => selected.objectid === market.objectid)) {
        newCheckboxes = { ...newCheckboxes, [market.objectid]: true }
      } else {
        newCheckboxes = { ...newCheckboxes, [market.objectid]: false }
      }
    })
    setCheckboxes(newCheckboxes)
  }, [marketSelectList])

  const bind = () => {
    GMapStore.addListener("checkboxesPanel_clear", clearAllCheckboxes)
  }

  const clear = () => {
    GMapStore.removeListener("checkboxesPanel_clear", clearAllCheckboxes)
  }

  const handleChangeCheckBox = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked })

    if (event.target.checked) {
      // Se foi marcado, adiciona o mercado a lista de mercados selecionados
      const addedMarket = GMapStore.getTotalMarkets().find(market => market.objectid === event.target.name)

      setMarketSelectList((prevList) => [...prevList, { ...addedMarket }])
    } else {
      // Se foi desmarcado, remove o mercado da lista de mercados selecionados
      setMarketSelectList((prevList) =>
        prevList.filter((item) => item.objectid !== event.target.name)
      )
    }
  }

  const clearAllCheckboxes = () => {
    let newCheckboxes = {}

    if (checkboxes) {
      newCheckboxes = { ...checkboxes }

      Object.keys(newCheckboxes).forEach(objectid => {
        newCheckboxes[objectid] = false
      })
    } else {
      GMapStore.getTotalMarkets().forEach(market => {
        newCheckboxes[market.objectid] = false
      })
    }

    setCheckboxes(newCheckboxes)
  }

  const handleChangeAll = (event) => {
    setAllChecked(event.target.checked)

    if (event.target.checked) {
      const newCheckboxes = { ...checkboxes }

      Object.keys(newCheckboxes).forEach(objectid => {
        newCheckboxes[objectid] = true
      })
      setMarketSelectList(GMapStore.getTotalMarkets())
      setCheckboxes(newCheckboxes)
    } else {
      clearAllCheckboxes()
      setMarketSelectList([])
    }
  }

  const onChangeSelectedOption = (value) => {
    if (value) {
      setSelectedOption(value)
    }
  }

  return (
    <FormControl className={classes.selectInputForm} size="small">
      <Select
        MenuProps={{ autoFocus: false }}
        labelId="search-select-label"
        id="search-select"
        value={selectedOption}
        onChange={event => {
          onChangeSelectedOption(event.target.value)
        }}
        onClose={() => setSearchText("")}
        renderValue={() => "SELECIONAR MERCADOS"}
        className={classes.selectInput}
      >
        <ListSubheader className={classes.selectInputListSubheader}>
          <TextField
            className={classes.textFieldSearch}
            size="small"
            autoFocus
            placeholder={placeholder}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PredizaSearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={event => setSearchText(event.target.value)}
            onKeyDown={event => {
              if (event.key !== "Escape") {
                event.stopPropagation()
              }
            }}
          />
        </ListSubheader>
        <Box component="hr" className={classes.hrStyle} />
        <Grid className={classes.rollableContainer}>
          <Box display="flex" flexDirection="column" ml="16px">
            <FormControlLabel
              label="Todos"
              control={
                <CustomCheckBox
                  checked={allChecked}
                  onChange={handleChangeAll}
                />
              }
            />
          </Box>
          {checkboxes &&
            <Box display="flex" flexDirection="column">
              {displayedOptions && displayedOptions.map((option, index) => (
                <MenuItem key={index} value={option.objectid}>
                  <FormControlLabel
                    label={option.name}
                    control={
                      <CustomCheckBox
                        className={classes.containerFilterCheckBox}
                        checked={checkboxes[option.objectid]}
                        onChange={(event) => handleChangeCheckBox(event)}
                        name={option.objectid}
                      />
                    }
                  />
                </MenuItem>
              ))}
            </Box>
          }
        </Grid>
      </Select>
    </FormControl>
  )
}

export default SearchInputFilter
