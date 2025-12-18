import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import axios from "axios";
import axiosClient from "../api/axiosClient";
import Search from "../components/Search";

export default function Dashboard() {
    const logout = useAuthStore((s) => s.logout);
    const user = useAuthStore((s) => s.user);
    const [appointments, setAppointment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[search,setSearch]=useState("")

    useEffect(()=>{
        const fetchAppointment = async()=>{
            if(!user) return;
            try {
                setLoading(true);
                const res = await axiosClient.get(`/appointment/myappointments?search=${search}`);
                setAppointment(res.data.appointments);
            } catch (err) {
                
                setError(err.response?.data?.message || err.message);
                logout();
            }finally{
                setLoading(false);
            }
        }
        fetchAppointment();
    },[user,search])

    return (
        <div>
            {/* <h1>Dashboard</h1> */}
            
            <div className="d-flex justify-content-end mt-3">
            <div className="col-md-3">
                <Search search={search} setSearch={setSearch} />
            </div>
            </div>
            <h2>Welcome {user?.name}, we care about your health.</h2>
            {loading && <p>Loadin appointment...</p> }
            {error && <p className="text-danger">{error}</p> }

               {!loading && !error && (
                        <table className="table table-success table-striped text-center">
                        <thead>
                            <tr>
                            <th>Date || Time</th>
                            <th>Doctor</th>
                            <th>Symptoms</th>
                            </tr>
                        </thead>
                        <tbody>
                        {appointments.length === 0 && (
                            <tr>
                            <td colSpan="3" className="text-center">No appointments found.</td>
                            </tr>
                        )}

                        {appointments.map((appt) => (
                            <tr key={appt.id} className="text-center">
                            <td>{appt.date} || {appt.time}</td>
                            <td>{appt.doctor}</td>
                            <td>{appt.symptoms}</td>
                            </tr>
                        ))}
                        </tbody>

                        </table>

                )}

        </div>
    );
}
