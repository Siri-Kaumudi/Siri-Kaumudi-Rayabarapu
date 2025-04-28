import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/test/courses').then((res) => {
      setCourses(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{course.name}</h3>
            <Link
              to={`/test/${course._id}`}
              className="mt-2 inline-block bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Start Test
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;