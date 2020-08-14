import { createSlice } from "@reduxjs/toolkit";

let id = 0;

const todoReducer = createSlice({
  name: "todos",
  initialState: {
    listTodos: [],
    prevListTodos: [],
    filterBy: "All"
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: id++,
        description: action.payload,
        checked: false,
        date: new Date().toDateString()
      };

      state.listTodos.push(newTodo);
      //state.prevListTodos = state.listTodos;
    },
    checkTodo: (state, action) => {
      for (let i = 0; i < state.listTodos.length; i++) {
        if (state.listTodos[i].id === action.payload.id) {
          state.listTodos[i].checked = action.payload.checked;
          // state.prevListTodos[i].cheched = action.payload.checked;
        }
      }
    },
    removeTodo: (state, action) => {
      state.prevListTodos = [...state.listTodos];

      state.listTodos = state.listTodos.filter(
        (todo) => todo.id !== action.payload
      );
    },
    changeFilter: (state, action) => {
      state.filterBy = action.payload;
    },
    undoDelete: (state, action) => {
      state.listTodos = [...state.prevListTodos];
    }
  }
});

export const selectTodos = (state) => {
  const listTodos = state.todos.listTodos;
  let filter = state.todos.filterBy;

  if (filter === "All") {
    return listTodos;
  }

  filter = filter === "Completed" ? true : false;

  return listTodos.filter((todo) => todo.checked === filter);
};

export const selectTodosStatistics = (state) => {
  let [nb, nbChecked, nbInProgress] = [0, 0, 0];

  for (let todo of state.todos.listTodos) {
    nb++;
    if (todo.checked) {
      nbChecked++;
    } else {
      nbInProgress++;
    }
  }

  return { All: nb, Completed: nbChecked, "In progress": nbInProgress };
};

export const {
  addTodo,
  checkTodo,
  removeTodo,
  changeFilter,
  undoDelete
} = todoReducer.actions;
export default todoReducer.reducer;
