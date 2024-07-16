import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    errors: {
      name: false,
      email: false,
      password: false,
      confirm_password: false,
    },
  },
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setConfirmPassword(state, action: PayloadAction<string>) {
      state.confirm_password = action.payload;
    },
    validateForm(state) {
      if (state.name) {
        state.errors.name = false;
      } else {
        state.errors.name = true;
      }

      if (state.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        state.errors.email = false;
      } else {
        state.errors.email = true;
      }

      if (state.password.length >= 6) {
        state.errors.password = false;
      } else {
        state.errors.password = true;
      }

      if (state.confirm_password === state.password) {
        state.errors.confirm_password = false;
      } else {
        state.errors.confirm_password = true;
      }
    },
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  validateForm,
} = formSlice.actions;
export default formSlice.reducer;
