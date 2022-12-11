import Cart from '../components/Cart';
import Link from 'next/link';
function Order() {
  return (
    <div>
      <Cart />
      <Link href="/checkout">go to checkout</Link>
    </div>
  );
}

export default Order;
