import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { Grid, Tab, Tabs, Typography } from "@mui/material"

import useStyles from "../../styles/Customer/CustomerMenu"


function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

function CustomerMenu(props) {
  const { t } = useTranslation()
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    setValue(props.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const handleChange = (_, newValue) => {
    if (typeof props.handleChange === "function") {
      props.handleChange(newValue)
    }
    setValue(newValue)
  }

  return (
    <Grid className={classes.menuContainer}>
      <Grid className={classes.leftMenu}>
        <Typography variant="overline" className={classes.label}>
          {t("homePanel.customers.menuTitle")}
        </Typography>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          classes={{ indicator: classes.indicatorSelectedTab }}
        >
          <Tab className={classes.tabMenu} label={t("homePanel.customers.customerEdit.customerData.tabTitle")} {...a11yProps(0)} />
          <Tab className={classes.tabMenu} label={t("homePanel.customers.customerEdit.customerSubscriptions.tabTitle")} {...a11yProps(1)} />
          <Tab className={classes.tabMenu} label="Propriedades Cadastradas" {...a11yProps(2)} />
          <Tab className={classes.tabMenu} label="Meios de Pagamento" {...a11yProps(3)} />
          <Tab className={classes.tabMenu} label="Histórico de Cobranças" {...a11yProps(4)} />
          <Tab className={classes.tabMenu} label="Cupons Utilizados" {...a11yProps(5)} />
        </Tabs>
      </Grid>
    </Grid>
  )
}

export default CustomerMenu