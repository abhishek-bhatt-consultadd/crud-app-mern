import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API calls
import MedicineForm from '../utils/MedicineForm'; // Import MedicineForm component
import CONSTANTS from '../constant';
import Snackbar from '../utils/Snackbar';

const HomePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null); // For editing
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(CONSTANTS.BASE_URl +  CONSTANTS.GET); // Replace with your API endpoint
        setMedicines(response.data);
        setSnackbarMessage('Medicine created successfully!'); // Set snackbar message
        setShowSnackbar(true);
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
      const response = await axios.post(CONSTANTS.BASE_URl +  CONSTANTS.CREATE, newMedicine); // Replace with API endpoint
      setMedicines([...medicines, response.data]); // Add new medicine to state
      setSelectedMedicine(null); // Clear selected medicine after creation
    } catch (error) {
      console.error('Error creating medicine:', error);
      setError('An error occurred while creating medicine'); // Set user-friendly error
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMedicine = async (updatedMedicine) => {
    setIsLoading(true);
    try {
      const response = await axios.put(CONSTANTS.BASE_URl +  CONSTANTS.UPDATE + '/' + selectedMedicine.id, updatedMedicine); // Replace with API endpoint
      const updatedMedicines = medicines.map((medicine) =>
        medicine.id === selectedMedicine.id ? response.data : medicine
      );
      setMedicines(updatedMedicines);
      setSelectedMedicine(null); // Clear selected medicine after update
      setSnackbarMessage('Medicine created successfully!'); // Set snackbar message
      setShowSnackbar(true);
    } catch (error) {
      console.error('Error updating medicine:', error);
      setError('An error occurred while updating medicine'); // Set user-friendly error
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMedicine = async (medicineId) => {
    setIsLoading(true);
    try {
      await axios.delete(CONSTANTS.BASE_URl +  CONSTANTS.DELETE + '/' + medicineId); // Replace with API endpoint
      setMedicines((prevMedicines) => prevMedicines.filter((medicine) => medicine.id !== medicineId));
      setSnackbarMessage('Medicine deleted successfully!'); // Set snackbar message
      setShowSnackbar(true);
    } catch (error) {
      console.error('Error deleting medicine:', error);
      setError('An error occurred while deleting medicine'); // Set user-friendly error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMedicine = (medicine) => {
    setSelectedMedicine(medicine);
  };

  return (
    <div>
      <h1>Welcome to the Medicine Database!</h1>
      {isLoading && <p>Loading medicines...</p>}
      {error && <p className="error-message">{error}</p>}
      {medicines.length > 0 && (
        <ul>
          {medicines.map((medicine) => (
            <li key={medicine.id}>
              {medicine.title}
              <button onClick={() => handleSelectMedicine(medicine)}>Edit</button>
              <button onClick={() => handleDeleteMedicine(medicine.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {medicines.length === 0 && !isLoading && <p>No medicines found.</p>}
      <MedicineForm
        initialMedicine={selectedMedicine}
        onSubmit={selectedMedicine ? handleUpdateMedicine : handleCreateMedicine}
      />
        {showSnackbar && <Snackbar message={snackbarMessage} variant="success" />}
    </div>
  );
};

export default HomePage;
