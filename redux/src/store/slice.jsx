import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "reduce",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      const { name, email, password, id } = action.payload;
      state.items.push({
        id: id,
        name: name,
        email: email,
        password: password,
      });
    },

    deleteItems: (state, action) => {
      state.items = state.items.filter(stat => stat.id != action.payload.id);
    },

    updateItems: (state, action) => {
      state.items.map(stat => {
        if (stat.id == action.payload.id) {
          const { name, email, password } = action.payload;
          (stat.name = name), (stat.email = email), (stat.password = password);
        }
      });
    },
  },
});

export const { addItems, deleteItems, updateItems } = Slice.actions;

export default Slice.reducer;
