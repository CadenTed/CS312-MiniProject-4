import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Signin.css";

function Signin() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevValue) => {
      switch (name) {
        case "username":
          return {
            username: value,
            password: prevValue.password,
          };
        case "password":
          return {
            username: prevValue.username,
            password: value,
          };
        default:
          return prevValue;
      }
    });
  }

  return (
    <main className="form-signin w-100 m-auto">
      <form action="/signin-submit" method="post">
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
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-body-secondary">
          &copy; Caden Tedeschi 2024
        </p>
      </form>
    </main>
  );
}

export default Signin;
