import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import axios from "axios";
import axiosClient from "../api/axiosClient";

export default function Dashboard() {
    const logout = useAuthStore((s) => s.logout);
    const user = useAuthStore((s) => s.user);
    const [appointments, setAppointment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchAppointment = async()=>{
            if(!user) return;
            try {
                setLoading(true);
                const res = await axiosClient.get(`/appointment/myappointments`);
                console.log(res.data.appointments);
                console.log(res.data.counts);
                setAppointment(res.data.appointments);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            }finally{
                setLoading(false);
            }
        }
        fetchAppointment();
    },[user])

    return (
        <div>
            {/* <h1>Dashboard</h1> */}
            <h2>Welcome {user?.name}</h2>
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
