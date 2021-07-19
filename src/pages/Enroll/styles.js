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
  header: {
    alignSelf: "center",
    marginBottom: theme.spacing(2),
  },
  title: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 35,
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
    fontWeight: "500",
  },
  heading: {
    fontWeight: "550",
    marginBottom: theme.spacing(3),
  },
  caption: {
    opacity: 0.7,
    lineHeight: "1.5rem",
    fontSize: 19,
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
    fontSize: 19,
    fontWeight: "550",
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
