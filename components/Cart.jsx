import { useCart } from 'react-use-cart';
import Link from 'next/link';
function Cart() {
  const {
    isEmpty,
    totalItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();

  if (isEmpty) return <p className="mt-4">Your cart is empty</p>;

  return (
    <div
      className="
          flex
          flex-col
          justify-center
          items-center
          bg-indigo-100
          mx-auto
          w-full
          rounded-lg
          p-2
        "
    >
      <h1 className="tab-lg">Cart ({totalItems})</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div className="btn-group">
              <button
                className="btn btn-ghost bg-teal-400 mb-1"
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="btn btn-ghost bg-teal-400"
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <button className="btn btn-ghost w-40 bg-slate-300  pointer-events-none">
                {item.name} ({item.quantity})
              </button>

              <button
                className="btn btn-ghost bg-red-400"
                onClick={() => removeItem(item.id)}
              >
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="tab-lg text-xl mt-6">Total: ${cartTotal.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;
