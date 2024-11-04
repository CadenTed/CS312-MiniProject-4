import React from "react";
import { Link } from "react-router-dom";

function Header({ isSignedIn }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={`${process.env.PUBLIC_URL}/journal-bookmark-fill.svg`}
            height="30"
            alt=""
          />
          BlogSpace
        </Link>
        {isSignedIn ? (
          <h2>Welcome to BlogSpace</h2>
        ) : (
          <form className="d-flex">
            <Link className="btn btn-primary px-10 rounded-0" to="/signin">
              Sign-in
            </Link>

            <Link className="btn btn-primary rounded-0" to="/signup">
              Sign-up
            </Link>
          </form>
        )}
      </div>
    </nav>
  );
}

export default Header;
