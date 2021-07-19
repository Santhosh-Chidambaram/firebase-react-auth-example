import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import { useEnrollContext } from "../context/EnrollContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "800px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 100,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

export default function HeaderTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { currentIndex, setCurrentIndex } = useEnrollContext();
  console.log(currentIndex);
  const handleChange = (event, newValue) => {
    if (currentIndex < 3) {
      setCurrentIndex(newValue);
    }
  };

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Tabs
          value={currentIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Choose Plan" disabled={currentIndex > 2} />
          <Tab
            label="Upload Student Roster"
            disabled={currentIndex === 0 || currentIndex > 2}
          />
          <Tab
            label="Upload Teacher Roster"
            disabled={
              currentIndex === 1 || currentIndex === 0 || currentIndex > 2
            }
          />
          <Tab label="Finalize Page" disabled={currentIndex < 2} />
        </Tabs>
      </Paper>
    </Container>
  );
}
