// slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../Components/Api/getProducts'; // Import the API call

const initialState = {

    products: [],
    status: 'idle',
    error: null

};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const products = await getProducts();
        console.log('object', products);
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        searchProducts: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredProducts = state.products.filter((product) =>
                product.title.toLowerCase().includes(searchTerm)
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { filterProducts, searchProducts } = productSlice.actions;

export default productSlice.reducer;
