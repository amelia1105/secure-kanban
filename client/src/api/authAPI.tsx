import { UserLogin } from "../interfaces/UserLogin";

// Function to handle user login
const login = async (userInfo: UserLogin) => {
  try {
    // Send POST request to /auth/login with user information
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // Throw error if response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    // Parse and return response data
    const data = await response.json();
    return data;
  
  } catch (err) {
    // Log error and return a rejected promise
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
}

export { login };
