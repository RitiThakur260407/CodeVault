import { useState, useEffect } from 'react';
import ProblemForm from './components/ProblemForm';
import Analytics from './components/Analytics';
import Auth from './components/Auth';
import './App.css';

function App() {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light'); 

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      const fetchProblems = async () => {
        const response = await fetch('https://codevault-cs1i.onrender.com/api/users/login', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await response.json();
        setProblems(data); 
      };
      fetchProblems();
    }
  }, [user]);

  const handleAddProblem = (newProblem) => {
    setProblems([newProblem, ...problems]); 
  };

  const handleDeleteProblem = async (id) => {
    const response = await fetch(`http://localhost:5000/api/problems/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` }
    });
    if (response.ok) {
      setProblems(problems.filter((problem) => problem._id !== id));
    }
  };

  const handleLogout = () => {
    setUser(null);
    setProblems([]);
  };

  const getDifficultyLabel = (rating) => {
    if (rating >= 1100 && rating <= 1300) return 'Easy';
    if (rating >= 1301 && rating <= 1600) return 'Medium';
    if (rating >= 1601) return 'Hard';
    return rating;
  };

  const getDifficultyClass = (rating) => {
    if (rating >= 1100 && rating <= 1300) return 'easy';
    if (rating >= 1301 && rating <= 1600) return 'medium';
    if (rating >= 1601) return 'hard';
    return '';
  };

  if (!user) {
    return (
      <div className="app-container auth-page">
        <header>
          <h1>CodeVault</h1>
          <p>Your personal DSA tracker</p>
        </header>
        <Auth onLogin={(userData) => setUser(userData)} />
      </div>
    );
  }

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          problem.tags.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' ? true : problem.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-container">
      <header className="dashboard-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h1>CodeVault</h1>
          <p>Welcome back, {user.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Theme Toggle Button */}
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <button onClick={handleLogout} className="delete-btn">Logout</button>
        </div>
      </header>
      
      <main>
        <ProblemForm onAdd={handleAddProblem} token={user.token} />

        <div className="vault-display">
          <h2>My Vault</h2>
          <Analytics problems={problems} />
          
          <div className="filter-controls">
            <input 
              type="text" 
              placeholder="Search by title or tags (e.g., Arrays)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="status-filter">
              <option value="All">All Statuses</option>
              <option value="Solved">Solved</option>
              <option value="Needs Upsolve">Needs Upsolve</option>
            </select>
          </div>

          <div className="problem-grid">
            {filteredProblems.map((problem) => (
              <div key={problem._id} className="problem-card">
                <h3>{problem.title}</h3>
                <p><strong>Platform:</strong> {problem.platform}</p>
                
                <p><strong>Difficulty:</strong> 
                  <span className={`difficulty-badge ${getDifficultyClass(problem.rating)}`}>
                    {getDifficultyLabel(problem.rating)}
                  </span>
                </p>

                <p><strong>Tags:</strong> {problem.tags}</p>
                
                <div className="card-footer">
                  <span className={`status-badge ${problem.status === 'Solved' ? 'solved' : 'upsolve'}`}>
                    {problem.status}
                  </span>
                  <button className="delete-btn" onClick={() => handleDeleteProblem(problem._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;