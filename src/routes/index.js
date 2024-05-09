import HomePage from '../pages/HomePage/HomePage';
import OrderPage from '../pages/OrderPage/OrderPage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage.jsx';
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage.jsx';
import SignInPage from '../pages/SignInPage/SignInPage.jsx';
import ProfilePage from '../pages/Profile/ProfilePage.jsx';
import AdminPage from '../pages/AdminPage/AdminPage.jsx';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
import OrderSuccessPage from '../pages/OrderSuccess/OrderSuccessPage';
import UserOrderPage from '../pages/UserOrderPage/UserOrderPage';
import DetailsOrderPage from '../pages/DetailsOrderPage/DetailsOrderPage';
import AboutPage from '../pages/AboutPage/AboutPage.jsx';
import GuidesPage from '../pages/GuidesPage/GuidesPage';
import SellerPage from '../pages/SellerPage/SellerPage.jsx';
 
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/my-order',
        page: UserOrderPage,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/order-success',
        page: OrderSuccessPage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        // isPrivate: true
    },
    {
        path: '/system/seller',
        page: SellerPage,
        isShowHeader: false,
        // isPrivate: true
    },
    {
        path: '/about',
        page: AboutPage,
        isShowHeader: true
    },
    {
        path: '/guides',
        page: GuidesPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
];
