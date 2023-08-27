import axios from "axios";
import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://content.newtonschool.co/v1/pr/main/users"
      );
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const sortUsers = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortAscending) {
        return a.name.length - b.name.length;
      } else {
        return b.name.length - a.name.length;
      }
    });
    setUsers(sortedUsers);
    setSortAscending(!sortAscending);
  };

  return (
    <div id="main">
      <h2>User List</h2>
      <button
        className="fetch-data-btn"
        onClick={fetchData}
        disabled={isLoading}
      >
        Fetch User Data
      </button>
      <button
        className="sort-btn"
        onClick={sortUsers}
        disabled={users.length === 0}
      >
        {sortAscending
          ? "Sort by name length (ascending)"
          : "Sort by name length (descending)"}
      </button>
      {isLoading && <p>Loading...</p>}
      <div className="users-section">
        {users.map((user) => (
          <li key={user.id}>
            <section className="id-section">{user.id}</section>
            <section className="name-email-section">
              <p className="name">Name: {user.name}</p>
              <p className="email">Email: {user.email}</p>
            </section>
          </li>
        ))}
      </div>
    </div>
  );
};

export default App;
