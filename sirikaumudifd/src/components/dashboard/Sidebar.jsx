import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-blue-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Exam Portal</h2>
      <nav>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block p-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
          }
        >
          My Courses
        </NavLink>
        <NavLink
          to="/results"
          className={({ isActive }) =>
            `block p-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
          }
        >
          Results
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;