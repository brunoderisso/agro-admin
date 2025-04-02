import { useState } from "react"

import { Grid, Typography } from "@mui/material"

import useStyles from "../../../../../../styles/AdvancedMapPage/GoogleMaps/CardDrawer"
import CardDrawerMenu from "./CardDrawerMenu"
import CardDrawerTabPanels from "./CardDrawerTabPanels"

const CardDrawer = (props) => {
  const { classes, cx } = useStyles()

  const [value, setValue] = useState<number>(0)

  const handleChange = (newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid className={classes.cardBox}>
      <Grid container alignItems="center" className={classes.cardFlex} onClick={() => props.activeTab && props.onClick()}>
        <Grid item>
          {props.icons}
        </Grid>
        <Grid item xs={11}>
          <Grid alignItems="center" container justifyContent="space-between">
            <Grid item>
              <Typography className={classes.cardText} variant="subtitle2">
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography className={classes.cardTotal} variant="caption">
                    Total:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.cardValue} variant="subtitle2">
                    {props.total}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {props.activeTab &&
        <Grid>
          <CardDrawerMenu value={value} onChange={handleChange} />
          <CardDrawerTabPanels
            value={value}
            activeTab={props.activeTab}
            onClick={props.onClick}
            active={props.active}
            alert={props.alert}
            inactive={props.inactive}
          />
        </Grid>
      }
      {!props.activeTab &&
        <Grid container onClick={() => props.activeTab && props.onClick()} className={classes.cardFlexState}>
          <Grid xs={4} item>
            <Typography variant="h5" className={cx({
              [classes.cardTextActive]: !props.colorDark,
              [classes.cardTextDark]: props.colorDark
            })}>{props.active}</Typography>
            <Typography className={classes.cardTotal}>{props.labelOne}</Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography variant="h5" className={cx({
              [classes.cardTextInAlert]: !props.colorDark,
              [classes.cardTextDark]: props.colorDark
            })}>{props.alert}</Typography>
            <Typography className={classes.cardTotal}>{props.labelTwo}</Typography>
          </Grid>
          <Grid xs={4} item>
            <Typography variant="h5" className={cx({
              [classes.cardTextInactive]: !props.colorDark,
              [classes.cardTextDark]: props.colorDark
            })}>{props.inactive}</Typography>
            <Typography className={classes.cardTotal}>{props.labelThree}</Typography>
          </Grid>
          {props.labelFour &&
            <Grid xs={4} item>
              <Typography variant="h5" className={cx({
              [classes.cardTextInactive]: !props.colorDark,
              [classes.cardTextDark]: props.colorDark
            })}>{props.undefined}</Typography>
              <Typography className={classes.cardTotal}>{props.labelFour}</Typography>
            </Grid>
          }
        </Grid>
      }
    </Grid>
  )
}

export default CardDrawer
