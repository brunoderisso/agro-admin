import { makeStyles } from "@material-ui/core";

const drawerWidth = "240px"

const useStyles = makeStyles()((theme) => ({
    container: {
        display: " flex",
        padding: "16px 16px 24px 24px",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        height: "calc(100vh - 64px)",
        marginTop: "64px",
        borderRadius: "4px 0px 0px 4px",
    },
    searchLabel: {
        "& label.Mui-focused": {
            marginLeft: "-12px"
        },
        "& label.MuiFormLabel-root.Mui-focused": {
            color: theme.colors.primary[40]
        },
        '& .MuiInput-underline:after': {
            borderBottom: "2px solid " + theme.colors.primary[40]
        }
    },
    accordionTitle: {
        color: theme.colors.outline
    },
    itemAcronym: {
        fontSize: "8px",
        letterSpacing: "0px"
    },
    itemTitle: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "inline-block",
        width: "100%"
    },
    iconClose: {
        color: theme.colors.onPrimaryContainer,
        fontSize: '16px'
    },
    iconSearch: {
        marginRight: '10px'
    },
    accordionContainer: {
        '& .MuiSvgIcon-root': {
            fontSize: theme.iconProp.fontSize,
            '& path': {
                fill: theme.colors.onPrimaryContainer
            }
        },
    }
}));

export default useStyles;