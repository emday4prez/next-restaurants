import Cart from '../components/Cart';
import Link from 'next/link';
function Order() {
  return (
    <div className="grid grid-cols-1">
      <Cart />
      <Link className="btn btn-ghost bg-purple-400" href="/checkout">
        go to checkout
      </Link>
    </div>
  );
}

export default Order;
