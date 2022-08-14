import React, { useEffect, useState } from "react";
import { GoPrimitiveDot, GoRepoForked } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import Dropdown from "./componentUtils/dropdown";
import FlipMove from "react-flip-move";

function Repos({ repoData }) {
  const [repos, setRepos] = useState(null);
  const [drop, setDrop] = useState("star");

  useEffect(() => {
    const elementIndex = drop[0][0];
    const modifiedRepos = repoData
      ?.filter((repo) => repo.language != null)
      ?.sort((arr1, arr2) => arr2[elementIndex] - arr1[elementIndex])
      ?.slice(0, 12);
    setRepos(modifiedRepos);
  }, [drop, repoData]);

  return (
    <div className="max-w-[1500px] grid grid-col-4 mx-auto ">
      <div className="my-4">
        <div className="flex justify-start items-center">
          <h2 className="text-3xl font-semibold mx-4 decoration-2 underline decoration-dashed decoration-slate-400 underline-offset-8">
            Top Repos
          </h2>
          <div className="flex justify-center items-center z-20">
            <span className="mx-1 text-green-400">by</span>
            <Dropdown dropdownToRepo={setDrop} />
          </div>
        </div>
        <FlipMove className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8 mx-4">
          {repos?.map(
            (repo) =>
              repo.language != null && (
                <div className="flex flex-col p-4 shadow-xl " key={repo.id}>
                  <h1 className="text-xl font-mono font-semibold text-gray-700 text-ellipsis overflow-hidden w-[90%] whitespace-nowrap">
                    {repo.name}
                  </h1>
                  <div className="flex justify-between items-stretch  mt-10 text-xs font-sans">
                    <div className="flex justify-start items-center">
                      <div className="flex justify-center items-center">
                        <h5 className="text-green-500">
                          <GoPrimitiveDot />
                        </h5>
                        <h4 className="mx-2">{repo.language}</h4>
                      </div>
                      <div className="flex justify-center items-center">
                        <span className="text-yellow-500">
                          <AiFillStar />
                        </span>
                        <h4 className="mx-2">{repo.stargazers_count}</h4>
                      </div>
                      <div className="flex justify-center items-center">
                        <span className="text-red-500">
                          <GoRepoForked />
                        </span>
                        <h4 className="mx-2">{repo.forks}</h4>
                      </div>
                    </div>
                    <div>
                      <h6 className=" mx-4">{repo.size}kb</h6>
                    </div>
                  </div>
                </div>
              )
          )}
        </FlipMove>
      </div>
    </div>
  );
}

export default Repos;
