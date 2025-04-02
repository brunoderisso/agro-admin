import { useEffect, useState } from "react"

import {
  Box,
  Grid,
  IconButton,
  List,
  Typography
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/PropertiesDetailsPanel"
import AdministrativeStore from "../../../../../../stores/AdministrativeStore"
import TabPanel from "../../../../../Common/TabPanel"
import PropertiesDetailsMenu from "./PropertiesDetailsMenu"
import CircleBlue from "../../../../../../img/AdvancedMapIcons/CircleBlue.svg?react"
import StarImg from "../../../../../../img/AdvancedMapIcons/StarImg.svg?react"
import Checked from "../../../../../../img/AdvancedMapIcons/Checked.svg?react"
import Chiper from "../../../../../../img/AdvancedMapIcons/Chiper.svg?react"
import Alert from "../../../../../../img/AdvancedMapIcons/Alert.svg?react"
import Inactive from "../../../../../../img/AdvancedMapIcons/Inactive.svg?react"
import ArrowDetail from "../../../../../../img/AdvancedMapIcons/ArrowDetail.svg?react"
import PropertiesDetailsTabPanels from "./PropertiesDetailsTabPanels"
import theme from "../../../../../../styles/Utils/Theme"


const PropertiesDetailsPanel = ({ handleStateDrawer, environment }) => {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)
  const [users, setUsers] = useState([])

  /* ========= TABS ========= */

  const handleChange = (newValue: number) => {
    setValue(newValue)
  }

  /* ========= GET USERS ========= */

  useEffect(() => {
    getEnvironmentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getEnvironmentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [environment])

  const responseGetEnvironmentUsers = (value) => {
    setUsers([])
    setUsers(value)
  }

  const getEnvironmentUser = () => {
    let env = AdministrativeStore.getEnvironment()

    AdministrativeStore.getEnvironmentUsers(env || "", responseGetEnvironmentUsers)
  }

  return (
    <>
      <List className={classes.containerFlexPages}>
        <Typography className={classes.titleDrawer} variant="h5">{environment?.name}</Typography>
        <Grid item xs={2} style={{ textAlign: "left", width: "10%", maxWidth: "38px" }}>
          <IconButton size="small" onClick={() => handleStateDrawer("properties")}>
            <CloseIcon style={{ color: theme.colors.onPrimaryContainer }} fontSize="small" />
          </IconButton>
        </Grid>
      </List>
      <List>
        <Grid className={classes.subTitleManag}>
          <Grid>{<CircleBlue />}<span style={{ color: theme.colors.onPrimaryContainer, marginRight: "4px" }}> Negociação</span></Grid>
          <Grid>{<StarImg />}<span style={{ color: theme.colors.onPrimaryContainer, marginRight: "4px" }}>Produtor influente</span></Grid>
        </Grid>
        <TabPanel value={value} index={0}>
          <Grid className={classes.subTitleManagDev}>
            <Typography><span style={{ marginLeft: "2px" }}>{<Chiper />}</span> Soja | Rastreabilidade</Typography>
            <Typography>{<Checked />} Todos dispositivos estão ativos</Typography>
            <Typography>{<Checked />} Todas contas estão ativas</Typography>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid className={classes.subTitleManagDev}>
            <Typography className={classes.subTitleManagAnnot}>{<Inactive />} 44.444 dispositivos inativos {<ArrowDetail />}</Typography>
            <Typography className={classes.subTitleManagAnnot}>{<Alert />} Pagamento em atraso {<ArrowDetail />}</Typography>
            <Typography className={classes.subTitleManagAnnot}>{<Alert />} 10.000 pessoas sem acesso {<ArrowDetail />}</Typography>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* TODO: Remover tabpanel se não houver utilidade */}
        </TabPanel>
        <Grid>
          <Box sx={{ width: "100%" }}>
            <PropertiesDetailsMenu value={value} onChange={handleChange} />
            <PropertiesDetailsTabPanels value={value} users={users} />
          </Box>
        </Grid>
      </List>
    </>
  )
}

export default PropertiesDetailsPanel
