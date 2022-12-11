import Link from 'next/link';
import { useState } from 'react';
import { fetcher } from '../lib/api';
import { setToken, unsetToken } from '../lib/auth';
import { useUser } from '../lib/authContext';
import { useCart } from 'react-use-cart';
function Loginbar() {
  const [data, setData] = useState({
    identifier: '',
    password: '',
  });

  const { user, loading } = useUser();
  const { totalItems } = useCart();

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
    <div className="navbar bg-purple-600 text-white">
      {/* <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/register">Register</Link>
          </li>
          
          <li>
            <Link href="login">Login</Link>
          </li>
        </ul>
      </div> */}
      {!loading &&
        (user ? (
          <li className="flex-1">
            <p className="md:p-2 py-2 mx-4 block">{user}</p>
          </li>
        ) : (
          ''
        ))}

      {!loading &&
        (user ? (
          <li className="flex-none">
            <a
              className="md:p-2  btn btn-ghost hover:text-teal-400"
              onClick={logout}
              style={{ cursor: 'pointer' }}
            >
              Logout
            </a>
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
                className="md:p-2 form-input py-2 rounded mx-2 text-slate-900"
                required
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="md:p-2 form-input py-2 text-slate-900 rounded mx-2"
                required
              />
              <button
                className="md:p-2 rounded py-2 text-black bg-purple-200 p-2 hover:bg-purple-100"
                type="submit"
              >
                login
              </button>
            </form>
          </li>
          <li className="flex-none">
            <Link href="/register" className=" py-2 btn btn-ghost">
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
