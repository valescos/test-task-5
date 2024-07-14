import { configureStore } from "@reduxjs/toolkit";
import teamSlice from "./slices/teamSlice";

export default configureStore({
  reducer: {
    team: teamSlice,
  },
});
