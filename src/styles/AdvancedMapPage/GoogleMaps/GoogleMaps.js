import { makeStyles } from "tss-react/mui"

import sizes from "../../Utils/SizesWindow"

const useStyles = makeStyles()((theme) => ({
    controlIcons: {
        height: "28px",
        "& path": {
            fill: theme.colors.primaryContainer
        }
    },
    controlIconsButon: {
        padding: "0px 2px"
    },
    fullscreenControls: {
        backgroundColor: theme.colors.onPrimaryContainerTransparent[60],
        width: "28px",
        "& .MuiIconButton-sizeMedium": {
            minWidth: "28px",
            padding: "0px"
        },
        textAlign: "center",
        marginRight: "16px",
        marginTop: "16px",
        boxShadow: `
            0px 3px 1px -2px #00000033,
            0px 2px 2px 0px #00000024,
            0px 1px 5px 0px #0000001F
        `,
    },
    googleMapsContainer: {
        width: "100%",
        height: "calc(100vh - 64px)"
    },
    zoomControls: {
        backgroundColor: theme.colors.onPrimaryContainerTransparent[60],
        width: "28px",
        "& .MuiIconButton-sizeMedium": {
            minWidth: "28px",
            padding: "0px"
        },
        textAlign: "center",
        zIndex: 10,
        marginRight: "16px",
        boxShadow: `
            0px 3px 1px -2px #00000033,
            0px 2px 2px 0px #00000024,
            0px 1px 5px 0px #0000001F
        `,
    },
    boxMap: {
        textAlignLast: "center",
    },
    GMap: {
        overflow: "hidden",
        borderRadius: "1.25em",
        height: "54vh",
        width: "100%",
        margin: "1px 10px",
    },
    gradientBarProp: {
        position: "relative",
        float: "right",
        top: "-62vh",

        [theme.breakpoints.down(sizes.xs)]: {
            top: "-43vh"
        },
    },
    buttonDrawer: {
        left: "16px !important",
        top: "16px !important",
        backgroundColor: theme.colors.onPrimary,
        color: theme.colors.onPrimaryContainer,
        "&:hover": {
            backgroundColor: theme.colors.disabledBackground
        }
    }
}))

export default useStyles