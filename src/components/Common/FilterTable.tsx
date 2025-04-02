import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"
import moment from "moment"

import { Button, FormControl, Grid, InputAdornment, Menu, OutlinedInput, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import FilterIcon from "../../img/icons/filterIcon.svg?react"
import SearchIcon from "../../img/icons/searchIcon.svg?react"
import useStyles from "../../styles/Common/FilterTable"
import stringsUtils from "../../utils/StringUtils"
import CustomLabel from "./CustomLabel"
import { FilterInputType, FilterItemType } from "../../interfaces/Common/FilterTable"


const delayFilter = 500

function FilterTable(props) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState(null)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>("")
  const [currentFilter, setCurrentFilter] = useState<string>("")
  const [filtersSelected, setFiltersSelected] = useState<FilterItemType[]>([])

  const contentToFilterRef = useRef([])
  const mapOptionsRef = useRef<FilterInputType[]>()
  const flagCheckboxIsEmptyRef = useRef<boolean>(false)

  useEffect(() => {
    if (props.itemAdded) {
      const newFilter: FilterItemType = {
        [props.itemAdded.label]: props.mapItemsFilter.filter(
          item => item.value.toLowerCase() === Object.keys(props.itemAdded)[1].toLowerCase()
        )[0].label
      }
      if (props.itemAdded.isCheckbox) {
        newFilter.isCheckbox = props.itemAdded.isCheckbox
      }

      if (props.itemAdded.isDate) {
        newFilter.isDate = props.itemAdded.isDate
      }

      if (props.itemAdded.isSet) {
        newFilter.isSet = props.itemAdded.isSet
      }

      if (props.itemAdded.isRange) {
        newFilter.isRange = props.itemAdded.isRange
        newFilter.minValue = props.itemAdded.minValue
        newFilter.maxValue = props.itemAdded.maxValue
      }

      if (props.itemAdded.startDate) {
        newFilter.startDate = props.itemAdded.startDate
      }

      if (props.itemAdded.endDate) {
        newFilter.endDate = props.itemAdded.endDate
      }

      if (Object.values(props.itemAdded)[1] === true) {
        checkToUpdateLabel(newFilter)
      } else if (Object.values(props.itemAdded)[1] === false) {
        removeLabelFilter(newFilter)
      } else {
        checkToUpdateLabel(newFilter)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.itemAdded])

  useEffect(() => {
    if (props.contentToRef) {
      contentToFilterRef.current = props.contentToRef
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.contentToRef])

  useEffect(() => {
    const newMapFilters: FilterInputType[] = []

    if (props.filterInput) {
      newMapFilters.push({ label: props.filterInput.label, value: "name" })
    }

    if (props.labels?.length > 1) {
      props.labels.forEach((filter, index) => {
        if (index < props.labels.length - 1) {
          newMapFilters.push({ label: filter.label, value: filter.value })
        }
      })
    }

    mapOptionsRef.current = newMapFilters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.labels, props.filterInput])

  useEffect(() => {
    const updateTable = () => {
      setDisabled(true)

      setTimeout(() => {
        setDisabled(false)

        if (searchInput.length > 0) {
          const newFilter = { [props.labels[props.labels.length - 1].label]: searchInput }

          checkToUpdateLabel(newFilter)
        }
      }, delayFilter)
    }

    const timerId = setTimeout(() => {
      updateTable()
    }, delayFilter)

    // Usa o return do useEffect pra limpar o delay anterior
    // e fazer tudo denovo caso o usuário mude o filtro antes do tempo do delay
    return () => clearTimeout(timerId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  useEffect(() => {
    let itemsToFilter = [...contentToFilterRef.current]
    let checkboxesFilter = []

    filtersSelected.forEach(filter => {
      const filteredParam = mapOptionsRef.current.filter(
        option => option.label.toLowerCase() === Object.keys(filter)[0].toLowerCase()
      )[0].value

      if (filter.isDate) {
        if (filter.isCheckbox) {
          let itemsFilteredCheckbox = null
          if (filter.startDate && !filter.endDate) { // para apenas uma data
            itemsFilteredCheckbox = itemsToFilter.filter(item =>
              moment(filter.startDate, "DD MM YYYY").format("X") === moment(item[filteredParam], "DD MM YYYY").format("X")
            )
          } else if (filter.startDate && filter.endDate) { // para um range de datas

            itemsFilteredCheckbox = itemsToFilter.filter(item => {
              return moment(filter.startDate, "DD MM YYYY").format("x") <= moment(item[filteredParam], "DD MM YYYY").format("x") &&
                moment(filter.endDate, "DD MM YYYY").format("x") >= moment(item[filteredParam], "DD MM YYYY").format("x");
            });
          } else { // período anterior a uma data
            itemsFilteredCheckbox = itemsToFilter.filter(item =>
              moment(filter.endDate, "DD MM YYYY").format("X") >= moment(item[filteredParam], "DD MM YYYY").format("X")
            )
          }

          checkboxesFilter = selectDateWithoutRepeat(itemsFilteredCheckbox, checkboxesFilter)

          if (checkboxesFilter.length === 0) {
            flagCheckboxIsEmptyRef.current = true
          } else {
            flagCheckboxIsEmptyRef.current = false
          }
        } else {
          flagCheckboxIsEmptyRef.current = false

          if (filter.startDate && !filter.endDate) {
            itemsToFilter = itemsToFilter.filter(item => {
              return moment(filter.startDate, "DD MM YYYY").format("x") === moment(item[filteredParam], "DD MM YYYY").format("x")
            })
          } else if (filter.startDate && filter.endDate) {
            itemsToFilter = itemsToFilter.filter(item => {
              return moment(filter.startDate, "DD MM YYYY").format("x") <= moment(item[filteredParam], "DD MM YYYY").format("x") &&
                moment(filter.endDate, "DD MM YYYY").format("x") >= moment(item[filteredParam], "DD MM YYYY").format("x");
            })
          } else {
            itemsToFilter = itemsToFilter.filter(item => {
              return moment(filter.endDate, "DD MM YYYY").format("x") === moment(item[filteredParam], "DD MM YYYY").format("x")
            })
          }
        }
      } else if (filter.isCheckbox) {
        checkboxesFilter.push(...itemsToFilter.filter(item => {
          const repeatedItem = checkboxesFilter.some(checkbox => checkbox.name === item.name)

          if (filter.isSet && typeof Object.values(filter)[0] === "string") {
            return item[filteredParam]?.toLowerCase().includes((Object.values(filter)[0] as string).toLowerCase()) && !repeatedItem
          }

          if (typeof Object.values(filter)[0] === "string") {
            return item[filteredParam]?.toLowerCase() === (Object.values(filter)[0] as string).toLowerCase() && !repeatedItem
          }
        }))

        if (checkboxesFilter.length === 0) {
          flagCheckboxIsEmptyRef.current = true
        } else {
          flagCheckboxIsEmptyRef.current = false
        }
      } else if (filter.isRange) {
        flagCheckboxIsEmptyRef.current = false

        itemsToFilter = itemsToFilter.filter(item => {
          const values = [filter.minValue, filter.maxValue]

          values.sort((a, b) => +a - +b)

          return +values[0] <= +item.value && +item.value <= +values[1]
        })
      } else {
        flagCheckboxIsEmptyRef.current = false

        itemsToFilter = itemsToFilter.filter(item => {
          if (typeof Object.values(filter)[0] === "string") {
            return item[filteredParam].toLowerCase().includes((Object.values(filter)[0] as string).toLowerCase())
          }
        })
      }
    })

    // Caso haja filtro com checkBox, precisa atualizar a filtragem geral com esse filtro,
    // para não repetir itens filtrados
    if (checkboxesFilter.length > 0) {
      const resultingCoupons = []

      checkboxesFilter.forEach(checkbox => {
        if (itemsToFilter.some(item => item.name === checkbox.name)) {
          resultingCoupons.push(checkbox)
        }
      })

      itemsToFilter = resultingCoupons
    }

    if (flagCheckboxIsEmptyRef.current) {
      itemsToFilter = []
    }

    if (typeof props.updateFilteredItems === "function") {
      props.updateFilteredItems(itemsToFilter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersSelected])

  const selectDateWithoutRepeat = (itemsToCheck, itemsCheckbox) => {
    const resultingItems = [...itemsCheckbox]

    itemsToCheck.forEach(item => {
      if (!resultingItems.some(finalItem => finalItem.name === item.name)) {
        resultingItems.push(item)
      }
    })

    return resultingItems
  }

  const checkToUpdateLabel = (newFilter) => {
    let isReplaceFilter = false
    const newFiltersSelected = [...filtersSelected]

    // Não deve substituir a label, a partir do segundo checkBox clicado
    if (!newFilter.isCheckbox || (newFilter.isCheckbox && newFiltersSelected.filter(filter => filter.isCheckbox).length === 0)) {
      // Caso a label seja repetida, substitui a antiga pela nova
      newFiltersSelected.forEach((filter, index) => {
        if (Object.keys(filter)[0] === Object.keys(newFilter)[0]) {
          newFiltersSelected.splice(index, 1, newFilter)
          isReplaceFilter = true

          return
        }
      })
    }

    if (!isReplaceFilter) {
      newFiltersSelected.push(newFilter)
    }

    setFiltersSelected(newFiltersSelected)
  }

  const cleanLabelFilter = (selectedFilter) => {
    flagCheckboxIsEmptyRef.current = false

    // Condições para atualizar o useState
    if (Object.keys(selectedFilter)[0] === props.labels[props.labels.length - 1].label) {
      setSearchInput("")
    } else if (typeof props.cleanItem === "function") {
      props.cleanItem(selectedFilter)
    }

    // Condições para atualizar os filtros selecionados
    if (selectedFilter.isCheckbox) {
      removeLabelFilter(selectedFilter)
    } else {
      setTimeout(() => {
        filtersSelected.forEach((filter, index) => {
          const filterKey = Object.keys(filter)[0]

          if (filterKey.includes(Object.keys(selectedFilter)[0])) {
            const newFiltersSelected = Array.from(filtersSelected)

            newFiltersSelected.splice(index, 1)
            setFiltersSelected(newFiltersSelected)

            return
          }
        })
      }, delayFilter)
    }
  }

  const removeLabelFilter = (filterToRemove) => {
    const totalFilters = [...filtersSelected]
    const indexCurrentMonth = totalFilters.findIndex(filter => Object.values(filter)[0] === Object.values(filterToRemove)[0])

    totalFilters.splice(indexCurrentMonth, 1)
    setFiltersSelected(totalFilters)
    flagCheckboxIsEmptyRef.current = false
  }

  const cleanAllTextFilter = () => {
    setFiltersSelected([])
    setSearchInput("")
    flagCheckboxIsEmptyRef.current = false

    if (typeof props.cleanAllItems === "function") {
      props.cleanAllItems()
    }
  }

  const cleanButtonFilter = (func, height = "auto") => {
    return (
      <Button
        color="primary"
        className={classes.btnClean}
        style={{ height }}
        onClick={func}
      >
        <Typography className={cx(classes.textBtnCommon, classes.textBtnClean)}>
          {t("general.filterClean")}
        </Typography>
      </Button>
    )
  }

  const handleClickSelectFilter = (event) => {
    setAnchorEl(event.currentTarget)
    setCurrentFilter(event.currentTarget.name)
  }

  const handleChangeInput = (event) => {
    const code = event.target.value

    if (code.length > 0) {
      setSearchInput(event.target.value)
    } else {
      cleanLabelFilter({ [props.filterInput.label]: searchInput })
    }
  }

  const handleCloseSelectFilter = () => {
    setAnchorEl(null)
  }

  const childrenFilter = () => {
    return (
      <Grid>
        {typeof props.contentChildrenFilter === "function" && props.contentChildrenFilter(currentFilter)}
      </Grid>
    )
  }

  return (
    <Grid item xs={12}>
      <Grid container spacing={3} alignItems="center">
        <Grid item className={cx({
          [classes.iconFilledFilter]: filtersSelected.length > 0,
          [classes.iconEmptyFilter]: filtersSelected.length === 0
        })}>
          <FilterIcon />
        </Grid>
        <Grid item maxWidth={"100%"}>
          <FormControl
            variant="outlined"
            className={cx(classes.inputs, {
              [classes.inputPlaceholder]: searchInput.length === 0,
              [classes.inputFocus]: searchInput.length > 0,
            })}
            size="small"
            style={{ width: props.filterInput.input || 400, maxWidth: "100%" }}
          >
            <OutlinedInput
              id="key-input"
              value={searchInput}
              onChange={handleChangeInput}
              placeholder={props.filterInput.placeholder}
              endAdornment={
                <InputAdornment position="end">
                  {searchInput.length === 0 && <SearchIcon />}
                  {searchInput.length > 0 && cleanButtonFilter(() =>
                    cleanLabelFilter({ [props.labels[props.labels.length - 1].label]: searchInput }), "24px"
                  )}
                </InputAdornment>
              }
              inputProps={{
                "aria-label": "coupon",
              }}
              disabled={disabled}
            />
          </FormControl>
        </Grid>

        {props.filtersBtn?.map((btn, index) => {
          return (
            <Grid item key={index}>
              <Button
                name={btn.name}
                variant="outlined"
                color="primary"
                className={classes.filterBtn}
                onClick={handleClickSelectFilter}
                aria-controls="filter-menu"
                aria-haspopup="true"
              >
                <Typography className={cx(classes.textBtnCommon, classes.filterTextBtn)}>{btn.label}</Typography>
                <ExpandMoreIcon fontSize="small" />
              </Button>
            </Grid>
          )
        })}

        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          elevation={4}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseSelectFilter}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {childrenFilter()}
        </Menu>
      </Grid>
      {filtersSelected.length > 0 &&
        <Grid className={classes.wrapperLabelsFilter}>
          {filtersSelected.map((filter, index) => {
            return (
              <CustomLabel
                key={index}
                tagText={`${stringsUtils.toCapitalize(Object.keys(filter)[0])}:`}
                mainText={Object.values(filter)[0] as string}
                cleanFunc={() => cleanLabelFilter(filter)}
              />
            )
          })}
          {cleanButtonFilter(cleanAllTextFilter)}
        </Grid>
      }
    </Grid>
  )
}

FilterTable.propTypes = {
  filtersBtn: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  filterInput: PropTypes.shape({
    placeholder: PropTypes.string,
    width: PropTypes.number,
    label: PropTypes.string.isRequired,
  }).isRequired,
  contentChildrenFilter: PropTypes.func,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string
    })
  ).isRequired,
  itemAdded: PropTypes.shape({
    label: PropTypes.string.isRequired,
    isDate: PropTypes.bool,
    isRange: PropTypes.bool,
    isCheckbox: PropTypes.bool,
    isSet: PropTypes.bool,
    startDate: PropTypes.string, // DD/MM/YYYY
    endDate: PropTypes.string, // DD/MM/YYYY
    minNumber: PropTypes.string,
    maxNumber: PropTypes.string,
    minMaxNumber: PropTypes.string,
  }),
  cleanItem: PropTypes.func,
  cleanAllItems: PropTypes.func,
  contentToRef: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
  updateFilteredItems: PropTypes.func.isRequired,
  mapItemsFilter: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
}

export default FilterTable