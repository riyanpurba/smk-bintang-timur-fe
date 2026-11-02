
import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from "../features/teachers/teachersSlice";
import majorsReducer from "../features/majors/majorsSlice";

export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    majors: majorsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
