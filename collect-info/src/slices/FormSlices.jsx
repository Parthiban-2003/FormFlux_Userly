import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || []
};

const formSlices = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.users.push(action.payload);
            localStorage.setItem('users', JSON.stringify(state.users));
        },

        deleteUsers: (state, action) => {
            state.users = state.users.filter(item => item.id !== action.payload);
            localStorage.setItem('users', JSON.stringify(state.users));
        },

        updateUsers: (state, action) => {
            const Index = state.users.findIndex(item => item.id === action.payload.id);
            state.users[Index] = action.payload;
            localStorage.setItem('users', JSON.stringify(state.users));
        }
    }
});

export const { addUsers, deleteUsers, updateUsers } = formSlices.actions;
export default formSlices.reducer;