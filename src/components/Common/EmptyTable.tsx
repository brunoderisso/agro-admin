import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { TableRow, TableCell, Typography } from "@mui/material"

import useStyles from "../../styles/Common/EmptyTable"


function EmptyTable(props) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  return (
    <TableRow className={classes.rowTable}>
      <TableCell colSpan={props.colspan}>
        <Typography className={classes.textTable}>
          {t("general.tableEmptyState")}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

EmptyTable.propTypes = {
  colspan: PropTypes.number,
}

export default EmptyTable