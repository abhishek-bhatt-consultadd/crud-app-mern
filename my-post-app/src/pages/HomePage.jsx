import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // For API calls
import MedicineForm from '../components/MedicineForm'; // Import MedicineForm component
import CONSTANTS from '../constant';
import Snackbar from '../utils/Snackbar';
import { AuthContext } from '../providers/AuthContext';
import '../css/homepage.css'; 
import { Navigate, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null); // For editing
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const headers = {
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, 
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(CONSTANTS.BASE_URl +  CONSTANTS.GET, {headers}); // Replace with your API endpoint
        setMedicines(response.data);

      } catch (error) {
        setError(error.message || 'An error occurred while fetching medicines');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateMedicine = async (newMedicine) => {
    setIsLoading(true);
    try {
      const response = await axios.post(CONSTANTS.BASE_URl +  CONSTANTS.CREATE, newMedicine, {headers}); // Replace with API endpoint
      setMedicines([...medicines, response.data]); // Add new medicine to state
      setSelectedMedicine(null); // Clear selected medicine after creation
    } catch (error) {
      console.error('Error creating medicine:', error);
      setError('An error occurred while creating medicine'); // Set user-friendly error
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (medicine) => {
    const details = `
      ID: ${medicine.id}
      Title: ${medicine.title}
      Company: ${medicine.company}  `;
      alert(details);
  };

  const handleUpdateMedicine = async (updatedMedicine) => {
    setIsLoading(true);
    try {
      const response = await axios.put(CONSTANTS.BASE_URl +  CONSTANTS.UPDATE + '/' + selectedMedicine.id, updatedMedicine, {headers}); // Replace with API endpoint
      const updatedMedicines = medicines.map((medicine) =>
        medicine.id === selectedMedicine.id ? response.data : medicine
      );
      setMedicines(updatedMedicines);
      setSelectedMedicine(null); // Clear selected medicine after update
      setSnackbarMessage('Medicine created successfully!'); // Set snackbar message
      setShowSnackbar(true);
    } catch (error) {
      console.error('Error updating medicine:', error);
      setError('An error occurred while updating medicine'); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMedicine = async (medicineId) => {
    setIsLoading(true);
    try {
      await axios.delete(CONSTANTS.BASE_URl +  CONSTANTS.DELETE + '/' + medicineId, {headers}); 
      setMedicines((prevMedicines) => prevMedicines.filter((medicine) => medicine.id !== medicineId));
      setSnackbarMessage('Medicine deleted successfully!'); // Set snackbar message
      setShowSnackbar(true);
    } catch (error) {
      console.error('Error deleting medicine:', error);
      setError('An error occurred while deleting medicine'); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMedicine = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  }

  return (
    <div className="home-page">
      <div className="home-page-content">
        <h1>Welcome to the Medicine Database!</h1>
        {isLoading && <p>Loading medicines...</p>}
        {error && <p className="error-message">{error}</p>}
        {medicines.length > 0 && (
          <ul className="medicine-list">
            {medicines.map((medicine) => (
              <li key={medicine.id} className="medicine-item">
                <span>{medicine.title}</span>
                <div className="medicine-actions">
                <button
  onClick={() => handleSelectMedicine(medicine)}
  disabled={!localStorage.getItem('isAdmin')}
>Edit</button>
                  <button onClick={() => handleDeleteMedicine(medicine.id)} disabled={!localStorage.getItem('isAdmin')}>Delete</button>
                  <button onClick={() => handleViewDetails(medicine)}>View Details</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {medicines.length === 0 && !isLoading && <p>No medicines found.</p>}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        {localStorage.getItem('isAdmin') && <MedicineForm
          initialMedicine={selectedMedicine}
          onSubmit={selectedMedicine ? handleUpdateMedicine : handleCreateMedicine}
        /> }
        {showSnackbar && <Snackbar message={snackbarMessage} variant="success" />}
      </div>
    </div>
  );
};

export default HomePage;
