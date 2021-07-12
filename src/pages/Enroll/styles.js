import { makeStyles } from "@material-ui/core/styles";

export const useEnrollStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    minHeight: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  header: {
    alignSelf: "flex-end",
    marginBottom: theme.spacing(4),
  },
  title: {
    width: "100%",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
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
    padding: "5px 35px",
    textTransform: "capitalize",
    fontSize: 18,
  },
  rowContainer: {
    display: "flex",
    alinItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
  },
  transparentButton: {
    fontSize: 18,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  footer: {
    display: "flex",
    alignItem: "flex-end",
    justifyContent: "flex-end",
  },
}));
