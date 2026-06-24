import { useState } from 'react';

const ProblemForm = ({ onAdd, token }) => {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('Codeforces');
  const [rating, setRating] = useState('');
  const [lcDifficulty, setLcDifficulty] = useState('Easy'); 
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('Solved');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    let finalRating = rating;
    if (platform === 'LeetCode') {
        if (lcDifficulty === 'Easy') finalRating = 1200;
        if (lcDifficulty === 'Medium') finalRating = 1500;
        if (lcDifficulty === 'Hard') finalRating = 1800;
    }

    const newProblem = {
      title,
      platform,
      rating: Number(finalRating), 
      tags,
      status
    };

const response = await fetch('https://codevault-cs1i.onrender.com/api/problems', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}` 
  },
  body: JSON.stringify(newProblem)
});

    if (response.ok) {
      const addedProblem = await response.json();
      onAdd(addedProblem); 
      
      setTitle('');
      setRating('');
      setTags('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="problem-form">
      <h2>Log a Problem</h2>
      
      <div className="input-group">
        <label>Problem Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="input-group">
        <label>Platform:</label>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="Codeforces">Codeforces</option>
          <option value="LeetCode">LeetCode</option>
          <option value="CodeChef">CodeChef</option>
          <option value="AtCoder">AtCoder</option>
        </select>
      </div>

      
      {platform === 'LeetCode' ? (
        <div className="input-group">
          <label>Difficulty:</label>
          <select value={lcDifficulty} onChange={(e) => setLcDifficulty(e.target.value)}>
            <option value="Easy">Easy (~1200 Rating)</option>
            <option value="Medium">Medium (~1500 Rating)</option>
            <option value="Hard">Hard (~1800 Rating)</option>
          </select>
        </div>
      ) : (
        <div className="input-group">
          <label>Difficulty Rating (Number):</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required={platform !== 'LeetCode'} />
        </div>
      )}

      <div className="input-group">
        <label>Tags (comma separated):</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. Trees, Two Pointers" required />
      </div>

      <div className="input-group">
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Solved">Solved</option>
          <option value="Needs Upsolve">Needs Upsolve</option>
        </select>
      </div>

      <button type="submit">Add to Vault</button>
    </form>
  );
};

export default ProblemForm;
