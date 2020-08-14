import React, { useState } from "react";

import {
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
  Popover
} from "@material-ui/core";

import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

export function RowDisplay(props) {
  const [isDone, setIsDone] = useState(props.isDone);

  const onDelete = props.onDelete;
  const onIsDone = props.onIsDone;
  const text = props.text;
  const date = props.date;

  return (
    <Paper>
      <Grid container alignItems="center">
        <Grid item xs={2} sm={1}>
          <MarkAsDoneComponent
            isDone={isDone}
            onCheck={() => {
              setIsDone(!isDone);
              onIsDone(!isDone);
            }}
          />
        </Grid>
        <Grid item xs={6} sm={9}>
          <EditableTextComponent initialText={text} isDone={isDone} />
        </Grid>
        <Grid container item xs={4} sm={2} justify="space-around">
          <IconButton
            onClick={() => {
              onDelete();
            }}
          >
            <DeleteRoundedIcon color="primary" />
          </IconButton>
          <ShowInfoComponent>
            <Typography variant="body2">
              <strong>Created:</strong>
            </Typography>
            <Typography variant="body2">{date}</Typography>
          </ShowInfoComponent>
        </Grid>
      </Grid>
    </Paper>
  );
}

export function MarkAsDoneComponent(props) {
  const [isDone, setIsDone] = useState(props.isDone);
  const onCheck = props.onCheck;

  return (
    <IconButton
      onClick={() => {
        onCheck(!isDone);
        setIsDone(!isDone);
      }}
    >
      {isDone ? (
        <CheckCircleOutlineRoundedIcon color="primary" />
      ) : (
        <RadioButtonUncheckedRoundedIcon color="primary" />
      )}
    </IconButton>
  );
}

export function EditableTextComponent(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState(props.initialText);
  const isDone = props.isDone;

  const error = !Boolean(text);
  const errorMessage = error ? "Oups, this field can not be empty" : "";

  const textInput = (
    <TextField
      error={error}
      helperText={errorMessage}
      value={text}
      onClick={() => {
        setIsEditable(true);
      }}
      onChange={({ target }) => setText(target.value)}
      onBlur={() => {
        setIsEditable(false);
      }}
    />
  );
  const textDisplay = (
    <Typography
      variant="body1"
      component="div"
      TextEncoderStream
      onClick={() => {
        setIsEditable(true);
      }}
    >
      {isDone ? <del>{text}</del> : text}
    </Typography>
  );

  return isEditable || error ? textInput : textDisplay;
}

export function ShowInfoComponent(props) {
  const [showInfo, setShowInfo] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <frameElement>
      <IconButton
        onClick={(e) => {
          setShowInfo(!showInfo);
          setAnchorEl(e.currentTarget);
        }}
      >
        <HelpOutlineRoundedIcon color="primary" />
      </IconButton>
      <Popover
        open={showInfo}
        anchorEl={anchorEl}
        onClose={() => {
          setShowInfo(false);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        {props.children}
      </Popover>
    </frameElement>
  );
}
