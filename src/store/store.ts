import { configureStore } from "@reduxjs/toolkit";
import { notesApi } from "@api/notesApi";
import themeReducer from "@store/themeSlice";
import filterReducer from "@store/filterSlice";

export const store = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
    theme: themeReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
