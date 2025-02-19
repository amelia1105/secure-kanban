import Auth from '../utils/auth';

const retrieveUsers = async () => {
  try {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

    const response = await fetch(`${API_URL}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    console.log("API response status:", response.status);  // Debugging line

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    const data = await response.json();
    console.log("User data received:", data);  // Debugging line

    return data;
  } catch (err) {
    console.error('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveUsers };