import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Signin.css";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevValue) => {
      switch (name) {
        case "username":
          return {
            username: value,
            password: prevValue.password,
            repeatPassword: prevValue.repeatPassword,
          };
        case "password":
          return {
            username: prevValue.username,
            password: value,
            repeatPassword: prevValue.repeatPassword,
          };
        case "repeatPassword":
          return {
            username: prevValue.username,
            password: prevValue.password,
            repeatPassword: value,
          };
        default:
          return prevValue;
      }
    });
  }

  const onSignup = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          repeatPassword: form.repeatPassword,
        }),
      });
      if (!response.ok) {
        if (response.status === 400) {
          alert("Passwords do not match!");
        }

        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form>
        <div className="header-container w-100 m-auto">
          <img
            className="mb-4"
            src={`${process.env.PUBLIC_URL}/journal-bookmark-fill.svg`}
            alt=""
            width="72"
            height="57"
          />
          <h1>BlogSpace</h1>
        </div>
        <h1 className="h3 mb-3 fw-normal">Please sign up!</h1>
        <div className="form-floating">
          <input
            onChange={handleChange}
            className="form-control"
            id="floatingInput"
            placeholder="Username"
            name="username"
            value={form.username}
            required
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={form.password}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating">
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            id="repeatPassword"
            placeholder="Repeat Password"
            name="repeatPassword"
            value={form.repeatPassword}
            required
          />
          <label htmlFor="repeatPassword">Repeat Password</label>
        </div>
        Already have an account? Sign in <Link to="/signin">here</Link>
        <button
          onClick={onSignup}
          className="btn btn-primary w-100 py-2"
          type="submit"
        >
          Sign up
        </button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2024</p>
      </form>
    </main>
  );
}

export default Signup;
