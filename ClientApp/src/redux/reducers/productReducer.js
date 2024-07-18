const initialState = {
    loading: false,
    loadingProducts: false,
    loadingUpdate: false,
    products: [],
    error: null,
    totalPages: 0
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST':
            return { ...state, loading: true, loadingProducts: true, error: null };
        case 'FETCH_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                loadingProducts: false,
                products: action.payload.results,
                totalPages: action.payload.totalPages
            };
        case 'FETCH_PRODUCTS_FAILURE':
            return { ...state, loading: false, loadingProducts: false, error: action.payload };
        case 'DELETE_PRODUCT_REQUEST':
        case 'UPDATE_PRODUCT_STATUS_REQUEST':
        case 'SAVE_PRODUCT_REQUEST':
            return { ...state, loadingUpdate: true, error: null };
        case 'DELETE_PRODUCT_SUCCESS':
            return {
                ...state,
                loadingUpdate: false,
                products: state.products.filter(product => product.id !== action.payload)
            };
        case 'UPDATE_PRODUCT_STATUS_SUCCESS':
            return {
                ...state,
                loadingUpdate: false,
                products: state.products.map(product =>
                    product.id === action.payload.productId ? { ...product, status: action.payload.status } : product
                )
            };
        case 'SAVE_PRODUCT_SUCCESS':
            return {
                ...state,
                loadingUpdate: false,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                )
            };
        case 'DELETE_PRODUCT_FAILURE':
        case 'UPDATE_PRODUCT_STATUS_FAILURE':
        case 'SAVE_PRODUCT_FAILURE':
            return { ...state, loadingUpdate: false, error: action.payload };
        default:
            return state;
    }
};

export default productReducer;
