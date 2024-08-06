
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
export const fetchCategoryList = createAsyncThunk(
  'categories/fetchCategoryList',
  async (country = 'US', { rejectWithValue }) => {
    try {
      const response = await axios.get('https://real-time-amazon-data.p.rapidapi.com/product-category-list', {
        params: { country },
        headers: {
          'x-rapidapi-key': 'a5fd3e080emshd7a183ebbe31cccp13319djsn2c76851ffcde',
          'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
        },
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'An unknown error occurred.');
    }
  }
);
