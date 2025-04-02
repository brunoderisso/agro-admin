import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Grid } from "@mui/material"

import TabPanel from "../../../../Common/TabPanel"
import CardDrawer from "./CommonComponents/CardDrawer"
// import Subscription from '../../../../../img/AdvancedMapIcons/Subscription.svg?react'
import Properties from '../../../../../img/AdvancedMapIcons/Properties.svg?react'
// import Agriculture from '../../../../../img/AdvancedMapIcons/Agriculture.svg?react'
import Collectors from '../../../../../img/AdvancedMapIcons/Collectors.svg?react'
import Accounts from '../../../../../img/AdvancedMapIcons/Accounts.svg?react'
import useStyles from '../../../../../styles/AdvancedMapPage/GoogleMaps/ManagementTabPanels'


// Mock
const titles = [
  {
    title: 'Prospecção',
    value: 44,
    color: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="#D2D2D2" />
    </svg>
  },
  {
    title: 'Negociação',
    value: 99,
    color: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="#65C728" />
    </svg>
  },
  {
    title: 'Pós-venda',
    value: 27,
    color: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="#9747FF" />
    </svg>
  },
  {
    title: 'Perdida',
    value: 48,
    color: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="#811211" />
    </svg>
  },
  {
    title: 'Qualificação',
    value: 34,
    color: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="#FFB900" />
    </svg>
  },
  {
    title: 'Cliente',
    value: 101,
    color: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="#006FE6" />
    </svg>
  },
  {
    title: 'Com problema',
    value: 43,
    color: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="#BA1A1A" />
    </svg>
  },
  {
    title: 'Não qualificadas',
    value: 68,
    color: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="#F2F0F4" />
    </svg>
  },
]

function ManagementTabPanels(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const reduceValue = (valueReducer) => {
    const result = valueReducer.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
    return result
  }

  const getDiffDays = (lastLogin) => {
    const now = new Date()
    const lastLoginAt = new Date(lastLogin)

    return (now.getTime() - lastLoginAt.getTime()) / (1000 * 60 * 60 * 24)
  }

  return (
    <>
      <TabPanel value={value} index={0}>
        <Grid onClick={() => props.handleState("subscriptions")}>
          {/* <CardDrawer
            icons={<Subscription />}
            title={"Assinaturas"}
            total={389}
            active={80}
            alert={110}
            inactive={20}
            labelOne={"assinaturas ativas"}
            labelTwo={"pagamentos em atraso"}
            labelThree={"assinaturas suspensas"}
          /> */}
        </Grid>
        <Grid>
          <Grid onClick={() => props.handleState("properties")}>
            <CardDrawer
              // onClick={() => props.handleState("properties")}
              icons={<Properties />}
              title={"Propriedades"}
              total={props.outputMarkets.reduce((acc, current) => acc + (current.environments
                ? current.environments.length
                : 0
              ), 0)}
              active={props.outputMarkets.reduce((acc, current) => acc + (current.environments
                ? current.environments.filter(environment => environment.area && environment.area <= 50000).length
                : 0
              ), 0)}
              alert={props.outputMarkets.reduce((acc, current) => acc + (current.environments
                ? current.environments.filter(environment => environment.area && environment.area > 50000 && environment.area <= 100000).length
                : 0
              ), 0)}
              inactive={props.outputMarkets.reduce((acc, current) => acc + (current.environments
                ? current.environments.filter(environment => environment.area && environment.area > 100000).length
                : 0
              ), 0)}
              undefined={props.outputMarkets.reduce((acc, current) => acc + (current.environments
                ? current.environments.filter(environment => !environment.area).length
                : 0
              ), 0)}
              labelOne={"1-50 ha."}
              labelTwo={"51-100 ha."}
              labelThree={"101-150 ha."}
              labelFour={"indefinido"}
              colorDark={true}
            // activeTab
            />
          </Grid>
        </Grid>
        <Grid onClick={() => props.handleState("implements")}>
          {/* <CardDrawer
            icons={<Agriculture />}
            title={"Implementos"}
            total={389}
            active={80}
            alert={110}
            inactive={20}
            labelOne={"ativos"}
            labelTwo={"em alerta"}
            labelThree={"inativos"}
          /> */}
        </Grid>
        <Grid onClick={() => props.handleState("collectors")}>
          <CardDrawer
            icons={<Collectors />}
            title={"Coletores"}
            total={props.outputMarkets.reduce((acc, current) => acc + (current.devices
              ? current.devices.length
              : 0
            ), 0)}
            active={props.outputMarkets.reduce((acc, current) => acc + (current.devices
              ? current.devices.filter(device => device.status === "OK").length
              : 0
            ), 0)}
            alert={props.outputMarkets.reduce((acc, current) => acc + (current.devices
              ? current.devices.filter(device => ["WARNING", "CRITICAL"].includes(device.status)).length
              : 0
            ), 0)}
            inactive={props.outputMarkets.reduce((acc, current) => acc + (current.devices
              ? current.devices.filter(device => device.status === "UNKNOW" || device.status === null).length
              : 0
            ), 0)}
            labelOne={"ativos"}
            labelTwo={"em alerta"}
            labelThree={"inativos"}
          />
        </Grid>
        <Grid onClick={() => props.handleState("accountsPanel")}>
          <CardDrawer
            icons={<Accounts />}
            title={"Contas"}
            total={props.outputMarkets.reduce((acc, current) => acc + (current.users ? current.users.length : 0), 0)}
            active={props.outputMarkets.reduce((acc, current) => acc + (current.users
              ? current.users.filter(user => {
                const diffDays = getDiffDays(user.lastloginat)

                return diffDays <= 10
              }).length
              : 0
            ), 0)}
            alert={props.outputMarkets.reduce((acc, current) => acc + (current.users
              ? current.users.filter(user => {
                const diffDays = getDiffDays(user.lastloginat)

                return diffDays > 10 && diffDays <= 30
              }).length
              : 0
            ), 0)}
            inactive={props.outputMarkets.reduce((acc, current) => acc + (current.users
              ? current.users.filter(user => {
                const diffDays = getDiffDays(user.lastloginat)

                return diffDays > 30
              }).length
              : 0
            ), 0)}
            labelOne={"ativas"}
            labelTwo={"ausentes"}
            labelThree={"inativas"}
          />
        </Grid>
      </TabPanel>
      <TabPanel className={classes.prospectStyle} value={value} index={1}>
        {titles.map((title, index) => (
          <Grid className={classes.prospectBox} key={index}>
            <Grid>
              <span style={{ padding: "4px" }}>{title.color}</span>
              {title.title}
            </Grid>
            <span className={classes.prospectValue}>{title.value}</span>
          </Grid>
        ))}
        <Grid className={classes.totalValue}>
          <p>total:</p><p id='totalReduce'>{reduceValue(titles)}</p>
        </Grid>
      </TabPanel>
    </>
  )
}

ManagementTabPanels.propTypes = {
  handleState: PropTypes.func,
  value: PropTypes.number,
  outputMarkets: PropTypes.array
}

export default ManagementTabPanels