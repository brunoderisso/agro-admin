import { useEffect, useMemo, useState } from 'react'

import {
  Grid,
  IconButton,
  List,
  Typography
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import useStyles from '../../../../../../styles/AdvancedMapPage/GoogleMaps/AccountsPanel'
import InputSearch from '../../../../../Common/InputSearch'
import AccountsMenu from './AccountsMenu'
import AccountsTabPanels from './AccountsTabPanels'
import theme from '../../../../../../styles/Utils/Theme'
import { MarketObjectType } from '../../../../../../interfaces/AdvancedMapPage/GoogleMaps'


const AccountsPanel = ({ handleStateDrawer, outputMarkets }) => {
  const { classes } = useStyles()

  const [tabValue, setTabValue] = useState<number>(0)
  const [markets, setMarkets] = useState<MarketObjectType[]>([])
  const [activeUsers, setActiveUsers] = useState([])
  const [absentUsers, setAbsentUsers] = useState([])
  const [inactiveUsers, setInactiveUsers] = useState([])
  const [activeSortUsers, setActiveSortUsers] = useState([])
  const [absentSortUsers, setAbsentSortUsers] = useState([])
  const [inactiveSortUsers, setInactiveSortUsers] = useState([])

  const [searchText, setSearchText] = useState<string>("")

  const containsText = (text: string, searchText: string) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

  const displayedOptions = useMemo(
    () => markets.filter((c) =>
      Object.values(c).some(value =>
        typeof value === 'string' && containsText(value, searchText)
      )
    ),
    [searchText, markets]
  )

  useEffect(() => {
    setMarkets(outputMarkets)
  }, [outputMarkets])

  useEffect(() => {
    if (displayedOptions.length > 0) {
      separateUsers()
    }
  }, [markets, displayedOptions])

  const handleChange = (newValue) => {
    setTabValue(newValue)
  }

  const sortSerial = (usersValue) => {
    return usersValue.slice().sort((a, b) => {
      const nameA = a.name?.toUpperCase() || ""
      const nameB = b.name?.toUpperCase() || ""

      return nameA.localeCompare(nameB)
    })
  }

  const separateUsers = () => {
    const now = new Date()

    const active = []
    const suspended = []
    const overdue = []

    displayedOptions.forEach(market => {
      market.users.forEach(user => {
        const lastLoginAt = new Date(user.lastloginat)
        const diffDays = (now.getTime() - lastLoginAt.getTime()) / (1000 * 60 * 60 * 24)

        user.diffDays = diffDays.toFixed(1)

        if (diffDays <= 10) {
          active.push(user)
        } else if (diffDays <= 30) {
          suspended.push(user)
        } else {
          overdue.push(user)
        }
      })
    })

    setActiveUsers(active)
    setAbsentUsers(suspended)
    setInactiveUsers(overdue)

    const sortActiveUsers = sortSerial(active)
    const sortAbsentUsers = sortSerial(suspended)
    const sortInactiveUsers = sortSerial(overdue)

    setActiveSortUsers(sortActiveUsers)
    setAbsentSortUsers(sortAbsentUsers)
    setInactiveSortUsers(sortInactiveUsers)
  }

  return (
    <>
      <List className={classes.containerFlexPages}>
        <Grid item xs={12} style={{ textAlign: "right", width: "100%" }}>
          <IconButton size="small" onClick={() => handleStateDrawer("defaultPanel")}>
            <CloseIcon style={{ color: theme.colors.onPrimaryContainer }} fontSize="small" />
          </IconButton>
        </Grid>
        <Typography className={classes.titleDrawer} variant='h5'>Contas</Typography>
      </List>
      <InputSearch
        setSearchText={setSearchText}
        placeholder={"Busque por nome ou e-mail"}
      />
      <List>
        <Grid bgcolor={theme.colors.background}>
          <Grid className={classes.muiBoxHeader}>
            <AccountsMenu value={tabValue} onChange={handleChange} />
            <AccountsTabPanels
              value={tabValue}
              absentSortUsers={absentSortUsers}
              activeSortUsers={activeSortUsers}
              inactiveUsers={inactiveUsers}
              absentUsers={absentUsers}
              activeUsers={activeUsers}
              inactiveSortUsers={inactiveSortUsers}
            />
          </Grid>
        </Grid>
      </List>
    </>
  )
}

export default AccountsPanel
