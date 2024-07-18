import ApiAuthorzationRoutes from '../components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "../components/Counter";
import { FetchData } from "../components/FetchData";
import { Home } from "../components/Home";
import UserComponent from '../components/UserAdmin/UserComponent';
import ProductComponent from '../components/ProductAdmin/ProductComponent';
import CategoriesComponent from '../components/CategoriesComponent';
import BlogPostComponent from '../components/BlogPostComponent';
import OrderComponent from '../components/OrderComponent';
import BlogComponent from '../components/BlogComponent';
import CouponComponent from '../components/CouponComponent';
import Chat from '../components/Chat';
import AdminLayout from '../Layouts/AdminLayout';
import DefaultLayout from '../Layouts/DefaultLayout';
import RoutePath from './RoutePath';
import DashBoard from '../components/DashBoard';
import HomePage from '../views/HomePage';
import Product from '../views/Product';
import Blog from '../views/Blog';
import Contact from '../views/Contact';
import ProductInfo from '../views/ProductInfo';
import CardProduct from '../views/CardProduct';
import LikeProduct from '../views/LikeProduct';
import Checkout from '../views/Checkout';
import BlogDetail from '../views/BlogDetail';
import QR from '../views/QR';
const AppRoutes = [
  {
    index: true,
    element: <HomePage />,
    layout : DefaultLayout
  },
  {
    path: '/counter',
    element: <Counter />,
    layout: DefaultLayout
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />,
    layout: AdminLayout
  },
  {
    path: RoutePath.USER,
    requireAuth: true,
    element: <UserComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.PRODUCT,
    requireAuth: true,
    element: <ProductComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.CATEGORIES,
    requireAuth: true,
    element: <CategoriesComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.BLOGPOST,
    requireAuth: true,
    element: <BlogPostComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.ORDER,
    requireAuth: true,
    element: <OrderComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.BLOG,
    requireAuth: true,
    element: <BlogComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.COUPON,
    requireAuth: true,
    element: <CouponComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.CHAT,
    requireAuth: true,
    element: <Chat />,
    layout: AdminLayout
  },
  {
    path: RoutePath.DASHBOARD,
    requireAuth: true,
    element: <DashBoard />,
    layout: AdminLayout
  },
  {
    path: RoutePath.ProductPage,
    element: <Product />,
    layout: DefaultLayout
  },
  {
    path: RoutePath.BlogPage,
    element: <Blog />,
    layout: DefaultLayout
  },
  {
    path: RoutePath.CONTACTPage,
    element: <Contact />,
    layout: DefaultLayout
  },
  {
    path: RoutePath.PRODUCTINFO,
    element: <ProductInfo />,
    layout: DefaultLayout
  },
  {
    path: RoutePath.CARDPRODUCT,
    element: <CardProduct />,
    layout: DefaultLayout
  },
  {
    path: RoutePath.FAVORITEPRODUCT,
    element: <LikeProduct />,
    layout: DefaultLayout
  },
  {
    path: RoutePath.CHECKOUT,
    element: <Checkout />,
    layout: DefaultLayout
  },
  {
    path: RoutePath.BLOGDETAIL,
    element: <BlogDetail />,
    layout: DefaultLayout
  },
  ,
  {
    path: RoutePath.QRCODE,
    element: <QR />,
    layout: DefaultLayout
  },

 

  ...ApiAuthorzationRoutes
];

export default AppRoutes;
