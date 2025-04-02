import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  cardBox: {
    marginTop: "24px",
    borderRadius: "4px",
    background: theme.colors.onPrimary,
    /* Elevation/1 */
    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.20), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
    width: "352px",
    padding: "8px 24px 16px 24px",
    gap: "8px",
    cursor: "pointer"
  },
  cardFlex: {
    "& div": {
      "& div": {
        marginLeft: "6px"
      }
    }
  },
  cardText: {
    color: theme.colors.onPrimaryContainer,
    fontSize: "14px",
    display: "flex",
    alignItems: "center"
  },
  cardTotal: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.4px",
    color: theme.colors.outline
  },
  cardValue: {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.1px",
    color: theme.colors.onPrimaryContainer
  },
  cardFlexState: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  cardTextActive: {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '32.016px',
    color: theme.colors.secondary
  },
  cardTextDark: {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '32.016px',
    color: theme.colors.onPrimaryContainer
  },
  cardTextInAlert: {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '32.016px',
    color: "#FFB900"
  },
  cardTextInactive: {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '32.016px',
    color: theme.colors.error[40]
  },
}));

export default useStyles;