import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { INotification, UI } from "../interfaces";
import { AppState } from "../store";

const initialState: UI = {
  notifications: [],
  active: false,
};

interface NewNotification {
  payload: INotification;
}

interface RemoveNotification {
  payload: string;
}

const uiSlice = createSlice({
  name: "[UI]",
  initialState,
  reducers: {
    newNotification: (state: UI, action: NewNotification) => {
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotification: (state: UI, action: RemoveNotification) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    setActive: (state: UI, action) => {
      state.active = action.payload;
    },
  },
});

export { uiSlice };

// Actions
export const { newNotification, removeNotification, setActive } =
  uiSlice.actions;

// Select to access to the store
export const selectUI = (state: AppState) => state.ui;

export default uiSlice.reducer;
