import { useState } from 'react';
import Cookies from 'js-cookie';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from 'react-use-cart';
import CardSection from './CardSection';

function CheckoutForm() {
  const [data, setData] = useState({
    address: '',
    city: '',
    state: '',
    stripe_id: '',
  });
  const [error, setError] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, items, emptyCart } = useCart();

  function onChange(e) {
    const updateItem = (data[e.target.name] = e.target.value);
    setData({ ...data, updateItem });
  }

  async function submitOrder() {
    if (data.address.trim().length < 5) {
      setAddressError(true);
      setTimeout(() => {
        setAddressError(false);
      }, 5000);
      return;
    }
    if (data.city.trim().length < 2) {
      setCityError(true);
      setTimeout(() => {
        setCityError(false);
      }, 5000);
      return;
    }
    if (data.state.trim().length < 2) {
      setStateError(true);
      setTimeout(() => {
        setStateError(false);
      }, 5000);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const token = await stripe.createToken(cardElement);
    const userToken = Cookies.get('token');
    const total = cartTotal.toFixed(2);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders`,
      {
        method: 'POST',
        headers: userToken && { Authorization: `Bearer ${userToken}` },
        body: JSON.stringify({
          amount: total,
          dishes: items,
          address: data.address,
          city: data.city,
          state: data.state,
          token: token.token.id,
        }),
      }
    );

    if (!response.ok) {
      setError(response.statusText);
    }
    if (response.ok) {
      setSuccess(true);
      emptyCart();
      setTimeout(() => {
        setSuccess(false);
      }, 10000);
    }
  }

  return (
    <div className="border-2 border-teal-400 p-4 rounded-xl md:w-96 w-11/12 ">
      <span className="text-gray-700">Address</span>
      <input
        name="address"
        type="text"
        onChange={onChange}
        className="
                    block
                    w-full
                    mt-1
                    border-gray-300
                    rounded-md
                    shadow-sm 
                    focus:border-indigo-300
                    focus:ring
                    focus:ring-indigo-200
                    focus:ring-opacity-50
                  "
        placeholder=""
      />
      <span className="text-gray-700">City</span>
      <input
        onChange={onChange}
        name="city"
        type="text"
        className="
                    block
                    w-full
                    mt-1
                    border-gray-300
                    rounded-md
                    shadow-sm
                    focus:border-indigo-300
                    focus:ring
                    focus:ring-indigo-200
                    focus:ring-opacity-50
                  "
        placeholder=""
      />
      <span className="text-gray-700">State</span>
      <input
        onChange={onChange}
        name="state"
        type="text"
        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder=""
      />
      <CardSection data={data} stripeError={error} submitOrder={submitOrder} />
      {success && (
        <div className="bg-green-300 mt-2 rounded-xl text-black h-24 justify-center align-middle">
          <h1 className="md:text-xl font-extrabold rounded leading-tighter p-8 mb-4">
            Order Placed Successfully!
          </h1>
        </div>
      )}
      {addressError && (
        <div className="bg-red-300 mt-2 rounded-xl text-black h-24 justify-center align-middle">
          <h1 className="md:text-xl font-extrabold rounded leading-tighter p-8 mb-4">
            Address must be at least 5 characters!
          </h1>
        </div>
      )}
      {cityError && (
        <div className="bg-red-300 mt-2 rounded-xl text-black h-24 justify-center align-middle">
          <h1 className="md:text-xl font-extrabold rounded leading-tighter p-8 mb-4">
            City must be at least 2 characters!
          </h1>
        </div>
      )}
      {stateError && (
        <div className="bg-red-300 mt-2  rounded-xl text-black h-24 justify-center align-middle">
          <h1 className="md:text-xl font-extrabold rounded leading-tighter p-8 mb-4">
            State must be at least 2 characters!
          </h1>
        </div>
      )}
    </div>
  );
}
export default CheckoutForm;
