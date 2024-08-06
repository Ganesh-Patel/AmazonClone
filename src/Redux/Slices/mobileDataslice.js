import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching data
export const fetchMobileData = createAsyncThunk(
    'mobileData/fetchMobileData',
    async ({ query = 'Phone', page = '1', country = 'US', sort_by = 'RELEVANCE', product_condition = 'ALL' }, { rejectWithValue }) => {
        const makeRequest = async (retries = 3, delay = 1000) => {
            try {
                const response = await axios.get('https://real-time-amazon-data.p.rapidapi.com/search', {
                    params: {
                        query: 'Phone',
                        page: '1',
                        country: 'US',
                        sort_by: 'RELEVANCE',
                        product_condition: 'ALL',
                    },
                    headers: {
                        'x-rapidapi-key': 'a5fd3e080emshd7a183ebbe31cccp13319djsn2c76851ffcde',
                        'x-rapidapi-host': 'amazon-product-data6.p.rapidapi.com',
                    },
                });
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    if (retries > 0) {
                        await new Promise(resolve => setTimeout(resolve, delay));
                        return makeRequest(retries - 1, delay * 2);
                    }
                    return rejectWithValue('Too many requests. Please try again later.');
                }
                return rejectWithValue(error.message || 'An unknown error occurred.');
            }
        };

        return makeRequest();
    }
);

const initialState = {
    data: null,
    url: null,
    method: 'idle',
    error: null,
    status: 'idle',
};

const mobileDataSlice = createSlice({
    name: 'mobileData',
    initialState,
    reducers: {
        setUrl(state, action) {
            state.url = action.payload;
        },
        setMethod(state, action) {
            state.method = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMobileData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMobileData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchMobileData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setUrl, setMethod, setError } = mobileDataSlice.actions;

export default mobileDataSlice.reducer;
