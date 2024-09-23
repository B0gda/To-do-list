import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TagType = "all" | "none" | "star" | "fire" | "job" | "done";

interface FilterState {
  tag: TagType;
}

const initialState: FilterState = {
  tag: "none",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTagFilter(state, action: PayloadAction<TagType>) {
      state.tag = action.payload;
    },
  },
});

export const { setTagFilter } = filterSlice.actions;
export default filterSlice.reducer;
