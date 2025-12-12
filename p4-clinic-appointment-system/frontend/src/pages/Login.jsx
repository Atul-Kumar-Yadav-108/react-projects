import { useState } from "react";
import useAuthStore from "../store/authStore";
import { NavLink } from "react-router-dom";

export default function Login() {
    const login = useAuthStore((s) => s.login);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            setMsg("Login Successful!");
            window.location.href = "/dashboard";
        } catch (err) {
            setMsg(err.response?.data?.message || "Error");
        }
    };

    return (
        <>

        <div className="container"   style={{
                display: "flex",
                flexDirection : 'column',
                // backgroundColor:'#4a4a4a',
                justifyContent: "center",
                alignItems: "center",
                minHeight: "90vh", // full viewport height
                textAlign: "center", // optional: centers text inside
                padding: "1rem" // optional: spacing on mobile
            }}
        >
           <div className="container bg-dark text-light rounded col-md-5">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button className="btn btn-primary" type="submit">Login</button>
                </form>
                <p>{msg}</p>
                <NavLink to='/register' >Already account ? Register </NavLink>
           </div>
        </div>
        </>
    );
}
