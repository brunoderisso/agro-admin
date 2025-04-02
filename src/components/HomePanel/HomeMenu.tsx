import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Box, Tab, Tabs, Typography } from "@mui/material"

import useStyles from "../../styles/HomePanel/HomeMenu"


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function HomeMenu(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)

  const { t } = useTranslation()

  useEffect(() => {
    if (props.page) {
      setValue(props.page)
    }
  }, [props.page])

  const tabLabel = (index) => {
    switch (index) {
      case 0:
        return <Typography variant="h6">{t("homePanel.tab1")}</Typography>
      case 1:
        return <Typography variant="h6">{t("homePanel.tab2")}</Typography>
      case 2:
        return <Typography variant="h6">{t("homePanel.tab3")}</Typography>
      case 3:
        return <Typography variant="h6">{t("homePanel.tab4")}</Typography>
      default:
        break
    }
  }

  const handleChange = (_, newValue) => {
    props.onChange(newValue)
    setValue(newValue)
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", margin: "24px 0px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="main tabs"
        classes={{ indicator: classes.indicatorSelectedTab }}
      >
        <Tab
          label={tabLabel(0)}
          className={classes.tabLabel}
          classes={{ selected: classes.selectedTab }}
          {...a11yProps(0)}
        />
        <Tab
          label={tabLabel(1)}
          sx={{ margin: "0px 20px 0 40px" }}
          className={classes.tabLabel}
          classes={{ selected: classes.selectedTab }}
          {...a11yProps(1)}
          />
        <Tab
          label={tabLabel(2)}
          sx={{ margin: "0px 40px 0 20px" }}
          className={classes.tabLabel}
          classes={{ selected: classes.selectedTab }}
          {...a11yProps(2)}
        />
        <Tab
          label={tabLabel(3)}
          className={classes.tabLabel}
          classes={{ selected: classes.selectedTab }}
          {...a11yProps(3)}
        />
      </Tabs>
    </Box>
  )
}

HomeMenu.propTypes = {
  onChange: PropTypes.func,
  page: PropTypes.number
}

export default HomeMenu