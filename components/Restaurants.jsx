import Link from 'next/link'

function Restaurants({ restaurants }) {
  return (
    <>
      <ul className="list-none space-y-4 text-4xl font-bold mb-3">
        {restaurants &&
          restaurants.data.map((restaurant) => {
            return (
              <li key={restaurant.id}>
                <Link href={`restaurant/` + restaurant.id}>
                  {restaurant.attributes.name}
                </Link>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default Restaurants
