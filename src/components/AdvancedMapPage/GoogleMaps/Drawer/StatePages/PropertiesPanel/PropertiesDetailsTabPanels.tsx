import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import EditIcon from "@mui/icons-material/Edit"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/PropertiesDetailsTabPanels"
import TabPanel from "../../../../../Common/TabPanel"
import NewAnnotation from "./NewAnnotation"
import toolsUtils from "../../../../../../utils/ToolsUtils"
import EditProperties from "./EditProperties"
import ActivateEditPerson from "./ActivateEditPerson"
import EditContactProperties from "./EditContactProperties"
import Comment from "../../../../../../img/AdvancedMapIcons/Comment.svg?react"


function PropertiesDetailsTabPanels(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState<number>(0)
  const [visiblePerson, setVisiblePerson] = useState<string>("person")
  const [visibleAnnotation, setVisibleAnnotation] = useState<string>("annotation")
  const [singleUser, setSingleUser] = useState({})

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const handleUser = (stateUser, user = null) => {
    if (stateUser === "activateEditPerson") {
      setVisiblePerson(stateUser)
    } else if (stateUser === "listPerson" && user) {
      setSingleUser({})
      setSingleUser(user)
      setVisiblePerson("editPerson")
    } else {
      setSingleUser({})
      setVisiblePerson(stateUser)
    }
  }

  const handleAnnotation = (stateUser) => {
    if (stateUser === "newAnnotation") {
      setVisibleAnnotation(stateUser)
    }
    if (stateUser === "annotation") {
      setVisibleAnnotation(stateUser)
    }
  }

  return (
    <>
      {/* CONTATO */}
      <TabPanel className={classes.prospectStyle} value={value} index={0}>
        {visiblePerson === "person" &&
          <Grid className={classes.root}>
            <Accordion defaultExpanded className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <Typography className={classes.titleCardDrawer}>PESSOAS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid className={classes.listEnvironment}>
                  <Grid className={classes.usersList}>
                    {props.users.length > 0
                      ? props.users.map((u, i) => (
                        <Grid key={i} onClick={() => handleUser("listPerson", u)} className={classes.containerUser}>
                          <IconButton aria-haspopup="true" color="inherit">
                            <Avatar className={classes.avatar}>{toolsUtils.getAvatar(u)}</Avatar>
                          </IconButton>
                          <Grid>
                            <Typography className={classes.userName}>{u.name} {u.surname}</Typography>
                            <Typography className={classes.userRole}>{u.isowner ? "Proprietário" : "Representante Comercial"}</Typography>
                          </Grid>
                        </Grid>
                      ))
                      : <div className={classes.loadRoot}>
                        <CircularProgress />
                      </div>
                    }
                  </Grid>
                </Grid>
              </AccordionDetails>

            </Accordion>
            <Button
              className={classes.areaButton}
            >
              + ADICIONAR CONTATO
            </Button>
            <Accordion className={classes.panelMuiAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <Typography className={classes.titleCardDrawer}>
                  PROPRIEDADE
                  <Grid item xs={2} style={{ textAlign: "right", width: "10%" }}>
                    <IconButton size="small" onClick={() => handleUser("editContactProperties")}>
                      <EditIcon style={{ color: "#00174B" }} fontSize="small" />
                    </IconButton>
                  </Grid>
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.propertyPreference}>
                <Grid className={classes.boxPreference}>
                  <Typography className={classes.propertyTitle1}>Produtor/Empresa</Typography>
                  <Typography className={classes.propertyTitle2}>Prediza Agtech Ltda.</Typography>
                </Grid>
                <Grid className={classes.boxPreference}>
                  <Typography className={classes.propertyTitle1}>Inscrição do produtor</Typography>
                  <Typography className={classes.propertyTitle2}>201.900.368.208-3</Typography>
                </Grid>
                <Grid className={classes.boxPreference}>
                  <Typography className={classes.propertyTitle1}>Endereço</Typography>
                  <Typography className={classes.propertyTitle2}>Rua Francisco Getúlio Vargas, 11300</Typography>
                </Grid>
                <Grid className={classes.boxPreference}>
                  <Typography className={classes.propertyTitle1}>CEP</Typography>
                  <Typography className={classes.propertyTitle2}>95070-560</Typography>
                </Grid>
                <Grid className={classes.boxPreference}>
                  <Typography className={classes.propertyTitle1}>Cidade</Typography>
                  <Typography className={classes.propertyTitle2}>Caxias do Sul</Typography>
                </Grid>
                <Grid className={classes.boxPreference}>
                  <Typography className={classes.propertyTitle1}>Estado</Typography>
                  <Typography className={classes.propertyTitle2}>RS</Typography>
                </Grid>
                <Grid className={classes.boxPreference}>
                  <Typography className={classes.propertyTitle1}>Telefone</Typography>
                  <Typography className={classes.propertyTitle2}>(54) 9 9233-7377</Typography>
                </Grid>
                <Grid className={classes.boxPreference}>
                  <Typography className={classes.propertyTitle1}>E-mail</Typography>
                  <Typography className={classes.propertyTitle2}>fazenda@prediza.io</Typography>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        }
        {
          visiblePerson === "editPerson" &&
          <EditProperties handleUser={handleUser} singleUser={singleUser} />
        }
        {
          visiblePerson === "activateEditPerson" &&
          <ActivateEditPerson handleUser={handleUser} singleUser={singleUser} />
        }
        {
          visiblePerson === "editContactProperties" &&
          <EditContactProperties handleUser={handleUser} />
        }
      </TabPanel>
      {/* ANOTAÇÕES */}
      <TabPanel className={classes.prospectStyle} value={value} index={1}>
        {visibleAnnotation === "annotation" &&
          <Grid>
            <Button
              onClick={() => handleAnnotation("newAnnotation")}
              className={classes.areaButton}
            >
              + NOVA ANOTAÇÃO
            </Button>
            {/* TODO: Mock */}
            <Grid className={classes.annotationContainer}>
              <Grid>
                <Typography variant="caption">
                  {<Comment />}
                  <span className={classes.annotationDate}> 19/12/2023 • 14h30</span>
                  <Typography className={classes.annotationDateInner}>editado: 20/12/2023 • 10h24</Typography>
                </Typography>
              </Grid>
              <Typography>
                {<svg width="12" height="5" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.51214 0.675555V5H4.80281V2.03822L3.4837 5H2.99214L1.66681 2.03822V5H0.957474V0.675555H1.72281L3.24103 4.06667L4.75303 0.675555H5.51214ZM11.0435 0.675555V5H10.3342V2.03822L9.0151 5H8.52355L7.19821 2.03822V5H6.48888V0.675555H7.25421L8.77244 4.06667L10.2844 0.675555H11.0435Z" fill="#00174B" />
                </svg>}
                <span className={classes.subAnnotationDate}>Marcelo Moreira</span>
              </Typography>
              <Grid style={{ padding: "12px" }}>
                <Typography variant="caption" className={classes.annotation}>
                  Cliente solicitou uma visita em conversa por telefone comigo.
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.annotationContainer}>
              <Grid>
                <Typography variant="caption">
                  {<Comment />}
                  <span className={classes.annotationDate}> 19/12/2023 • 14h30</span>
                  <Typography className={classes.annotationDateInner}>editado: 20/12/2023 • 10h24</Typography>
                </Typography>
              </Grid>
              <Typography>
                {<svg width="12" height="5" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.51214 0.675555V5H4.80281V2.03822L3.4837 5H2.99214L1.66681 2.03822V5H0.957474V0.675555H1.72281L3.24103 4.06667L4.75303 0.675555H5.51214ZM11.0435 0.675555V5H10.3342V2.03822L9.0151 5H8.52355L7.19821 2.03822V5H6.48888V0.675555H7.25421L8.77244 4.06667L10.2844 0.675555H11.0435Z" fill="#00174B" />
                </svg>}
                <span className={classes.subAnnotationDate}>Marcelo Moreira</span>
              </Typography>
              <Grid style={{ padding: "12px" }}>
                <Typography variant="caption" className={classes.annotation}>
                  Cliente solicitou uma visita em conversa por telefone comigo.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        }

        {visibleAnnotation === "newAnnotation" &&
          <NewAnnotation handleAnnotation={handleAnnotation} />
        }
      </TabPanel>
      {/* MERCADO */}
      <TabPanel className={classes.prospectStyleMarket} value={value} index={2}>
        <Accordion defaultExpanded className={classes.panelMuiAccordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <Typography className={classes.titleCardDrawer}>REVENDA AUTORIZADA</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.propertyPreference}>
            <Grid className={classes.boxPreferenceFirst}>
              <Typography className={classes.propertyTitle1}>Razão Social</Typography>
              <Typography className={classes.propertyTitle2}>Agrosales Parceiro Comercial</Typography>
            </Grid>
            <Grid className={classes.boxPreference}>
              <Typography className={classes.propertyTitle1}>Endereço</Typography>
              <Typography className={classes.propertyTitle2}>Rua Francisco Getúlio Vargas, 11300</Typography>
            </Grid>
            <Grid className={classes.boxPreference}>
              <Typography className={classes.propertyTitle1}>CEP</Typography>
              <Typography className={classes.propertyTitle2}>95070-560</Typography>
            </Grid>
            <Grid className={classes.boxPreference}>
              <Typography className={classes.propertyTitle1}>Cidade</Typography>
              <Typography className={classes.propertyTitle2}>Caxias do Sul</Typography>
            </Grid>
            <Grid className={classes.boxPreference}>
              <Typography className={classes.propertyTitle1}>Estado</Typography>
              <Typography className={classes.propertyTitle2}>RS</Typography>
            </Grid>
            <Grid className={classes.boxPreference}>
              <Typography className={classes.propertyTitle1}>Telefone</Typography>
              <Typography className={classes.propertyTitle2}>(54) 9 9233-7377</Typography>
            </Grid>
            <Grid className={classes.boxPreference}>
              <Typography className={classes.propertyTitle1}>E-mail</Typography>
              <Typography className={classes.propertyTitle2}>fazenda@prediza.io</Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded className={classes.panelMuiAccordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <Typography className={classes.titleCardDrawer}>CONTATOS COMERCIAIS</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.listEnvironmentBox}>
            <Grid className={classes.listEnvironment}>
              <Grid className={classes.usersList}>
                {props.users.length > 0 &&
                  props.users.map((u, i) => (
                    <Grid key={i} onClick={() => handleUser("listPerson", u)} className={classes.containerUser}>
                      <IconButton aria-haspopup="true" color="inherit">
                        <Avatar className={classes.avatar}>{toolsUtils.getAvatar(u)}</Avatar>
                      </IconButton>
                      <Grid>
                        <Typography className={classes.userName}>{u.name} {u.surname}</Typography>
                        <Typography className={classes.userRole}>{u.isowner ? "Proprietário" : "Representante Comercial"}</Typography>
                      </Grid>
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Button className={classes.areaButton}>
          + ADICIONAR CONTATO
        </Button>
      </TabPanel>
    </>
  )
}

PropertiesDetailsTabPanels.propTypes = {
  value: PropTypes.number,
  users: PropTypes.array,
}

export default PropertiesDetailsTabPanels