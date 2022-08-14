import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "./components/chart";
import Footer from "./components/footer";
import Info from "./components/info";
import Repos from "./components/repos";
import GhPolyglot from "gh-polyglot";

function Data() {
  const { id } = useParams();
  const [gitData, setGitData] = useState(null);
  const [langData, setLangData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [starRepo, setStarRepo] = useState(null);

  const fetchUserData = () => {
    const abortController = new AbortController();
    fetch(`https://api.github.com/users/${id}`, {
      signal: abortController.signal,
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => setGitData(jsonResponse));
    return () => abortController.abort();
  };

  const getLangData = () => {
    const repoLangs = new GhPolyglot(id);
    repoLangs.userStats((err, stats) => {
      if (!err) {
        setLangData(stats);
      } else console.log(err);
    });
  };
  const fetchRepoData = () => {
    const abortController = new AbortController();
    fetch(`https://api.github.com/users/${id}/repos?per_page=50`, {
      signal: abortController.signal,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setRepoData(response);
      });
    return () => abortController.abort();
  };
  useEffect(() => {
    fetchUserData();
    getLangData();
    fetchRepoData();
  }, []);
  useEffect(() => {
    const staredRepos = () => {
      if (repoData != null) {
        return repoData?.filter((repos) => repos.stargazers_count !== 0);
      } else return null;
    };
    setStarRepo(staredRepos);
  }, [repoData]);
  return (
    <div className="mb-8">
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
      {langData && starRepo && (
        <Chart langData={langData} starRepos={starRepo} />
      )}
      {repoData && <Repos repoData={repoData} />}
      <Footer />
    </div>
  );
}

export default Data;
