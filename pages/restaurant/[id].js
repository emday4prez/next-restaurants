import { fetcher } from '../../lib/api';

export default function Restaurant({ restaurant, dishes }) {
  return (
    <>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          {restaurant.attributes.name}
        </span>
      </h1>
      <h2 className="text-xl md:text-2xl leading-tight mb-2">
        {restaurant.attributes.description}
      </h2>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const restaurantResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/restaurants/${id}?populate=%2A`
  );
  console.log('restaurantResponse', restaurantResponse);
  return {
    props: {
      restaurant: restaurantResponse.data,
      dishes: restaurantResponse.data.attributes.dishes.data,
    },
  };
}
