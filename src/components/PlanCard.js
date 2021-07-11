import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    minWidth: 200,
    minHeight: 180,
    padding: 0,
    color: "#fff",
    [theme.breakpoints.up("xs")]: {
      margin: "10px 0px",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "10px 20px 10px 0",
    },
    [theme.breakpoints.up("md")]: {
      margin: "20px 20px 20px 0",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "20px 50px 20px 0",
    },
    "&:hover": {
      opacity: 0.85,
      transform: "scale(1.05)",
      transition: "all 100ms ease-in",
    },
  },
  cardContent: {
    flex: "1 auto",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    color: "#fff",
    padding: "20px 10px",
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  amount: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  noteText: {},
}));
const PlanCard = ({
  title = "Card Title",
  amount = "25",
  notes = "A Sample Note",
  color = "blue",
  handlePlanSelect = {},
}) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      style={{ backgroundColor: color, cursor: "pointer" }}
      onClick={handlePlanSelect}
    >
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} variant="h4" component="h4">
          {title}
        </Typography>
        <Typography className={classes.amount}>${amount}</Typography>
        {notes.map((text) => {
          return (
            <Typography variant="subtitle2" className={classes.noteText}>
              {text}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PlanCard;
