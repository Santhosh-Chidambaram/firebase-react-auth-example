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
    maxWidth: "1200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 130,
    [theme.breakpoints.down("xs")]: {
      height: 100,
    },
  },
  paper: {
    boxShadow: "none",
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

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
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            label="Choose Plan"
            disabled={currentIndex > 2}
            style={{
              margin: "0px 15px",
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Student Roster"
            style={{
              margin: "0px 15px",
            }}
            disabled={currentIndex === 0 || currentIndex > 2}
            {...a11yProps(1)}
          />
          <Tab
            label="Teacher Roster"
            style={{
              margin: "0px 15px",
            }}
            disabled={
              currentIndex === 1 || currentIndex === 0 || currentIndex > 2
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </Paper>
    </Container>
  );
}
