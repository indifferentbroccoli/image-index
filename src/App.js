import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Function to fetch repositories from the GitHub API
    const fetchRepos = async () => {
      try {
        // Fetch repos from indifferentbroccoli organization and thijsvanloef
        const [orgResponse, palworldResponse] = await Promise.all([
          axios.get('https://api.github.com/orgs/indifferentbroccoli/repos'),
          axios.get('https://api.github.com/repos/thijsvanloef/palworld-server-docker')
        ]);
  
        const orgReposData = orgResponse.data;
        const palworldRepoData = [palworldResponse.data]; // Convert to array to merge with orgReposData
  
        // Filter indifferentbroccoli repos that end with 'server-docker'
        const filteredOrgRepos = orgReposData.filter(repo => repo.name.endsWith('server-docker'));
  
        // Combine the filtered indifferentbroccoli repos with the palworld repo
        const combinedRepos = [...filteredOrgRepos, ...palworldRepoData];
  
        setRepos(combinedRepos);

    } catch (error) {
        console.error('Error fetching repos:', error);
      }
    };

    fetchRepos();
  }, []);  

  return (
    <div className="container">
      <header className="header">
        <a href="https://indifferentbroccoli.com">
          <img src="/logo.png" alt="Logo" className="logo" />
        </a>
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
                  src={`https://img.shields.io/github/stars/${repo.owner.login}/${repo.name}?style=for-the-badge&color=6aa84f`}
                  alt={`${repo.name} GitHub stars`}
                />
              </td>
              <td>
                <img
                  src={`https://img.shields.io/docker/pulls/${repo.owner.login}/${repo.name}?style=for-the-badge&color=6aa84f`}
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
