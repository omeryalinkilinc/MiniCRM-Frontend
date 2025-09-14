"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5270/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
      console.log("Token:", data.token);
    } else {
      console.error("Login failed:", data.message);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div>
        <div className="flex justify-center items-center">
          <div className="relative mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-500 absolute bottom-3 right-3 left-3 top-3 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="3"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 3h5v5" />
              <path d="M20 3l-7.536 7.536a5 5 0 0 0 -1.464 3.534v6.93" />
              <path d="M4 5l4.5 4.5" />
            </svg>
          </div>

          <h1 className="font-bold text-2xl">MiniCRM</h1>
        </div>
        <div className="border p-4 rounded mt-6 w-[350px] h-[300px]">
          <h2 className="font-bold text-xl">Log in</h2>
          <div className="flex flex-col mt-4">
            <label className="pb-1">Email Address</label>
            <input
              className="border rounded pl-1 h-[30px]"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-3">
            <label className="pb-1">Password</label>
            <input
              className="border rounded pl-1 h-[30px]"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-3">
            <button
              className="flex justify-center bg-[#2371f3] p-1 pl-2 pr-2 text-white mt-2 cursor-pointer rounded w-full"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="flex justify-center mt-2">
            <a href="#">Forget password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
