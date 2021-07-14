import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RouteProivder from "./routes/RouteProvider";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./app.css";
const primaryTheme = createTheme({
  palette: {
    primary: {
      main: "#ED681D",
    },
    secondary: {
      main: "#4285f4",
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
