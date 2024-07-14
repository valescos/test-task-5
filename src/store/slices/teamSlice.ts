import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AsyncThunk } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    team: [],
  },
  reducers: {
    setTeam(state, action) {
      console.log(action);
      state.team = action.payload.data;
    },
  },
});

export const fetchTeam: AsyncThunk<undefined, void, AsyncThunkConfig> =
  createAsyncThunk(
    "team/fetchTeam",
    async function (_, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch("https://reqres.in/api/users?per_page=12");
        if (response.ok) {
          const data = await response.json();
          dispatch(setTeam(data));
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const { setTeam } = teamSlice.actions;

export default teamSlice.reducer;
