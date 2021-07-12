import React from "react";
import Grid from "@material-ui/core/Grid";
import PlanCard from "../../components/PlanCard";
import { planData } from "./data";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { EnrollContext } from "./index";
import { useEnrollStyles } from "./styles";

const SelectPlan = () => {
  const classes = useEnrollStyles();
  const { handleSetForm, enrollmentForm } = React.useContext(EnrollContext);

  const colorsList = ["#FC9409", "#0075FF", "#0FB00F"];

  return (
    <Container className={classes.root}>
      <Grid container lg={10} >
        <Grid item className={classes.header}>
          <Typography className={classes.title} variant="h3" component="h4">
            Choose Your Plan
          </Typography>
        </Grid>
        <Grid container className={classes.planContainer}>
          {planData.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} lg={4}>
                <PlanCard
                  {...item}
                  selected={enrollmentForm.plan === item.key}
                  color={colorsList[index]}
                  handlePlanSelect={() =>
                    handleSetForm({ name: "plan", value: item.key })
                  }
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item style={{ marginBottom: 15 }}>
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
      </Grid>
    </Container>
  );
};

export default SelectPlan;
