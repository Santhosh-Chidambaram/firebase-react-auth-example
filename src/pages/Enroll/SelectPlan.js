import React from "react";
import Grid from "@material-ui/core/Grid";
import PlanCard from "../../components/PlanCard";
import { planData } from "./data";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useEnrollStyles } from "./styles";
import Button from "@material-ui/core/Button";
import { useEnrollContext } from "../../context/EnrollContext";
const colorsList = ["#FC9409", "#0075FF", "#0FB00F"];
const SelectPlan = () => {
  const classes = useEnrollStyles();
  const { handleSetForm, enrollmentForm, moveForward } = useEnrollContext();

  const handleContinue = () => {
    moveForward();
  };
  return (
    <Container className={classes.root} style={{ height: "fit-content" }}>
      <Grid container lg={10}>
        <Grid item className={classes.header}>
          <Typography className={classes.title} variant="h3" component="h4">
            Choose Your Plan
          </Typography>
        </Grid>
        <Grid container className={classes.planContainer}>
          {planData.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} lg={4} key={"plan-item" + index}>
                <PlanCard
                  key={"plan-item-card" + index}
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
        {enrollmentForm.plan !== "" && (
          <Grid item xs={12} className={classes.footer}>
            <div style={{ display: "inline-block" }}>
              <Button
                color="primary"
                className={classes.transparentButton}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SelectPlan;
