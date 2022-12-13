/* pages/checkout.js */

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import InjectedCheckoutForm from '../components/Checkout/CheckoutForm';

import Cart from '../components/Cart';

function Checkout() {
  // load stripe to inject into elements components
  const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY}`
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-6">Checkout</h1>
      <div className="grid grid-cols-1 gap-4">
        <Cart className="" />
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
export default Checkout;
