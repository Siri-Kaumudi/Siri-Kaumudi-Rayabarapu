import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/dashboard/Sidebar';

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>College:</strong> {user.collegeName}</p>
          <p><strong>College ID:</strong> {user.collegeIdNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;