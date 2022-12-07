import { useCart } from 'react-use-cart';
function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
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
      <h1>Cart ({totalUniqueItems})</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}({item.quantity})
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button onClick={() => removeItem(item.id)}>&times;</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${cartTotal.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;
