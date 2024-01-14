import React from "react";
import Navbar from "../components/TopNavbar/Navbar";

const navItem = { label: "Register", path: "/register" };

const Login = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <Navbar navItem={navItem} />
      <section>
        <form>
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
