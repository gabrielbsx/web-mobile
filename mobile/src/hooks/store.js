import {configureStore} from '@reduxjs/toolkit';
import userSlice from './user-slice';
import vaccineSlice from './vaccine-slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    vaccine: vaccineSlice,
  },
});
