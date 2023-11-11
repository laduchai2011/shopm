import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentNotify: null,
    resultUser: null
}

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setCurrentNotify: (state, action) => {
            state.currentNotify = action.payload.notification;
            state.resultUser = action.payload.resultUser;
        }
    }
})

export const { setCurrentNotify } = notificationsSlice.actions;

const notificationsReducer = notificationsSlice.reducer;

export default notificationsReducer;