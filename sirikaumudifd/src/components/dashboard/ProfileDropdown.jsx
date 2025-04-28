import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function ProfileDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <div className="relative">
      <img
        src={user.profilePicture}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
      />
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg"
          onMouseLeave={() => setIsOpen(false)}
        >
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            My Profile
          </Link>
          <Link
            to="/change-password"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Change Password
          </Link>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;