import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCategory: "Все категории"
};

const categoryFilterSlice = createSlice({
    name: 'categoryFilter',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        resetCategory: (state) => {
            state.selectedCategory = initialState.selectedCategory;
        }
    }
});

export const { setCategory, resetCategory } = categoryFilterSlice.actions;
export default categoryFilterSlice.reducer;