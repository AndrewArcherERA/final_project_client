import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import ConsumerDashboard from "./dashboards/consumer/ConsumerDashboard";
import SupplierDashboard from "./dashboards/supplier/SupplierDashboard";
import EmployeeDashboard from "./dashboards/employee/EmployeeDashboard";
import Suppliers from "./pages/suppliers/Suppliers";
import Inventory from "./pages/inventory/Inventory";
import Products from "./pages/products/Products";

function ProtectedRoute({ user, redirectPath = "/" }) {
    if (!user) return <Navigate to={redirectPath} replace />;

    return <Outlet />;
}

function App() {
    // TODO: pull user.slice from redux store to validate navigation to private routes
    let user = {};

    return (
        <>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route element={<ProtectedRoute user={user} />}>
                    <Route
                        path="/consumerDashboard"
                        element={<ConsumerDashboard />}
                    >
                        <Route
                            index
                            path="inventory"
                            element={<Inventory userType={"consumer"} />}
                        />
                        <Route path={"suppliers"} element={<Suppliers />} />
                    </Route>
                    <Route
                        path="/supplierDashboard"
                        element={<SupplierDashboard />}
                    >
                        <Route path={"products"} element={<Products />} />
                    </Route>
                    <Route path="/employeeDashboard" element={<EmployeeDashboard />}>
                    <Route
                            index
                            path="inventory"
                            element={<Inventory userType={"employee"} />}
                        />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
