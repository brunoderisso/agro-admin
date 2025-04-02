import PropTypes from "prop-types";

import { Box, Grid } from "@mui/material";


function TabPanel(props) {
  const { Banner, children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {typeof Banner === "function" && <Banner />}
      {value === index && (
        <Box>
          <Grid>{children}</Grid>
        </Box>
      )}
    </Grid>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number,
  Banner: PropTypes.func,
  className: PropTypes.string
}

export default TabPanel