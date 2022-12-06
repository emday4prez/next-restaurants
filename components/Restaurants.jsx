import Link from 'next/link';

function Restaurants({ restaurants, value }) {
  return (
    <>
      <ul className="list-none space-y-4 text-4xl font-bold mb-3">
        {restaurants &&
          restaurants.data
            .filter((restaurant) => {
              if (!value) return true;
              if (
                restaurant.attributes.name
                  .toLowerCase()
                  .includes(value.toLowerCase())
              ) {
                return true;
              }
            })
            .map((restaurant) => {
              return (
                <li
                  className="border-2 border-teal-200 rounded-xl p-4 hover:border-teal-400"
                  key={restaurant.id}
                >
                  <Link href={`restaurant/` + restaurant.id}>
                    <h1 className="text-purple-600">
                      {restaurant.attributes.name}
                    </h1>
                    <p className="text-lg font-light text-indigo-700">
                      {restaurant.attributes.description}
                    </p>
                  </Link>
                </li>
              );
            })}
      </ul>
    </>
  );
}

export default Restaurants;
