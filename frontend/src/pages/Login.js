import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();
      navigate("/dashboard");
    } catch (err) {
      alert(err?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        <form onSubmit={submit}>
          <input type="email" placeholder="Email" value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})} required />
          <input type="password" placeholder="Password" value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})} required />
          <button type="submit">Login</button>
        </form>
        <p style={{textAlign:"center", marginTop:10}}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
