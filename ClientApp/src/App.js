import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import "./custom.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (

            <Provider store={store}>
                <CartProvider>
                <ToastContainer
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const {
                            element,
                            requireAuth,
                            layout: Layout = React.Fragment,
                            ...rest
                        } = route;
                        const RouteElement = requireAuth ? (
                            <AuthorizeRoute
                                {...rest}
                                element={<Layout>{element}</Layout>}
                            />
                        ) : (
                            <Layout>{element}</Layout>
                        );
                        return <Route key={index} {...rest} element={RouteElement} />;
                    })}
                    </Routes>
                </CartProvider>
            </Provider>
        );
    }
}
