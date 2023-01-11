import DishesList from '../../components/DishesList';
import { fetcher } from '../../lib/api';
import { useState } from 'react';
import Cart from '../../components/Cart';
import Link from 'next/link';
export default function Restaurant({ restaurant, dishes }) {
  const [value, setValue] = useState('');
  return (
    <>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter">
        {restaurant && (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            {restaurant.attributes.name}
          </span>
        )}
      </h1>
      {restaurant && (
        <p className="text-sm md:text-lg leading-tight mb-6">
          {restaurant.attributes.description}
        </p>
      )}
      <input
        type="search"
        name="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="md:p-2 form-input py-2 mb-6 rounded  text-slate-900"
      />
      {dishes && <DishesList dishes={dishes} value={value} />}
      <div className="grid grid-cols-1 mt-4">
        <Cart />
        <Link
          className="btn btn-ghost bg-purple-400 md:w-1/2 justify-self-center"
          href="/checkout"
        >
          go to checkout
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const restaurantResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/restaurants/${id}?populate=%2A`
  );

  return {
    props: {
      restaurant: restaurantResponse.data,
      dishes: restaurantResponse.data.attributes.dishes.data,
    },
  };
}
