import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RouteProivder from "./routes/RouteProvider";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const primaryTheme = createTheme({
  palette: {
    primary: {
      main: "#ED681D",
    },
  },
});

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={primaryTheme}>
          <RouteProivder />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
