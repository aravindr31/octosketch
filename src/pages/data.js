import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "./components/chart";
import Footer from "./components/footer";
import Info from "./components/info";
import Repos from "./components/repos";

function Data() {
  const { id } = useParams();
  const [gitData, setGitData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(`https://api.github.com/users/${id}`, {
      signal: abortController.signal,
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => setGitData(jsonResponse));
    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Info
        name={gitData?.name}
        login={gitData?.login}
        website={gitData?.blog}
        location={gitData?.location}
        startDate={gitData?.created_at}
        company={gitData?.company}
        avatarUrl={gitData?.avatar_url}
        followers={gitData?.followers}
        following={gitData?.following}
        repos={gitData?.public_repos}
      />
      <Chart />
      <Repos />
      <Footer />
    </div>
  );
}

export default Data;
