import axios from 'axios';

const handleLogin = async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('http://localhost:5000/api/login', {
      email,
      password,
    });
    console.log(response.data);  // handle success response
  } catch (error) {
    console.error(error.response.data);  // handle error response
  }
};
