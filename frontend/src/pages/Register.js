import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [form,setForm] = useState({name:"",email:"",password:""});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(form)).unwrap();
      alert("Registered. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err?.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
          <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
          <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
          <button type="submit">Register</button>
        </form>
        <p style={{textAlign:"center", marginTop:10}}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
