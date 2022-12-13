import Link from 'next/link';
import { useState } from 'react';
import { fetcher } from '../lib/api';
import { setToken, unsetToken } from '../lib/auth';
import { useUser } from '../lib/authContext';

function Loginbar() {
  const [data, setData] = useState({
    identifier: '',
    password: '',
  });

  const { user, loading } = useUser();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );
    setToken(responseData);
  };

  const logout = () => {
    unsetToken();
  };

  return (
    <div className="navbar bg-purple-600 text-white space-between">
      {!loading &&
        (user ? (
          <li className="flex-1">
            <a
              className="md:p-2  btn btn-ghost lowercase hover:text-teal-400"
              onClick={logout}
              style={{ cursor: 'pointer' }}
            >
              Log out
            </a>
          </li>
        ) : (
          ''
        ))}
      {!loading &&
        (user ? (
          <li className="flex-none">
            <p className="md:p-2 ">{user}</p>
          </li>
        ) : (
          ''
        ))}
      {!loading && !user ? (
        <>
          <li className="flex-1">
            <form onSubmit={handleSubmit} className="form-inline">
              <input
                type="text"
                name="identifier"
                onChange={handleChange}
                placeholder="Username"
                className="md:p-2 form-input py-2 rounded mt-2 text-slate-900"
                required
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="md:p-2 form-input py-2 m2-4 text-slate-900 rounded"
                required
              />
              <button
                className="rounded text-black bg-purple-200 p-2 hover:bg-purple-100"
                type="submit"
              >
                login
              </button>
            </form>
          </li>
          <li className="flex-none">
            <Link href="/register" className="btn  btn-ghost   p-0.5">
              Register
            </Link>
          </li>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default Loginbar;
