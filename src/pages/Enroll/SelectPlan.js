import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PlanCard from "../../components/PlanCard";
import { planData } from "./data";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { EnrollContext } from "./index";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  title: {
    fontWeight: "bold",
  },
  planContainer: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3.5),
    },
  },
  listText: {
    fontWeight: "500",
  },
}));
const SelectPlan = () => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const { handleSetForm } = React.useContext(EnrollContext);
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const colorsList = ["#FC9409", "#0075FF", "#0FB00F"];

  return (
    <Container className={classes.root}>
      <Grid container lg={10}>
        <Grid item md={12} lg={12} xl={12} style={{ height: 100 }} />
        <Typography className={classes.title} variant="h4" component="h4">
          Choose Your Plan
        </Typography>
        <Grid item lg={12} style={{ height: 20 }} />
        <Grid container className={classes.planContainer}>
          {planData.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <PlanCard
                  {...item}
                  color={colorsList[index]}
                  handlePlanSelect={() =>
                    handleSetForm({ name: "plan", value: item.key })
                  }
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item md={12} lg={12} xl={12} style={{ height: 60 }} />
        <ol style={{ listStyle: "none" }}>
          <li>
            <Typography
              variant="body2"
              component="h4"
              className={classes.listText}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              maximus id elit et cursus. Ut vitae mollis enim, nec semper est.
              Orci varius natoque penatibus et magnis dis parturient montes
            </Typography>
          </li>
          <li>
            <Typography
              variant="body2"
              component="h4"
              className={classes.listText}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              maximus id elit et cursus. Ut vitae mollis enim, nec semper est.
              Orci varius natoque penatibus et magnis dis parturient montes
            </Typography>
          </li>
          <li>
            <Typography
              variant="body2"
              component="h4"
              className={classes.listText}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              maximus id elit et cursus. Ut vitae mollis enim, nec semper est.
              Orci varius natoque penatibus et magnis dis parturient montes
            </Typography>
          </li>
        </ol>
      </Grid>
    </Container>
  );
};

export default SelectPlan;
