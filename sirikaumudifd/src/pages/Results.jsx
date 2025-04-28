import { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/dashboard/Sidebar';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/test/results').then((res) => {
      setResults(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Results</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {results.length === 0 ? (
            <p>No results available</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Test Name</th>
                  <th className="text-left p-2">Score</th>
                  <th className="text-left p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result._id}>
                    <td className="p-2">{result.testName}</td>
                    <td className="p-2">{result.score}</td>
                    <td className="p-2">{new Date(result.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;