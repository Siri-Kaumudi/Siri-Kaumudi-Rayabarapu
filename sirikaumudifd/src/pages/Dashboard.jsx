import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/dashboard/Sidebar';
import ProfileDropdown from '../components/dashboard/ProfileDropdown';
import CourseList from '../components/dashboard/CourseList';

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <ProfileDropdown user={user} />
        </div>
        <CourseList />
      </div>
    </div>
  );
}

export default Dashboard;