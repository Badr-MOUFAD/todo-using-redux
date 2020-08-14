import React, { useState } from "react";

import { InputBase, Paper, Grid, Fab } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

export function RowAdd(props) {
  const [text, setText] = useState("");
  const addTodo = props.addTodo;

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={10} sm={11}>
        <Paper>
          <InputBase
            placeholder="Write your plan, then add a todo"
            style={{ marginLeft: "10px", height: 50 }}
            value={text}
            onChange={({ target }) => setText(target.value)}
            fullWidth
          />
        </Paper>
      </Grid>
      <Grid item xs={2} sm={1}>
        <Fab
          color="primary"
          size="medium"
          onClick={() => {
            if (!text) {
              return;
            }
            addTodo(text);
            setText("");
          }}
        >
          <AddIcon />
        </Fab>
      </Grid>
    </Grid>
  );
}
