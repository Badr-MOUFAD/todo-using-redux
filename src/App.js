import React from "react";

import { Grid } from "@material-ui/core";

import "./styles.css";
//import "bootstrap/dist/css/bootstrap.min.css";

import TodoApp from "./TodoWithRedux/TodoAppView";

export default function App() {
  return (
    <Grid container>
      <Grid item xs={0} sm={3} />
      <Grid item xs={12} sm={6}>
        <TodoApp />
      </Grid>
      <Grid item xs={0} sm={3} />
    </Grid>
  );
}
