import { 
  PieChart, Pie, Cell, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  LineChart, Line
} from 'recharts';

const Analytics = ({ problems }) => {
  if (problems.length === 0) return null;

  const tagCounts = {};
  problems.forEach(problem => {
      const splitTags = problem.tags.split(',').map(t => t.trim());
      splitTags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
  });
  const pieData = Object.keys(tagCounts).map(key => ({ name: key, value: tagCounts[key] }));

  const platformCounts = {};
  problems.forEach(problem => {
      platformCounts[problem.platform] = (platformCounts[problem.platform] || 0) + 1;
  });
  const barData = Object.keys(platformCounts).map(key => ({ name: key, count: platformCounts[key] }));

  const lineData = [...problems].reverse().map((prob, index) => ({
      name: `Q${index + 1}`, 
      title: prob.title,     
      rating: prob.rating
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6666'];

  const CustomLineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{payload[0].payload.title}</p>
          <p style={{ margin: 0, color: '#007bff' }}>Rating: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="analytics-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
      
      <div className="chart-box" style={{ gridColumn: '1 / -1', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ textAlign: 'center', marginTop: 0, color: '#2c3e50' }}>Chronological Problem Difficulty</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
            <RechartsTooltip content={<CustomLineTooltip />} />
            <Line type="monotone" dataKey="rating" stroke="#007bff" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ textAlign: 'center', marginTop: 0, color: '#2c3e50' }}>Platform Spread</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <RechartsTooltip cursor={{fill: '#f4f7f6'}} />
            <Bar dataKey="count" fill="#00C49F" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ textAlign: 'center', marginTop: 0, color: '#2c3e50' }}>Algorithm Focus</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Analytics;