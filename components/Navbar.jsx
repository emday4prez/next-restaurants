import Link from 'next/link';
import { useState } from 'react';
import { fetcher } from '../lib/api';
import { setToken, unsetToken } from '../lib/auth';
import { useUser } from '../lib/authContext';
import { useCart } from 'react-use-cart';
function Navbar() {
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
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Restaurants
        </Link>
        <Link href="/view-cart" className=" normal-case text-md">
          <div className="indicator">
            <span className="indicator-item indicator-middle badge badge-secondary">
              {totalItems}
            </span>
            <button className="btn btn-ghost ">Cart</button>
          </div>
        </Link>
      </div>
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
          <li>
            <p className="md:p-2 py-2 block">{user}</p>
          </li>
        ) : (
          ''
        ))}
      {!loading &&
        (user ? (
          <li>
            <Link
              href="/profile"
              className="md:p-2 py-2 block hover:text-teal-400"
            >
              Profile
            </Link>
          </li>
        ) : (
          ''
        ))}

      {!loading &&
        (user ? (
          <li>
            <a
              className="md:p-2 block hover:text-teal-400"
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
          <li>
            <div></div>
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
                className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                type="submit"
              >
                login
              </button>
            </form>
          </li>
          <li>
            <Link
              href="/register"
              className="md:p-2 block py-2 hover:text-teal-400 text-indigo-100"
            >
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

export default Navbar;
