import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../store";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    token: null as string | null,
    errors: {
      name: false,
      email: false,
      password: false,
      confirm_password: false,
    },
  },
  reducers: {
    resetFields(state) {
      state.name = "";
      state.email = "";
      state.password = "";
      state.confirm_password = "";
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    deleteToken(state) {
      state.token = null;
    },
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

type AsyncThunkConfig = {
  state?: RootState;
  dispatch?: AppDispatch;
  rejectValue?: string;
};

export const getAuthToken: AsyncThunk<undefined, void, AsyncThunkConfig> =
  createAsyncThunk(
    "form/getAuthToken",
    async function (_, { rejectWithValue, dispatch, getState }) {
      try {
        const { form } = getState() as RootState;

        if (Object.values(form.errors).some((v) => v === true)) return;

        const response = await fetch("https://reqres.in/api/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: "eve.holt@reqres.in",
            password: "pistol",
          }),
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setToken(data.token));
          dispatch(resetFields());
        }
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

export const {
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  validateForm,
  setToken,
  deleteToken,
  resetFields,
} = formSlice.actions;
export default formSlice.reducer;
