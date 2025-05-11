import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    collegeIdNumber: '',
    profilePicture: null,
    collegeIdCard: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateFile = (file, minSize, maxSize) => {
    if (!file) return false;
    const sizeInKB = file.size / 1024;
    return sizeInKB >= minSize && sizeInKB <= maxSize;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFile(formData.profilePicture, 50, 250)) {
      setError('Profile picture must be between 50KB and 250KB');
      return;
    }
    if (!validateFile(formData.collegeIdCard, 100, 500)) {
      setError('College ID card must be between 100KB and 500KB');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await api.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">College Name</label>
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">College ID Number</label>
          <input
            type="text"
            name="collegeIdNumber"
            value={formData.collegeIdNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture (50KB-250KB)</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            accept="image/*"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">College ID Card (100KB-500KB)</label>
          <input
            type="file"
            name="collegeIdCard"
            onChange={handleChange}
            accept="image/*"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;