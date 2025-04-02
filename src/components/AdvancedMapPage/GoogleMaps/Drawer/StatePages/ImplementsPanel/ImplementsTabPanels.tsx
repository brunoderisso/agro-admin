import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import TabPanel from "../../../../../Common/TabPanel"
import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/ImplementsTabPanels"
import theme from "../../../../../../styles/Utils/Theme"


function ImplementsTabPanels(props) {
  const { classes } = useStyles()

  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <>
      <TabPanel className={classes.rootMui} value={value} index={0}>
        <Grid className={classes.root}>
          <Accordion className={classes.panelMuiAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <Typography className={classes.titleCardDrawer}>PAGAMENTOS ATRASADOS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="ul" style={{ listStyle: "none", backgroundColor: theme.colors.background }}>
                <Box component="li">

                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </TabPanel>
      <TabPanel className={classes.rootMui} value={value} index={1}>
        <Grid className={classes.root}>
          <Accordion className={classes.panelMuiAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <Typography className={classes.titleCardDrawer}>FAZENDA PREDIZA</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="ul" style={{ listStyle: "none", backgroundColor: theme.colors.background }}>
                <Box component="li">
                  <Typography variant="h3">
                    <Box component="span">
                      --
                    </Box>
                    Pagamento atrasado
                  </Typography>
                  <Box component="ul" style={{ listStyle: "none", backgroundColor: theme.colors.background }}>
                    <Box component="li">
                      <Box component="span"></Box>
                      Nome
                    </Box>
                  </Box>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </TabPanel>
    </>
  )
}

ImplementsTabPanels.propTypes = {
  value: PropTypes.number,
}

export default ImplementsTabPanels