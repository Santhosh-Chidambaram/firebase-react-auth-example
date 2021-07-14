import { Button } from "@material-ui/core";
import React from "react";

const BackButton = ({ onClick }) => {
  return (
    <Button variant="text" style={{ color: "red" }} onClick={onClick}>
      Go Back
    </Button>
  );
};

export default BackButton;
