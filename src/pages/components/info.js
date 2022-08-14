import React from "react";

function Info({
  name,
  location,
  website,
  login,
  company,
  startDate,
  avatarUrl,
  followers,
  following,
  repos,
}) {
  return (
    <div className="h-full flex flex-col items-center px-12 pt-12 pb-36 bg-[#1E293B]">
      {avatarUrl && (
        <img
          className="w-[9.5rem] rounded-full border-8 border-green-400 mb-6"
          src={avatarUrl}
          alt="avatar"
        />
      )}
      <h2 className="mb-1 font-Inter text-5xl text-gray-50">{name}</h2>
      <h3 className="mb-4 text-green-400 text-2xl font-mono ">@{login}</h3>
      <div className=" grid grid-cols-1 place-items-center md:flex flex-row justify-center">
        {location && (
          <h2 className="mx-3 font-sans text-lg text-green-200">{location}</h2>
        )}
        {company && (
          <h2 className="mx-3 font-sans text-lg text-green-200">{company}</h2>
        )}
        {startDate && (
          <h2 className="mx-3 font-sans text-lg text-green-200">
            {new Date(startDate).toLocaleDateString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h2>
        )}
        {website && (
          <h2 className="mx-3 font-sans text-lg text-green-200">{website}</h2>
        )}
      </div>
      <div className="text-gray-50 grid gap-2 grid-cols-3 justify-center mt-[2rem] ">
        <div className="bg-[#334155] flex flex-col sm:px-1 py-2 md:p-4 rounded-md text-center">
          <h1 className="px-4 py-2 text-xl font-semibold">{repos}</h1>
          <span className=" text-xs md:text-md font-light">REPOSITORIES</span>
        </div>
        <div className="bg-[#334155] flex flex-col sm:px-1 py-2 md:p-4  rounded-md text-center">
          <h1 className="px-4 py-2 text-xl font-semibold">{followers}</h1>
          <span className="text-xs md:text-md font-light">FOLLOWERS</span>
        </div>
        <div className="bg-[#334155] flex flex-col sm:px-1 py-2 md:p-4 rounded-md text-center">
          <h1 className="px-4 py-2 text-xl font-semibold">{following}</h1>
          <span className="text-xs  md:text-md font-light">FOLLOWING</span>
        </div>
      </div>
    </div>
  );
}
export default Info;
