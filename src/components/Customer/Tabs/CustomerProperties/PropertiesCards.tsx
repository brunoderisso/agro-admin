import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import { Card, CircularProgress, Grid, TablePagination, Typography } from "@mui/material"

import useStyles from "../../../../styles/Customer/CustomerProperties/PropertiesCards"
import ItemPropertyCard from "./ItemPropertyCard"
import EnvironmentForm from "./PropertyForm"
import polygonUtils from "../../../../utils/PolygonUtils"
import customerStore from "../../../../stores/CustomerStore"
import { ConstantsUtils } from "../../../../utils/ConstantsUtils"
import CancelToken from "../../../../helpers/cancelToken"
import { PropertyType } from "../../../../interfaces/Customer/Property"


function PropertiesCards(props) {
  const { classes } = useStyles()
  const { t } = useTranslation()

  const [properties, setProperties] = useState<PropertyType[]>([])
  const [loader, setLoader] = useState<boolean>(false)
  const [indexEditProperty, setIndexEditProperty] = useState<number>(-1)
  const [editProperty, setEditProperty] = useState(null)
  const [selectedProperty, setSelectedProperty] = useState<PropertyType>(null)
  const [totalrows, setTotalRows] = useState<number>(0)
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    setProperties(props.properties)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.properties])

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

  const onChangeProperty = (prop) => {
    setEditProperty(prop)
  }

  const cancelEditForm = () => {
    setEditProperty({})
    setIndexEditProperty(-1)
    setSelectedProperty(null)
  }

  const handleEditMode = (index, env) => {
    setIndexEditProperty(index)
    setSelectedProperty({
      name: env.name,
      area: polygonUtils.convertAreaToHa(env.area),
      productiveSize: ""
    })
  }

  const confirmEditProperty = () => {
    setLoader(true)

    // TODO: adicionar productiveSize no objeto
    const formattedEditProperty = {
      name: editProperty.name,
      area: polygonUtils.convertAreaToMeter(+editProperty.area)
    }

    customerStore.updatePropertyByCustomer(
      CancelToken(),
      props.customerId,
      properties[indexEditProperty].objectid,
      formattedEditProperty,
      responseConfirmEditProperty
    )
  }

  const responseConfirmEditProperty = (response) => {
    CancelToken().remove(response.id)
    setLoader(false)

    if (response.data) {
      const newProperties = [...properties]

      newProperties.splice(indexEditProperty, 1, {objectid: response.data.objectid, ...editProperty})
      setProperties(newProperties)
      cancelEditForm()
    }

    if (response.status) {
      props.handlerError(response.status.toString())
    }
  }

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
    <Grid item sx={{ marginLeft: "1px" }}>
      <Card className={classes.cardContainer} sx={{ maxWidth: "450px" }}>
        <Grid container>
          {properties.map((property, index) => {
            return (
              <Grid key={index}>
                {indexEditProperty !== index &&
                  <ItemPropertyCard
                    key={index}
                    property={property}
                    index={index}
                    handleEditMode={(index, env) => { handleEditMode(index, env) }}
                    loader={loader}
                    customerId={props.customerId}
                  />
                }
                {indexEditProperty === index && !loader &&
                  <EnvironmentForm
                    index={index}
                    environment={selectedProperty || editProperty}
                    onChange={onChangeProperty}
                    onHandleCloseBt={cancelEditForm}
                    onHandleDoneBt={confirmEditProperty}
                  />
                }
                {indexEditProperty === index && loader &&
                  <Grid
                    justifyContent="center"
                    alignItems="center"
                    className={classes.loaderContainer}
                  >
                    <CircularProgress />
                  </Grid>
                }
              </Grid>
            )
          })}
          {properties.length === 0 &&
            <Typography className={classes.textCard}>{t("general.tableEmptyState")}</Typography>
          }
        </Grid>

        <Grid className={classes.wrapperPagination}>
          <TablePagination
            component="div"
            className={classes.textCard}
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

PropertiesCards.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      objectid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      area: PropTypes.string,
      productiveSize: PropTypes.string
    })
  ).isRequired,
  customerId: PropTypes.string,
  totalRows: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handlePage: PropTypes.func.isRequired,
  handleRowsPerPage: PropTypes.func.isRequired,
  handleFlagReloadPage: PropTypes.func.isRequired,
}

export default PropertiesCards