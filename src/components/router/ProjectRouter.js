import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";
import Error500 from "../modules/Error500";
import { Navigate } from "react-router-dom";
import AddCategory from "../modules/category/AddCategory";
import CategoryList from "../modules/category/CategoryList";
import Loader from "../partials/miniComponent/Loader";
import CategoryEdit from "../modules/category/CategoryEdit";
import SubCategoryAdd from "../modules/subCategory/SubCategoryAdd";
import SubCategoryList from "../modules/subCategory/SubCategoryList";
import SubCategoryEdit from "../modules/subCategory/SubCategoryEdit";
import BrandAdd from "../modules/brand/BrandAdd";
import BrandList from "../modules/brand/BrandList";
import BrandEdit from "../modules/brand/BrandEdit";
import SupplierAdd from "../modules/suppliers/SupplierAdd";
import SupplierList from "../modules/suppliers/SupplierList";
import SupplierEdit from "../modules/suppliers/SupplierEdit";
import ProductAttributes from "../modules/productAttribute/ProductAttributes";
import AddProduct from "../modules/product/AddProduct";
import AddProductPhoto from "../modules/product/AddProductPhoto";
import ProductList from "../modules/product/ProductList";
import ShopAdd from "../modules/shop/ShopAdd";
import ShopList from "../modules/shop/ShopList";
import ShopEdit from "../modules/shop/ShopEdit";
import AddSalesManager from "../modules/salesManager/AddSalesManager";
import SalesManagerList from "../modules/salesManager/SalesManagerList";
import OrderCreate from "../modules/order/OrderCreate";
import OrderList from "../modules/order/OrderList";
import OrderDetails from "../modules/order/OrderDetails";
import BarCode from "../modules/bar_code/BarCode";
import Report from "../modules/report/Report";
import ProductDetails from "../modules/product/ProductDetails";
import EditSalesManeger from "../modules/salesManager/EditSalesManeger";


const ProjectRouter = (
    {
        path: '/',
        element : <Master/>,
        //loader: <Loader/>,
        children : [
            {
                path: '/dashboard',
                element: <Navigate to="/" />
            },
            {
                path: '/',
                element : <Report/>
            },
            {
                path: '/category',
                element : <CategoryList/>
            },
            {
                path: '/category/create',
                element : <AddCategory/>
            },
            {
                path: '/category/edit/:id',
                element : <CategoryEdit/>
            },
            {
                path: '/sub-category',
                element : <SubCategoryList/>
            },
            {
                path: '/sub-category/create',
                element : <SubCategoryAdd/>
            },
            {
                path: '/sub-category/edit/:id',
                element : <SubCategoryEdit/>
            },
            {
                path: '/brand',
                element : <BrandList/>
            },
            {
                path: '/brand/create',
                element : <BrandAdd/>
            },
            {
                path: '/brand/edit/:id',
                element : <BrandEdit/>
            },
            {
                path: '/supplier',
                element : <SupplierList/>
            },
            {
                path: '/supplier/create',
                element : <SupplierAdd/>
            },
            {
                path: '/supplier/edit/:id',
                element : <SupplierEdit/>
            },
            {
                path: '/product-attributes',
                element : <ProductAttributes />
            },
            {
                path: '/product',
                element : <ProductList/>
            },
            {
                path: '/product/create',
                element : <AddProduct/>
            },
            {
                path: '/product/:id',
                element : <ProductDetails/>
            },
            {
                path: '/product/photo/:id',
                element : <AddProductPhoto/>
            },
            {
                path: '/shop',
                element : <ShopList/>
            },
            {
                path: '/shop/create',
                element : <ShopAdd/>
            },
            {
                path: '/shop/edit/:id',
                element : <ShopEdit/>
            },
            {
                path: '/sales-manager',
                element : <SalesManagerList/>
            },
            {
                path: '/sales-manager/create',
                element : <AddSalesManager/>
            },
            {
                path: '/sales-manager/edit/:id',
                element : <EditSalesManeger/>
            },
            {
                path: '/order',
                element : <OrderList/>
            },
            {
                path: '/order/create',
                element : <OrderCreate/>
            },
            {
                path: '/order/:id',
                element : <OrderDetails/>
            },
            {
                path: '/generate-bar-code',
                element : <BarCode/>
            },
            {
                path: '/report',
                element : <Report/>
            },

            {
                path: '/error-500',
                element : <Error500/>
            }
        ]
    }
    
)

export default ProjectRouter;