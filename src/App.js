import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import ConsumerDashboard from "./dashboards/consumer/ConsumerDashboard";
import SupplierDashboard from "./dashboards/supplier/SupplierDashboard";
import AdminDashboard from "./dashboards/admin/AdminDashboard";

function ProtectedRoute({ user, redirectPath = "/" }) {
    if (!user) return <Navigate to={redirectPath} replace />;

    return <Outlet />;
}

function App() {
  // TODO: pull user.slice from redux store to validate navigation to private routes
  let user = undefined;

    return (
        <>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route element={<ProtectedRoute user={user} />}>
                    <Route
                        path="/consumerDashboard"
                        element={<ConsumerDashboard />}
                    />
                    <Route
                        path="/supplierDashboard"
                        element={<SupplierDashboard />}
                    />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
