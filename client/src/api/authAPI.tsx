import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    // send POST request to /auth/login
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // throw error if response not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();

    return data;
  
  } catch (err) {
    // log and return errors
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
}

export { login };
