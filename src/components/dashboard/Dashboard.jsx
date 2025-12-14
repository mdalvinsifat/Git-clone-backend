import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // 🔹 Fetch data
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/repo/user/${userId}`
        );
        const data = await response.json();

        // ✅ Normalize API response
        const repos = Array.isArray(data)
          ? data
          : data.repositories || [];

        setRepositories(repos);
        setSearchResults(repos); // 🔥 initialize search list
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  // 🔹 Search logic
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      setSearchResults(repositories);
    } else {
      const filtered = repositories.filter((repo) =>
        repo.name?.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, repositories]);

  return (
    <div className="min-h-screen bg-black py-8">
      <section className="mx-auto flex max-w-[1080px] gap-6">

        {/* Left Sidebar */}
        <aside className="w-1/4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Suggested Repositories
          </h3>

          {suggestedRepositories.map((repo) => (
            <div
              key={repo._id}
              className="mb-3 rounded-md border border-gray-700 p-3 hover:bg-gray-800"
            >
              <h4 className="font-medium text-white">{repo.name}</h4>
              <p className="text-sm text-gray-400">
                {repo.description}
              </p>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="w-2/4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Your Repositories
          </h2>

          <input
            type="text"
            placeholder="Search repository..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 w-full rounded-md border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-500 outline-none focus:border-blue-500"
          />

          {searchResults.length === 0 ? (
            <p className="text-gray-400">No repositories found</p>
          ) : (
            searchResults.map((repo) => (
              <div
                key={repo._id}
                className="mb-3 rounded-md border border-gray-700 p-3 hover:bg-gray-800"
              >
                <h4 className="font-medium text-white">
                  {repo.name}
                </h4>
                <p className="text-sm text-gray-400">
                  {repo.description}
                </p>
              </div>
            ))
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/4 rounded-lg bg-gray-900 p-4 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Upcoming Events
          </h3>

          <ul className="space-y-3 text-sm text-gray-400">
            <li>Tech Conference – Dec 15</li>
            <li>Developer Meetup – Dec 25</li>
            <li>React Summit – Jan 5</li>
          </ul>
        </aside>

      </section>
    </div>
  );
};

export default Dashboard;
