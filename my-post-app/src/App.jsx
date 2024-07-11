import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const API_URL = 'http://localhost:your-backend-port';  // Adjust port as needed

// Set up axios with base URL and potentially custom headers if necessary
axios.defaults.baseURL = API_URL;

const router = createBrowserRouter({
  children: [
    {
      path: '/',
      element: <PrivateRoute isAuthenticated={isAuthenticated}><PostList /></PrivateRoute>,
    },
    {
      path: '/create',
      element: <PrivateRoute isAuthenticated={isAuthenticated}><PostForm /></PrivateRoute>,
    },
    {
      path: '/edit/:postId',
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <PostForm editMode={true} />
        </PrivateRoute>
      ),
    },
    { path: '/signin', element: <SignIn onLogin={handleLogin} /> },
    { path: '/signup', element: <SignUp /> }, // Implement SignUp component
  ],
});

const isAuthenticated = () => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    try {
      jwtDecode(token, process.env.REACT_APP_JWT_SECRET); // Replace with your secret
      return true;
    } catch (error) {
      localStorage.removeItem('jwtToken');
      return false;
    }
  }
  return false;
};

const handleLogin = (data) => {
  localStorage.setItem('jwtToken', data.token);
  // Optionally, set axios headers with the JWT token for authorized requests
};

root.render(
  <RouterProvider router={router} />
);
}

export default App
