import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // Get the token from localStorage and decode it
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  }

  loggedIn(): boolean {
    // Check if the user is logged in (token exists and is not expired)
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  isTokenExpired(token: string): boolean {
    // Check if the token is expired
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) {
      return false;  // No expiration field
    }

    // Check if the token is expired (comparing expiration time with current time)
    const currentTime = Math.floor(Date.now() / 1000);  // Current time in seconds
    return decoded.exp < currentTime;
  }

  getToken(): string {
    // Retrieve the token from localStorage
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // Set the token in localStorage and redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Remove the token from localStorage and redirect to the main page
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();