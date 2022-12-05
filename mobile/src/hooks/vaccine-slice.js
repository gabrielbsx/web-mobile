import {createSlice} from '@reduxjs/toolkit';

const initialValues = {
  id: null,
};

export const vaccineSlice = createSlice({
  name: 'vaccine',
  initialState: initialValues,
  reducers: {
    reducerSetVaccine: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

export const {reducerSetVaccine} = vaccineSlice.actions;

export default vaccineSlice.reducer;
