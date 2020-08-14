import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Fade } from "react-animation-components";
import { IconButton } from "@material-ui/core";
import UndoRoundedIcon from "@material-ui/icons/UndoRounded";

import {
  addTodo,
  checkTodo,
  removeTodo,
  changeFilter,
  undoDelete
} from "./TodoAppSlice";
import { selectTodos, selectTodosStatistics } from "./TodoAppSlice";

import {
  Grid,
  ButtonGroup,
  Button,
  Typography,
  Snackbar
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { RowAdd } from "./RowAdd";
import { RowDisplay } from "./RowDisplay";

export default function TodoApp(props) {
  const todosList = useSelector(selectTodos);
  const dispatch = useDispatch();

  const [showAddTodoFeedback, setShowAddTodoFeedback] = useState(false);
  const [showUndoDeleteFeedback, setShowUndoDeleteFeedback] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RowAdd
          addTodo={(text) => {
            dispatch(addTodo(text));
            setShowAddTodoFeedback(true);
          }}
        />
      </Grid>
      <Grid container item xs={12} justify="space-between" alignItems="center">
        <Grid item xs={0}>
          <Typography variant="body1" color="primary"></Typography>
        </Grid>
        <Grid item>
          <FilterComponent />
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={1}>
        {todosList.map((todo) => (
          <Grid item xs={12}>
            <Fade in delay={0} duration={300}>
              <RowDisplay
                key={todo.id}
                text={todo.description}
                isDone={todo.checked}
                date={todo.date}
                onDelete={() => {
                  dispatch(removeTodo(todo.id));
                  setShowUndoDeleteFeedback(true);
                }}
                onIsDone={(isDone) => {
                  const payload = {
                    id: todo.id,
                    checked: isDone
                  };
                  dispatch(checkTodo(payload));
                }}
              />
            </Fade>
          </Grid>
        ))}
      </Grid>
      <AddTodoFeedback
        showFeedback={showAddTodoFeedback}
        onCloseFeedback={() => setShowAddTodoFeedback(false)}
      />
      <UndoDeleteFeedback
        showFeedback={showUndoDeleteFeedback}
        onCloseFeedback={() => setShowUndoDeleteFeedback(false)}
        undoDelete={() => dispatch(undoDelete())}
      />
    </Grid>
  );
}

export function FilterComponent(props) {
  const filterItems = ["All", "Completed", "In progress"];
  const [selectedItem, setSelectedItem] = useState("All");

  const statistics = useSelector(selectTodosStatistics);
  const dispatch = useDispatch();

  return (
    <ButtonGroup
      style={{ marginRight: "9px" }}
      color="primary"
      size="small"
      aria-label="small outlined button group"
    >
      {filterItems.map((item) => (
        <Button
          disabled={selectedItem === item}
          onClick={() => {
            setSelectedItem(item);
            dispatch(changeFilter(item));
          }}
        >
          {`${item} (${statistics[item]})`}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export function AddTodoFeedback(props) {
  const showFeedback = props.showFeedback;
  const onCloseFeedback = props.onCloseFeedback;

  return (
    <Snackbar
      open={showFeedback}
      autoHideDuration={2000}
      onClose={() => onCloseFeedback()}
    >
      <Alert variant="filled" severity="info">
        Todo added successfully!
      </Alert>
    </Snackbar>
  );
}

export function UndoDeleteFeedback(props) {
  const showFeedback = props.showFeedback;
  const onCloseFeedback = props.onCloseFeedback;
  const undoDelete = props.undoDelete;

  return (
    <Snackbar
      open={showFeedback}
      autoHideDuration={4000}
      onClose={() => onCloseFeedback()}
    >
      <Alert variant="filled" severity="warning">
        <AlertTitle>
          <strong>Todo deleted!</strong>
        </AlertTitle>
        <Typography>
          You still can undo this action
          <IconButton onClick={() => undoDelete()}>
            <UndoRoundedIcon />
          </IconButton>
        </Typography>
      </Alert>
    </Snackbar>
  );
}
