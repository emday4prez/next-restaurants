import { useState } from 'react';
import { useRouter } from 'next/router';
import { setToken } from '../lib/auth';
import { fetcher } from '../lib/api';

const Register = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState(false);
  const [createAccountError, setCreateAccountError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            username: userData.username,
          }),
          method: 'POST',
        }
      );
      setToken(responseData);
      setSuccess(true);
      alert('created account');
      setCreateAccountError(false);
    } catch (error) {
      console.error(error);
      setCreateAccountError(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex w-full flex-col">
      {success && (
        <div className="bg-green-400 rounded-xl text-black h-24 justify-center align-middle">
          <h1 className="md:text-xl font-extrabold rounded leading-tighter p-8 mb-4">
            Account Created Successfully!
          </h1>
        </div>
      )}
      {createAccountError && (
        <div className="bg-red-400 rounded-xl text-black h-24 justify-center align-middle">
          <h1 className="md:text-xl font-extrabold rounded leading-tighter p-8 mb-4">
            Error Creating Account!
          </h1>
        </div>
      )}
      <div className="w-full bg-white border-2 rounded p-8 m-4 md:max-w-sm md:mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
            Register
          </span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mb-4 md:flex md:flex-wrap md:justify-between"
        >
          <div className="flex flex-col mb-4 md:w-full">
            <label className="font-bold text-lg mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="border-2 py-2 px-3"
              type="text"
              name="username"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="flex flex-col mb-4 md:w-full">
            <label className="font-bold text-lg mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 py-2 px-3"
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="flex flex-col mb-6 md:w-full">
            <label className="font-bold text-lg mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border-2 py-2 px-3"
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <button
            className="block bg-purple-600 text-white text-lg rounded p-4 mx-auto"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
