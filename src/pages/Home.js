import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { useAuth } from "../context/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getEnrolledDocument } from "./../firebase/index";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Home = (props) => {
  const { currentUser, logout, isUserEnrolled } = useAuth();
  const {
    email = "",
    firstName = "",
    lastName = "",
    photoURL = "",
    uid,
  } = currentUser;
  const classes = useStyles();
  const defaultAvatar =
    "https://yorktonrentals.com/wp-content/uploads/2017/06/usericon.png";

  useEffect(() => {
    if (uid) {
      (async () => {
        const isEnrolled = await getEnrolledDocument(uid);
        if (!isEnrolled) {
          props.history.replace("/enroll");
        }
      })();
    }
  }, [uid]);

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={photoURL ? photoURL : defaultAvatar}
            />
            <div>
              <div>
                <strong>email</strong> : {email}
              </div>
              <div>
                <strong>First Name</strong> : {firstName}
              </div>
              <div>
                <strong>Last Name</strong> : {lastName}
              </div>
            </div>
            <div className="w-100 text-center mt-2">
              <Button
                variant="contained"
                onClick={async () => {
                  await logout();
                }}
              >
                Log Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
