import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  formHeader:{
    fontWeight: "500",
    fontSize: "18px",
    marginBottom: "50px"
  },
  boxContainer: {
    padding: "2vw"
  },
  formContainer:{
    backgroundColor: "#FFFFFF",
    height: "100%",
    borderRadius:"3vw",
    padding: "3vw",
    border: "0.5vw solid"+theme.colors.predizadark,
    alignItems: "center",
  },
  loginPosition:{
    position: "relative",
    bottom: "0px",
    padding: "0px 10px",
    fontWeight: 600
  },
  alignButton:{
    textAlign: "right",
    marginTop: "50px"
  },
  button: {
    backgroundColor: theme.colors.predizaregular,
    borderRadius: "0.7vw",
    padding: "15px 50px",
    fontSize: "15px"
  }
}))

export default useStyles