import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  city: '',
  access_token: '',
  id: '',
  isAdmin: false,
  isSeller: false,
  refreshToken: ''
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
        const { name= '', email= '', access_token= '', phone= '', address= '', avatar= '', city = '', _id = '', isAdmin,isSeller, refreshToken = ''} = action.payload
        state.name = name;
        state.email = email;
        state.phone = phone;
        state.address = address;
        state.avatar = avatar;
        state.city = city;
        state.id = _id;
        state.access_token = access_token;
        state.isAdmin = isAdmin;
        state.isSeller = isSeller;
        state.refreshToken = refreshToken;
    },
    resetUser: (state, action) => {
      state.name = '';
      state.email = '';
      state.phone = '';
        state.address = '';
        state.avatar = '';
        state.city = '';
        state.id = '';
      state.access_token = '';
      state.isAdmin = false;
      state.isSeller = false;
      state.refreshToken = ''
  },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer