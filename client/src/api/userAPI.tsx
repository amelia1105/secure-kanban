import Auth from '../utils/auth';

const retrieveUsers = async () => {
  try {
    const token = Auth.getToken();  // Get token from AuthService
    if (!token) {
      throw new Error('No token available');
    }

    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });    

    if (!response.ok) {
      throw new Error('Failed to retrieve users');
    }

    const data = await response.json();
    return data;

  } catch (err) {
    console.error('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveUsers };