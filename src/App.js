import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Function to fetch repositories from the GitHub API
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/orgs/indifferentbroccoli/repos'
        );
        const reposData = response.data;
        const filteredRepos = reposData.filter(repo => repo.name.endsWith('server-docker'));
        setRepos(filteredRepos);

      } catch (error) {
        console.error('Error fetching repos:', error);
      }
    };

    fetchRepos();
  }, []);  

  return (
    <div className="container">
      <header className="header">
        <img src="/img/logo.png" alt="Logo" className="logo" />
      </header>
      <h1 className="my-4">Indifferent Broccoli (:|) Image Index</h1>
      <p>To give back to the community, we're also launching broccoli Open Source Software (bOSS) to make it easier for players to host game servers for free on their own hardware.</p>
      <p>In the table below you'll find open source Docker images to host your own servers.</p>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Stars</th>
            <th>Docker Pulls</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr key={repo.id}>
              <td>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </td>
              <td>{repo.description || 'No description'}</td>
              <td>
                <img
                  src={`https://img.shields.io/github/stars/indifferentbroccoli/${repo.name}?style=for-the-badge&color=6aa84f`}
                  alt={`${repo.name} GitHub stars`}
                />
              </td>
              <td>
                <img
                  src={`https://img.shields.io/docker/pulls/indifferentbroccoli/${repo.name}?style=for-the-badge&color=6aa84f`}
                  alt={`${repo.name} Docker pulls`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
