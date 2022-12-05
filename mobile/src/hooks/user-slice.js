import {createSlice} from '@reduxjs/toolkit';

const initialValues = {
  id: null,
  email: null,
  name: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialValues,
  reducers: {
    reducerSetUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});
export const {reducerSetUser} = userSlice.actions;
export default userSlice.reducer;
