import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Card, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"

import useStyles from "../../../../../styles/HomePanel/Tabs/Plans/PlanForm/PlanResumeCard"
import { ConstantsUtils } from "../../../../../utils/ConstantsUtils"


function PlanResumeCard(props) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation()

  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    setTotal(props.priceValue + props.featuresValue + props.additionalValue)
  }, [props])

  const formatCents = (value) => {
    if (value === 0) {
      return ConstantsUtils.NullFieldMask
    }

    const integer = value.toString().slice(0, value.toString().length - 2)
    const cents = value.toString().slice(value.toString().length - 2, value.toString().length)

    return `${integer},${cents}`
  }

  return (
    <Card className={classes.containerCard}>
      <Typography className={classes.subtitle}>
        {t("homePanel.plans.form.title8")}
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left" className={classes.paddingCell}>
                <Typography variant="body2" className={classes.nameText}>
                  {t("homePanel.plans.form.resume.planValue")}
                </Typography>
              </TableCell>
              <TableCell className={cx(classes.tableCellProp, classes.paddingCell)} align="right">
                <Grid className={classes.containerValue}>
                  <Typography variant="body2" className={classes.valueText}>{`R$ ${formatCents(props.priceValue)}`}</Typography>
                </Grid>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" className={classes.paddingCell}>
                <Typography variant="body2" className={classes.nameText}>
                  {t("homePanel.plans.form.resume.features")}
                </Typography>
              </TableCell>
              <TableCell className={cx(classes.tableCellProp, classes.paddingCell)} align="right">
                <Typography variant="body2" className={classes.valueText}>{`R$ ${formatCents(props.featuresValue)}`}</Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" className={classes.paddingCell}>
                <Typography variant="body2" className={classes.nameText}>
                  {t("homePanel.plans.form.resume.additional")}
                </Typography>
              </TableCell>
              <TableCell className={cx(classes.tableCellProp, classes.paddingCell)} align="right">
                <Typography variant="body2" className={classes.valueText}>{`R$ ${formatCents(props.additionalValue)}`}</Typography>
              </TableCell>
            </TableRow>

            <TableRow className={classes.lastRow}>
              <TableCell align="left" className={classes.paddingCell}>
                <Typography variant="h6" className={classes.highlightText}>
                  {t("homePanel.plans.form.resume.total")}
                </Typography>
              </TableCell>
              <TableCell className={cx(classes.tableCellProp, classes.paddingCell)} align="right">
                <Typography variant="h6" className={classes.highlightValue}>{`R$ ${formatCents(total)}`}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

PlanResumeCard.propTypes = {
  priceValue: PropTypes.number.isRequired,
  featuresValue: PropTypes.number.isRequired,
  additionalValue: PropTypes.number.isRequired
}

export default PlanResumeCard