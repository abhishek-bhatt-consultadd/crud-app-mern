import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API calls

const MedicineForm = ({ initialMedicine = null, onSubmit }) => {
  const [title, setTitle] = useState(initialMedicine ? initialMedicine.title : '');
  const [company, setCompany] = useState(initialMedicine ? initialMedicine.company : '');
  const [errors, setErrors] = useState({}); // State for validation errors
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    // Basic validation
    if (!title) {
      setErrors({ title: 'Title is required' });
      return; // Prevent submission if validation fails
    }

    setIsLoading(true);

    try {
      const data = { title, company };
      //const response = await axios.post('/api/medicines', data); // Replace with your API endpoint
      onSubmit(data); // Call parent function with created/updated medicine
    } catch (error) {
      console.error('Error submitting medicine:', error);
      setErrors({ general: 'An error occurred' }); // Generic error for user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialMedicine ? 'Edit Medicine' : 'Create Medicine'}</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : (initialMedicine ? 'Update' : 'Create')}
      </button>
      {errors.general && <p className="error-message">{errors.general}</p>}
    </form>
  );
};

export default MedicineForm;
