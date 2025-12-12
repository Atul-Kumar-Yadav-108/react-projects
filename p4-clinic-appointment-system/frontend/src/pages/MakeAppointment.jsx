import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const MakeAppointment = () => {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // important!

    try {
      await axiosClient.post("/appointment/create", {
        doctor,
        date,
        time,
        symptoms,
      });

      setMsg("Appointment Booked Successfully!");

      // navigate after 1 sec OR immediately
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <div className="container bg-dark text-light rounded col-md-5">
          <h2>Make Appointment</h2>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Doctor"
              className="form-control"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />
            <br />

            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />

            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <br />

            <input
              type="text"
              placeholder="Symptoms"
              className="form-control"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <br />

            <button className="btn btn-primary" type="submit">
              Book appointment
            </button>
          </form>

          <p className="mt-2">{msg}</p>
        </div>
      </div>
    </>
  );
};

export default MakeAppointment;
