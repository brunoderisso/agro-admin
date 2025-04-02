import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Typography
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import TabPanel from "../../../../../Common/TabPanel"
import CurrencyExchange from "../../../../../../img/AdvancedMapIcons/CurrencyExchange.svg?react"
import Active from "../../../../../../img/AdvancedMapIcons/Active.svg?react"
import Inactive from "../../../../../../img/AdvancedMapIcons/Inactive.svg?react"
import Alert from "../../../../../../img/AdvancedMapIcons/Alert.svg?react"
import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/SubscriptionsTabPanels"
import theme from "../../../../../../styles/Utils/Theme"
import toolsUtils from "../../../../../../utils/ToolsUtils"


function SubscriptionsTabPanels(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  function capitalize(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase()
    })
  }

  return (
    <>
      <TabPanel className={classes.rootMui} value={value} index={0}>
        <Grid className={classes.root}>
          {props.suspendedUsers.length > 0 &&
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
                  label={`SUSPENSAS (${props.suspendedUsers.length})`}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                  {
                    props.suspendedUsers.length > 0
                      ? props.suspendedUsers.map((u, i) => (
                        <Grid key={i} className={classes.containerUserSubscription}>
                          <IconButton aria-haspopup="true" color="inherit">
                            <Avatar className={classes.avatarSubscription}>{toolsUtils.getAvatar(u)}</Avatar>
                          </IconButton>

                          <Grid>
                            <Typography className={classes.userNameSubs}>{capitalize(u.name)} {capitalize(u.surname)}</Typography>
                            <Grid container className={classes.userRole}>
                              <CurrencyExchange />
                              <Grid item alignItems="center" sx={{ ml: "4px" }}>
                                {u.crop}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))
                      : < Grid className={classes.loadRoot}>
                        <CircularProgress />
                      </Grid>
                  }
                </Box>
              </AccordionDetails>
            </Accordion>
          }
          {props.overdueUsers.length > 0 &&
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
                  label={`PAGAMENTOS EM ATRASO (${props.overdueUsers.length})`}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                  {props.overdueUsers.length > 0
                    ? props.overdueUsers.map((u, i) => (
                      <Grid key={i} className={classes.containerUserSubscription}>
                        <IconButton aria-haspopup="true" color="inherit">
                          <Avatar className={classes.avatarSubscription}>{toolsUtils.getAvatar(u)}</Avatar>
                        </IconButton>
                        <Grid>
                          <Typography className={classes.userNameSubs}>{capitalize(u.name)} {capitalize(u.surname)}</Typography>
                          <Grid container className={classes.userRole}>
                            <CurrencyExchange style={{ marginRight: "4px" }} />  {u.crop}
                          </Grid>
                        </Grid>
                      </Grid>
                    ))
                    : <Grid className={classes.loadRoot}>
                      <CircularProgress />
                    </Grid>
                  }
                </Box>
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
                  label={`ATIVAS (${props.activeUsers.length})`}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ backgroundColor: theme.colors.background }} component="ul">
                  {props.activeUsers.length > 0
                    ? props.activeUsers.map((u, i) => (
                      <Grid key={i} className={classes.containerUserSubscription}>
                        <IconButton aria-haspopup="true" color="inherit">
                          <Avatar className={classes.avatarSubscription}>{toolsUtils.getAvatar(u)}</Avatar>
                        </IconButton>
                        <Grid>
                          <Typography className={classes.userNameSubs}>{capitalize(u.name)} {capitalize(u.surname)}</Typography>
                          <Grid container className={classes.userRole}>
                            <CurrencyExchange style={{ marginRight: "4px" }} />  {u.crop}
                          </Grid>
                        </Grid>
                      </Grid>
                    ))
                    : < Grid className={classes.loadRoot}>
                      <CircularProgress />
                    </Grid>
                  }
                </Box>
              </AccordionDetails>
            </Accordion>
          }
        </Grid>
      </TabPanel>
      <TabPanel className={classes.rootMui} value={value} index={1}>
        <Grid className={classes.root}>
          {Object.entries(props.usersByCrop).map(([crop, statusObj]) => (
            <Accordion key={crop} defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
                className={classes.titleStatusSubSumary}
              >
                <FormControlLabel
                  className={classes.titleStatusSub}
                  aria-label="Acknowledge"
                  control={<CurrencyExchange />}
                  label={crop + ` (${Object.keys(statusObj).length})`}
                />
              </AccordionSummary>
              <AccordionDetails>
                {Object.entries(statusObj).map(([status, userList]) => (
                  <Box sx={{ backgroundColor: theme.colors.background }} component="ul" className={classes.listByStatusSubs} key={status}>
                    <Grid className={classes.titleCardDrawerSubs}>
                      {status === "Overdue" ? <Alert /> : status === "Active" ? <Active /> : <Inactive />}
                      <Typography className={classes.textCardDrawerSubs} variant="subtitle1">{status + `  (${userList.length})`}</Typography>
                    </Grid>
                    <Box sx={{ backgroundColor: theme.colors.background }} component="ul" className={classes.listByStatusSubsInner}>
                      {userList.length > 0
                        ? (userList.map((user, index) => (
                          <Grid key={index} className={classes.boxUserSubscriptionStatus}>
                            <IconButton aria-haspopup="true" color="inherit">
                              <Avatar className={classes.avatarSubscription}>{toolsUtils.getAvatar(user)}</Avatar>
                            </IconButton>
                            <Grid>
                              <Typography className={classes.userNameSubsListStatus}>{capitalize(user.name)} {capitalize(user.surname)}</Typography>
                            </Grid>
                          </Grid>
                        )))
                        : (<Grid className={classes.loadRoot}>
                          <CircularProgress />
                        </Grid>)
                      }
                    </Box>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel className={classes.rootMui} value={value} index={2}>
        <Grid className={classes.root}>
          {props.users.map((user, indexUser) => (
            <Accordion key={indexUser} defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
                className={classes.titleStatusSubSumary}
              >
                <FormControlLabel
                  className={classes.titleStatusSub}
                  aria-label="Acknowledge"
                  control={
                    <IconButton aria-haspopup="true" color="inherit">
                      <Avatar className={classes.avatarSubscription}>{toolsUtils.getAvatar(user)}</Avatar>
                    </IconButton>
                  }
                  label={user.name}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ backgroundColor: theme.colors.background }} component="ul" className={classes.listByStatusSubs} key={user.status}>
                  <Grid className={classes.titleCardDrawerSubs}>
                    {user.status === "Overdue" ? <Alert /> : user.status === "Active" ? <Active /> : <Inactive />}
                    <Typography className={classes.textCardDrawerSubs} variant="subtitle1">{user.status}</Typography>
                  </Grid>
                  <Box sx={{ backgroundColor: theme.colors.background }} component="ul" className={classes.listByStatusSubsInner}>
                    <Grid className={classes.boxUserSubscriptionStatus}>
                      <CurrencyExchange />
                      <Grid>
                        <Typography className={classes.userNameSubsListStatus}>{capitalize(user.crop)}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </TabPanel>
    </>
  )
}

SubscriptionsTabPanels.propTypes = {
  value: PropTypes.number,
  suspendedUsers: PropTypes.array,
  overdueUsers: PropTypes.array,
  activeUsers: PropTypes.array,
  usersByCrop: PropTypes.object,
  users: PropTypes.array,
}

export default SubscriptionsTabPanels