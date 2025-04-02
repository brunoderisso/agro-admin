import { useEffect, useMemo, useState } from "react"

import {
  AppBar,
  Grid,
  IconButton,
  List,
  Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/SubscriptionsPanel"
import AdministrativeStore from "../../../../../../stores/AdministrativeStore"
import CurrencyExchange from "../../../../../../img/AdvancedMapIcons/CurrencyExchange.svg?react"
import InputSearch from "../../../../../Common/InputSearch"
import theme from "../../../../../../styles/Utils/Theme"
import SubscriptionsMenu from "./SubscriptionsMenu"
import SubscriptionsTabPanels from "./SubscriptionsTabPanels"


const SubscriptionsPanel = ({ handleStateDrawer }) => {
  const { classes } = useStyles()

  const [tabValue, setTabValue] = useState<number>(0)
  const [users, setUsers] = useState([])
  const [activeUsers, setActiveUsers] = useState([])
  const [suspendedUsers, setSuspendedUsers] = useState([])
  const [overdueUsers, setOverdueUsers] = useState([])
  const [usersByCrop, setUsersByCrop] = useState({})
  const [searchText, setSearchText] = useState<string>("")

  const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

  const displayedOptions = useMemo(
    () => users.filter((c) =>
      Object.values(c).some(value =>
        typeof value === 'string' && containsText(value, searchText)
      )
    ),
    [searchText, users]
  )

  /* ========= GET USERS ========= */
  useEffect(() => {
    getEnvironmentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getEnvironmentUser()

    // Filtrando usuários por status
    const activeUsersFiltered = usersStatusFilter(displayedOptions, 'Active')
    const suspendedUsersFiltered = usersStatusFilter(displayedOptions, 'Suspended')
    const overdueUsersFiltered = usersStatusFilter(displayedOptions, 'Overdue')

    // Atualizando as variáveis de estado com os usuários filtrados
    setActiveUsers(activeUsersFiltered)
    setSuspendedUsers(suspendedUsersFiltered)
    setOverdueUsers(overdueUsersFiltered)
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const separateUsers = separateUsersByCropAndStatus(displayedOptions)
    setUsersByCrop(separateUsers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, displayedOptions])

  const responseGetEnvironmentUsers = (value) => {
    setUsers([])
    setUsers(value)
  }

  const getEnvironmentUser = () => {
    let env = AdministrativeStore.getEnvironment()

    AdministrativeStore.getEnvironmentUsers(env || "", responseGetEnvironmentUsers)
  }

  const handleChange = (newValue) => {
    setTabValue(newValue)
  }

  function usersStatusFilter(usuarios, status) {
    return usuarios.filter(usuario => usuario.status === status)
  }

  function separateUsersByCropAndStatus(users) {
    const usersByCrop = {}

    users.forEach(user => {
      if (!usersByCrop[user.crop]) {
        usersByCrop[user.crop] = {}
      }

      if (!usersByCrop[user.crop][user.status]) {
        usersByCrop[user.crop][user.status] = []
      }

      usersByCrop[user.crop][user.status].push(user)
    })

    return usersByCrop
  }

  return (
    <>
      <List className={classes.containerFlexPages}>
        <Grid item xs={12} style={{ textAlign: "right", width: "100%" }}>
          <IconButton size="small" onClick={() => handleStateDrawer("defaultPanel")}>
            <CloseIcon style={{ color: theme.colors.onPrimaryContainer }} fontSize="small" />
          </IconButton>
        </Grid>
        <Typography className={classes.titleDrawer} variant="h5">Assinaturas</Typography>
      </List>
      <InputSearch
        setSearchText={setSearchText}
        placeholder={"Busque pelo nome do plano"}
      />
      <List>
        <Grid className={classes.muiBoxHeader}>
          <AppBar id="appBarId" position="static" color="default">
            <Typography className={classes.category}>Agrupar por:</Typography>
            <SubscriptionsMenu value={tabValue} onChange={handleChange} />
          </AppBar>
          <CurrencyExchange display="none" />
          <SubscriptionsTabPanels
            value={tabValue}
            activeUsers={activeUsers}
            overdueUsers={overdueUsers}
            suspendedUsers={suspendedUsers}
            users={users}
            usersByCrop={usersByCrop}
          />
        </Grid>
      </List>
    </>
  )
}

export default SubscriptionsPanel
