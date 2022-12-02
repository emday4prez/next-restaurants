import Link from 'next/link'

function Navbar() {
  return (
    <div className="navbar bg-purple-600 text-white">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Restaurants App
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>

          <li>
            <Link href="login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
