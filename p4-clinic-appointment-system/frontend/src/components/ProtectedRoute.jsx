import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ children }) {
    const user = useAuthStore((s) => s.user);
    const isAuthLoading = useAuthStore((s) => s.isAuthLoading);

    // Jab tak backend se user load ho raha hai
    if (isAuthLoading) {
        return <p>Loading...</p>;
    }

    // Agar backend ne user nahi diya → login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
