import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Accordion, AccordionDetails, AccordionSummary, Avatar, CircularProgress, FormControlLabel, Grid, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import TabPanel from "../../../../../Common/TabPanel"
import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/AccountsTabPanels"
import stringsUtils from "../../../../../../utils/StringUtils"
import Active from "../../../../../../img/AdvancedMapIcons/Active.svg?react"
import Inactive from "../../../../../../img/AdvancedMapIcons/Inactive.svg?react"
import Alert from "../../../../../../img/AdvancedMapIcons/Alert.svg?react"
import toolsUtils from "../../../../../../utils/ToolsUtils"


function AccountsTabPanels(props) {
  const { classes, cx } = useStyles()

  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const checkAccountName = (user) => {
    if (user.name && user.surname) {
      return stringsUtils.toCapitalize(`${user.name} ${user.surname}`)
    } else if (user.name && !user.surname) {
      return stringsUtils.toCapitalize(user.name)
    } else {
      return user.email
    }
  }

  const formatTimeToShow = (diffDays) => {
    const dateDays = +diffDays

    if (Math.floor(dateDays) > 0) {
      return Math.floor(dateDays) === 1 ? "1 dia" : Math.floor(dateDays) + " dias"
    } else {
      return (dateDays * 10) === 1 ? "1 hora" : dateDays * 10 + " horas"
    }
  }

  return (
    <>
      <TabPanel className={classes.rootMui} value={value} index={0}>
        <Grid className={classes.root}>
          {props.inactiveUsers.length > 0 &&
            <Accordion defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
                className={classes.titleStatusSubSumary}
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Inactive />}
                  className={classes.titleCardDrawerSubs}
                  label={`INATIVOS (${props.inactiveUsers.length}) - SEM ACESSO HÁ MAIS DE 30 DIAS`}
                />
              </AccordionSummary>
              <AccordionDetails>
                {
                  props.inactiveUsers.length > 0
                    ? props.inactiveUsers.map((user, i) => (
                      <Grid key={i} className={classes.containerUserSubsImg}>
                        <Grid className={classes.subTitleManagAnnot}>
                          {user.picture
                            ? <Avatar className={classes.userPicture} src={user.picture} alt={`${user.name} ${user.surname}`} />
                            : <Avatar className={cx(classes.userPicture, classes.defaultAvatar)}>{toolsUtils.getAvatar(user)}</Avatar>
                          }
                          <Typography className={classes.userNameSubs}>{checkAccountName(user)}</Typography>
                        </Grid>
                        <Typography className={classes.userRole}>
                          {formatTimeToShow(user.diffDays)}
                        </Typography>
                      </Grid>
                    ))
                    : <Grid className={classes.loadRoot}>
                      <CircularProgress />
                    </Grid>
                }
              </AccordionDetails>
            </Accordion>
          }
          {props.absentUsers.length > 0 &&
            <Accordion defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
                className={classes.titleStatusSubSumary}
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Alert />}
                  className={classes.titleCardDrawerSubs}
                  label={`AUSENTES (${props.absentUsers.length}) - SEM ACESSO ENTRE 10 E 30 DIAS`}
                />
              </AccordionSummary>
              <AccordionDetails>
                {props.absentUsers.length > 0
                  ? props.absentUsers.map((user, i) => (
                    <Grid key={i} className={classes.containerUserSubsImg}>
                      <Grid className={classes.subTitleManagAnnot}>
                        {user.picture
                          ? <Avatar className={classes.userPicture} src={user.picture} alt={`${user.name} ${user.surname}`} />
                          : <Avatar className={cx(classes.userPicture, classes.defaultAvatar)}>{toolsUtils.getAvatar(user)}</Avatar>
                        }
                        <Typography className={classes.userNameSubs}>{checkAccountName(user)}</Typography>
                      </Grid>
                      <Typography className={classes.userRole}>
                        {formatTimeToShow(user.diffDays)}
                      </Typography>
                    </Grid>
                  ))
                  : <Grid className={classes.loadRoot}>
                    <CircularProgress />
                  </Grid>
                }
              </AccordionDetails>
            </Accordion>
          }
          {props.activeUsers.length > 0 &&
            <Accordion defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
                className={classes.titleStatusSubSumary}
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Active />}
                  className={classes.titleCardDrawerSubs}
                  label={`ATIVAS (${props.activeUsers.length}) – ACESSO NOS ULTIMOS 10 DIAS`}
                />
              </AccordionSummary>
              <AccordionDetails>
                {
                  props.activeUsers.length > 0
                    ? props.activeUsers.map((user, i) => (
                      <Grid key={i} className={classes.containerUserSubsImg}>
                        <Grid className={classes.subTitleManagAnnot}>
                          {user.picture
                            ? <Avatar className={classes.userPicture} src={user.picture} alt={`${user.name} ${user.surname}`} />
                            : <Avatar className={cx(classes.userPicture, classes.defaultAvatar)}>{toolsUtils.getAvatar(user)}</Avatar>
                          }
                          <Typography className={classes.userNameSubs}>{checkAccountName(user)}</Typography>
                        </Grid>
                        <Typography className={classes.userRole}>
                          {formatTimeToShow(user.diffDays)}
                        </Typography>
                      </Grid>
                    ))
                    : <Grid className={classes.loadRoot}>
                      <CircularProgress />
                    </Grid>
                }
              </AccordionDetails>
            </Accordion>
          }
        </Grid>
      </TabPanel>
      <TabPanel className={classes.rootMui} value={value} index={1}>
        <Grid className={classes.root}>
          {props.inactiveSortUsers.length > 0 &&
            <Accordion defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
                className={classes.titleStatusSubSumary}
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Inactive />}
                  className={classes.titleCardDrawerSubs}
                  label={`INATIVOS (${props.inactiveSortUsers.length}) - SEM ACESSO HÁ MAIS DE 30 DIAS`}
                />
              </AccordionSummary>
              <AccordionDetails>
                {
                  props.inactiveSortUsers.length > 0
                    ? props.inactiveSortUsers.map((user, i) => (
                      <Grid key={i} className={classes.containerUserSubsImg}>
                        <Grid className={classes.subTitleManagAnnot}>
                          {user.picture
                            ? <Avatar className={classes.userPicture} src={user.picture} alt={`${user.name} ${user.surname}`} />
                            : <Avatar className={cx(classes.userPicture, classes.defaultAvatar)}>{toolsUtils.getAvatar(user)}</Avatar>
                          }
                          <Typography className={classes.userNameSubs}>{checkAccountName(user)}</Typography>
                        </Grid>
                        <Typography className={classes.userRole}>
                          {formatTimeToShow(user.diffDays)}
                        </Typography>
                      </Grid>
                    ))
                    : <Grid className={classes.loadRoot}>
                      <CircularProgress />
                    </Grid>
                }
              </AccordionDetails>
            </Accordion>
          }
          {props.absentSortUsers.length > 0 &&
            <Accordion defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
                className={classes.titleStatusSubSumary}
              >
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Alert />}
                  className={classes.titleCardDrawerSubs}
                  label={`AUSENTES (${props.absentSortUsers.length}) - SEM ACESSO ENTRE 10 E 30 DIAS`}
                />
              </AccordionSummary>
              <AccordionDetails>
                {props.absentSortUsers.length > 0
                  ? props.absentSortUsers.map((user, i) => (
                    <Grid key={i} className={classes.containerUserSubsImg}>
                      <Grid className={classes.subTitleManagAnnot}>
                        {user.picture
                          ? <Avatar className={classes.userPicture} src={user.picture} alt={`${user.name} ${user.surname}`} />
                          : <Avatar className={cx(classes.userPicture, classes.defaultAvatar)}>{toolsUtils.getAvatar(user)}</Avatar>
                        }
                        <Typography className={classes.userNameSubs}>{checkAccountName(user)}</Typography>
                      </Grid>
                      <Typography className={classes.userRole}>
                        {formatTimeToShow(user.diffDays)}
                      </Typography>
                    </Grid>
                  ))
                  : <Grid className={classes.loadRoot}>
                    <CircularProgress />
                  </Grid>
                }
              </AccordionDetails>
            </Accordion>
          }
          {props.activeSortUsers.length > 0 &&
            <Accordion defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
                className={classes.titleStatusSubSumary}
              >

                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Active />}
                  className={classes.titleCardDrawerSubs}
                  label={`ATIVAS (${props.activeSortUsers.length}) - ACESSO NOS ULTIMOS 10 DIAS`}
                />
              </AccordionSummary>
              <AccordionDetails>
                {
                  props.activeSortUsers.length > 0
                    ? props.activeSortUsers.map((user, i) => (
                      <Grid key={i} className={classes.containerUserSubsImg}>
                        <Grid className={classes.subTitleManagAnnot}>
                          {user.picture
                            ? <Avatar className={classes.userPicture} src={user.picture} alt={`${user.name} ${user.surname}`} />
                            : <Avatar className={cx(classes.userPicture, classes.defaultAvatar)}>{toolsUtils.getAvatar(user)}</Avatar>
                          }
                          <Typography className={classes.userNameSubs}>{checkAccountName(user)}</Typography>
                        </Grid>
                        <Typography className={classes.userRole}>
                          {formatTimeToShow(user.diffDays)}
                        </Typography>
                      </Grid>
                    ))
                    : <Grid className={classes.loadRoot}>
                      <CircularProgress />
                    </Grid>
                }
              </AccordionDetails>
            </Accordion>
          }
        </Grid>
      </TabPanel>
    </>
  )
}

AccountsTabPanels.propTypes = {
  value: PropTypes.number,
  activeUsers: PropTypes.array,
  inactiveUsers: PropTypes.array,
  absentUsers: PropTypes.array,
  activeSortUsers: PropTypes.array,
  inactiveSortUsers: PropTypes.array,
  absentSortUsers: PropTypes.array
}

export default AccountsTabPanels