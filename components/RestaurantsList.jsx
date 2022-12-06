import Restaurants from './Restaurants';
import { useState } from 'react';
function RestaurantsList({ restaurants }) {
  const [value, setValue] = useState('');

  console.log('restaurants list:', restaurants);
  return (
    <div>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 py-2">
          Restaurants
        </span>
      </h1>

      <input
        type="search"
        name="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="md:p-2 form-input py-2 mb-6 rounded  text-slate-900"
      />

      <Restaurants restaurants={restaurants} value={value} />
    </div>
  );
}

export default RestaurantsList;
