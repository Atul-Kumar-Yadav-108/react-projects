import { useState } from "react";
import useAuthStore from "../store/authStore";
import { NavLink } from "react-router-dom";

export default function Register() {
    const register = useAuthStore((s) => s.register);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            setMsg("Registration Successful!");
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
           <div className="container form-deco secondary primary rounded col-md-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
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
                <button className="btn btn-primary" type="submit">Register</button>
            </form>
            <p>{msg}</p>
            <NavLink to='/login' >Already account ? Login </NavLink>
            </div>
            </div>
        </>
    );
}
