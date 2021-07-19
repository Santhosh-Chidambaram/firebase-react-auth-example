import { makeStyles } from "@material-ui/core/styles";

export const useEnrollStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    minHeight: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
    },
  },
  finalize: {
    padding: theme.spacing(3),
    minHeight: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
    },
  },
  header: {
    alignSelf: "center",
    marginBottom: 20,
  },
  header1: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  title: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 33,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      fontSize: 30,
    },
  },
  planContainer: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3.5),
    },
  },
  listText: {
    fontWeight: "550",
  },
  heading: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 33,

    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      fontSize: 30,
    },
  },
  caption: {
    opacity: 0.7,
    lineHeight: "1.5rem",
  },
  captionText: {
    opacity: 0.7,
    lineHeight: "1.5rem",
    fontSize: 19,
    marginBottom: theme.spacing(2),
  },
  uploadBtnWrapper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
  uploadFile: {
    marginLeft: 10,
    marginBottom: 10,
    color: "grey",
    fontSize: 16,
  },
  uploadButton: {
    borderRadius: 15,
    border: "none",
    outline: "none",
    padding: "5px 35px",
    textTransform: "capitalize",
    fontSize: 18,
    backgroundColor: "orange",
  },
  rowContainer: {
    marginBottom: theme.spacing(4),
  },
  rowItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "cneter",
    marginBottom: theme.spacing(4),
  },
  transparentButton: {
    fontSize: 18,
    textTransform: "capitalize",
  },
  footer: {
    display: "flex",
    alignItem: "flex-end",
    justifyContent: "flex-end",
  },
  footerSb: {
    display: "flex",
    alignItem: "center",
    justifyContent: "space-between",
  },
}));
