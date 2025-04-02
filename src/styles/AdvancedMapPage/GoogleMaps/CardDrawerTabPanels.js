import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  gatewaysFlexState: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  gatewaysTextActive: {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '32.016px',
    color: theme.colors.secondary
  },
  gatewaysTotal: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.4px",
    color: theme.colors.outline
  },
  gatewaysTextInAlert: {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '32.016px',
    color: "#FFB900"
  },
  gatewaysTextInactive: {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '32.016px',
    color: theme.colors.error[40]
  },
  propertiesTextActive: {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '32.016px',
    color: theme.colors.onPrimaryContainer
  },
}))

export default useStyles