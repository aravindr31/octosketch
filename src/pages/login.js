import React, { useState } from "react";
import { VscGithubAlt } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/user/${user}`);
  };
  return (
    <div className="h-screen flex justify-center items-center bg-[#181A1B]">
      <form
        className='flex flex-col justify-center items-center mb-48 p-8 max-w-["600px"] text-center'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <VscGithubAlt className="text-7xl text-green-400" />
        <h1 className="text-5xl m-8 inline-block text-[#F6F8FA]">
          Get Your OctoSketch
        </h1>
        <input
          name="userid"
          className="h-16 w-full rounded-md outline-hidden text-center text-3xl mx-0 my-auto max-w-[500px] p-4 caret-green-400 bg-[#26303c] text-[#F6F8FA] font-mono tracking-wide"
          type="text"
          autoFocus
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Login;
