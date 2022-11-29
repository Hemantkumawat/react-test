import { createSlice } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
// utils
import axios from 'axios';

import { dispatch } from '../store';
axios.defaults.baseURL = "https://63553cf1da523ceadcfd4ca1.mockapi.io/api/v1/";
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  user: null,
  sortBy: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // GET USER
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },

    //  SORT & FILTER USERS
    sortByUsers(state, action) {
      state.sortBy = action.payload;
    },

    filterUsers(state, action) {
      state.filters.email = action.payload.email;
    },

    addUser(state, action) {
      const user = action.payload;
      const isEmptyUser = state.user.length === 0;

      if (isEmptyUser) {
        state.user = [...state.user, user];
      } else {
        state.user = state.user.map((_user) => {
          const isExisted = _user.id === user.id;
          if (isExisted) {
            return {
              ..._user
            };
          }
          return _user;
        });
      }
      state.user = uniqBy([...state.user, user], 'id');
    },


    resetUser(state) {
      state.user = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  resetUser,
  sortByUsers,
  filterUsers,
} = slice.actions;

// ----------------------------------------------------------------------

export function getUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('users');
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------


export function updateUser(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`users/${data.id}`, {
        data: data,
      });
      console.log("response.data", response.data);
      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteUser(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`users/${id}`);
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUser(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`users/${id}`);
      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  }
}
