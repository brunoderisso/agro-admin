import { useEffect, useMemo, useState } from "react"

import CloseIcon from "@mui/icons-material/Close"

import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  Typography
} from "@mui/material"

import Polygon from "../../../../../img/AdvancedMapIcons/Polygon.svg?react"
import Info from "../../../../../img/AdvancedMapIcons/Info.svg?react"
import Gateways from "../../../../../img/AdvancedMapIcons/Gateways.svg?react"
import GoogleMapStore from "../../../../../stores/GoogleMapStore"
import useStyles from "../../../../../styles/AdvancedMapPage/GoogleMaps/ManagementPanel"
import CardDrawer from "./CommonComponents/CardDrawer"
import CustomCheckBox from "../../../../Common/Themed/ThemedCheckBox"
import SearchInputFilter from "../../../../Common/SearchInputFilter"
import ManagementMenu from "./ManagementMenu"
import ManagementTabPanels from "./ManagementTabPanels"
import theme from "../../../../../styles/Utils/Theme"
import CustomLabel from "../../../../Common/CustomLabel"
import GMapStore from "../../../../../stores/GoogleMapStore"


const ManagementPanel = ({
  handleStateDrawer,
  setOpenDrawer,
  setAllSelectBox,
  setShowLocationsBox,
  allSelectBox,
  showLocationsBox,
  outputMarkets,
  marketSelectList,
  setMarketSelectList,
}) => {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)
  const [clearClick, setClearClick] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("")
  const [selectedOption, setSelectedOption] = useState({})

  const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

  const displayedOptions = useMemo(
    () => {
      if (marketSelectList.error) {
        return ""
      }

      return GMapStore.getTotalMarkets().filter(market => containsText(market.name, searchText))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchText, marketSelectList]
  )

  useEffect(() => {
    GoogleMapStore.emit("MapType_change", showLocationsBox)
  }, [showLocationsBox])

  const handleCheckAllBox = () => {
    setAllSelectBox(!allSelectBox)
  }

  const handleCheckLocationsBox = () => {
    setShowLocationsBox(!showLocationsBox)
  }

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const cleanLabelFilter = (market) => {
    if (market === "clearAll") {
      setMarketSelectList([])
      setClearClick(!clearClick)
      GoogleMapStore.emit("checkboxesPanel_clear")
    } else {
      const matchingMarket = marketSelectList.find(
        object => object.name.replace(/\s+/g, "-").toLowerCase() === market.name.replace(/\s+/g, "-").toLowerCase()
      )

      if (matchingMarket) {
        setMarketSelectList((prevList) =>
          prevList.filter(prev => prev.objectid !== matchingMarket.objectid)
        )
      }
    }
  }

  return (
    <>
      <List className={classes.containerFlexPages}>
        <Grid item style={{ textAlign: "right" }}>
          <IconButton size="small" role="presentation" onClick={() => setOpenDrawer(false)}>
            <CloseIcon style={{ color: theme.colors.onPrimaryContainer }} fontSize="small" />
          </IconButton>
        </Grid>
        <Typography className={classes.titleDrawer} variant="h5">Painel de gestão</Typography>
      </List>

      <List>
        <Grid className={classes.containerFilterCheckBoxFlex}>
          <Grid className={classes.titleBoxAllLocations}>
            <FormControlLabel
              className={classes.containerFilterCheckBox}
              control={<CustomCheckBox
                value={allSelectBox}
                onChange={handleCheckAllBox}
                className={classes.containerFilterCheckBox}
                defaultChecked
              />}
              label="Mostrar tudo"
            />
            <Info />
          </Grid>

          <FormControlLabel
            className={classes.containerFilterCheckBox}
            control={
              <CustomCheckBox
                value={showLocationsBox}
                onChange={handleCheckLocationsBox}
                checked={showLocationsBox}
              />
            }
            label="Mostrar localidades"
          />
        </Grid>

        <Grid className={classes.containerFilterMarket}>
          <Polygon />
          <Typography className={classes.titleMarket}>MERCADO</Typography>
        </Grid>

        <Grid className={classes.containerFilter}>
          {marketSelectList.length > 0 && marketSelectList.map((market, index) => (
            <CustomLabel
              key={index}
              mainText={market.name}
              cleanFunc={() => cleanLabelFilter(market)}
            />
          ))}
          <Button
            className={classes.areaButton}
            onClick={() => cleanLabelFilter("clearAll")}
          >LIMPAR</Button>
        </Grid>

        <Grid className={classes.containerForm}>
          <SearchInputFilter
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            displayedOptions={displayedOptions}
            setSearchText={setSearchText}
            placeholder={"Busque pelo nome da área"}
            marketSelectList={marketSelectList}
            setMarketSelectList={setMarketSelectList}
          />
        </Grid>
        <Grid onClick={() => handleStateDrawer("gateways")}>
          <CardDrawer
            icons={<Gateways />}
            title={"Gateways"}
            total={outputMarkets.reduce((acc, current) => acc + (current.gateways ? current.gateways.length : 0), 0)}
            active={outputMarkets.reduce((acc, current) => acc + (current.gateways
              ? current.gateways.filter(gateway => gateway.status === "OK").length
              : 0
            ), 0)}
            alert={outputMarkets.reduce((acc, current) => acc + (current.gateways
              ? current.gateways.filter(gateway => ["WARNING", "CRITICAL"].includes(gateway.status)).length
              : 0
            ), 0)}
            inactive={outputMarkets.reduce((acc, current) => acc + (current.gateways
              ? current.gateways.filter(gateway => gateway.status === "UNKNOW").length
              : 0
            ), 0)}
            labelOne={"ativos"}
            labelTwo={"em alerta"}
            labelThree={"inativos"}
          />
        </Grid>
        <Grid className={classes.tabPanel}>
          <Box sx={{ width: "100%" }}>
            <ManagementMenu value={value} onChange={handleChange} />
            <ManagementTabPanels value={value} handleState={handleStateDrawer} outputMarkets={outputMarkets} />
          </Box>
        </Grid>
      </List>
    </>
  )
}

export default ManagementPanel
