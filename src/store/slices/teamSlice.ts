import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../store";

import { TeamMember } from "../../types";

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    team: [] as TeamMember[],
    limit: 4,
    current_page: 1,
  },
  reducers: {
    increaseLimit(state, action: PayloadAction<number>) {
      state.limit += action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.current_page = action.payload;
    },
    setTeam(state, action: PayloadAction<{ data: TeamMember[] }>) {
      state.team = action.payload.data.map((i) => {
        return {
          ...i,
          isLiked: false,
        };
      });
    },
    toggleLike(state, action: PayloadAction<number>) {
      state.team = state.team.map((i) => {
        if (i.id === action.payload) {
          return {
            ...i,
            isLiked: !i.isLiked,
          };
        } else {
          return i;
        }
      });
    },
  },
});

type AsyncThunkConfig = {
  state?: RootState;
  dispatch?: AppDispatch;
  rejectValue?: string;
};

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
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

export const { setTeam, toggleLike, increaseLimit, setCurrentPage } =
  teamSlice.actions;

export default teamSlice.reducer;
