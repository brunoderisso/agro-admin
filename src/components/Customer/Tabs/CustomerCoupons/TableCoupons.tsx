import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import {
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"

import useStyles from "../../../../styles/HomePanel/Tabs/Coupons/TableCoupons"
import EmptyTable from "../../../Common/EmptyTable"
import ItemTableCoupons from "./ItemTableCoupons"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"


function TableCoupons(props) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [isEmptyState, setIsEmptyState] = useState<boolean>(false)
  const [totalrows, setTotalRows] = useState<number>(0)
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    if (props.coupons.length > 0) {
      setIsEmptyState(false)
    } else {
      setIsEmptyState(true)
    }
  }, [props.coupons])

  useEffect(() => {
    if (props.totalRows) {
      setTotalRows(props.totalRows)
    }
  }, [props.totalRows])

  useEffect(() => {
    if (props.page) {
      setPage(props.page)
    }
  }, [props.page])

  const handleChangePage = (_, newPage) => {
    setPage(newPage)

    props.handlePage(newPage)
    props.handleFlagReloadPage(true)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)

    props.handlePage(0)
    props.handleFlagReloadPage(true)
    props.handleRowsPerPage(parseInt(event.target.value, 10))
  }

  return (
    <Grid sx={{ marginTop: "24px" }}>
      <Card component={Paper} className={classes.wrapperCard}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ maxWidth: "144px" }}>
                  <Typography className={classes.titleTable}>
                    Código
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "88px" }}>
                  <Typography className={classes.titleTable}>
                    Desconto
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "144px" }}>
                  <Typography className={classes.titleTable}>
                    Data de aplicação
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "56px" }}>
                  <Typography className={classes.titleTable}>
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.coupons.map((coupon, index) => (
                <ItemTableCoupons
                  key={index}
                  coupon={coupon}
                />
              ))}
              {isEmptyState && <EmptyTable colspan={6} />}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid className={classes.wrapperPagination}>
          <TablePagination
            component="div"
            className={classes.textTable}
            count={totalrows}
            page={!totalrows || totalrows <= 0 ? 0 : page}
            rowsPerPage={props.rowsPerPage || ConstantsUtils.RowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("tablePagination.mainLabel")}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} ${t("tablePagination.secondaryLabel")}
              ${count !== -1 ? count : `${t("tablePagination.tertiaryLabel")} ${to}}`}`
            }
          />
        </Grid>
      </Card>
    </Grid>
  )
}

TableCoupons.propTypes = {
  coupons: PropTypes.arrayOf(
    PropTypes.shape({
      objectid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      recurrent: PropTypes.bool,
    })
  ).isRequired,
  totalRows: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handlePage: PropTypes.func.isRequired,
  handleRowsPerPage: PropTypes.func.isRequired,
  handleFlagReloadPage: PropTypes.func.isRequired,
  handleLoader: PropTypes.func.isRequired,
}

export default TableCoupons