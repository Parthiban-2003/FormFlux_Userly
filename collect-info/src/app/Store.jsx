import { configureStore } from '@reduxjs/toolkit';
import formSlices from '../slices/formSlices';

export const Store = configureStore({
    reducer: {
        form: formSlices,
    }
});