import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import ConsumerDashboard from "./dashboards/consumer/ConsumerDashboard";
import SupplierDashboard from "./dashboards/supplier/SupplierDashboard";
import EmployeeDashboard from "./dashboards/employee/EmployeeDashboard";
import Suppliers from "./pages/suppliers/Suppliers";
import Inventory from "./pages/inventory/Inventory";
import Products from "./pages/products/Products";
import Messages from "./pages/messages/Messages";
import Account from "./pages/account/Account";
import Orders from "./pages/orders/Orders";
import SupplierOrders from "./pages/supplierOrders/SupplierOrders";
import {useSelector} from "react-redux";

function ConsumerProtectedRoute({user, redirectPath = "/"}) {
    if (user.type !== "consumer")
        return <Navigate to={redirectPath} replace/>;

    return <Outlet/>;
}

function SupplierProtectedRoute({user, redirectPath = "/"}) {
    if (user.type !== "supplier")
        return <Navigate to={redirectPath} replace/>;

    return <Outlet/>;
}

function EmployeeProtectedRoute({user, redirectPath = "/"}) {
    if (user.type !== "employee")
        return <Navigate to={redirectPath} replace/>;

    return <Outlet/>;
}

function App() {
    const user = useSelector((state) => state.user);

    return (
        <>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/signUp" element={<SignUp/>}/>

                <Route element={<ConsumerProtectedRoute user={user}/>}>
                    <Route
                        path="/consumerDashboard"
                        element={<ConsumerDashboard/>}
                    >
                        <Route
                            index
                            element={<Inventory userType={user.type}/>}
                        />
                        <Route path={"suppliers"} element={<Suppliers/>}/>
                        <Route path={"orders"} element={<Orders/>}/>
                    </Route>
                </Route>

                <Route element={<SupplierProtectedRoute user={user}/>}>
                    <Route
                        path="/supplierDashboard"
                        element={<SupplierDashboard/>}
                    >
                        <Route index element={<Products/>}/>
                        <Route path={"orders"} element={<SupplierOrders/>}/>
                    </Route>
                </Route>
                <Route element={<EmployeeProtectedRoute user={user}/>}>
                    <Route
                        path="/employeeDashboard"
                        element={<EmployeeDashboard/>}
                    >
                        <Route
                            index
                            element={<Inventory userType={user.type}/>}
                        />
                        <Route path={"orders"} element={<Orders/>}/>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
