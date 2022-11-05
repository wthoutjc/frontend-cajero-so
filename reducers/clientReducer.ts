import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import { IClient } from "../interfaces";
import { AppState } from "../store";

const initialState: {
  clients: IClient[];
} = {
  clients: [],
};

const clientSlice = createSlice({
  name: "[CLIENT]",
  initialState,
  reducers: {
    addClient: (state, action) => {
      state.clients = [...state.clients, action.payload];
    },
    removeClient: (state, action) => {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload
      );
    },
  },
});

export { clientSlice };

// Actions
export const { addClient, removeClient } = clientSlice.actions;

// Selector to access to the store
export const selectClient = (state: AppState) => state.client;

export default clientSlice.reducer;
