import RestaurantsList from '../components/RestaurantsList'
import { fetcher } from '../lib/api'

export default function Home({ restaurants }) {
  return (
    <>
      <RestaurantsList restaurants={restaurants} />
    </>
  )
}

// export async function getServerSideProps() {}

export async function getStaticProps() {
  const restaurantsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/restaurants`
  )
  // console.log(restaurantsResponse)
  return {
    props: {
      restaurants: restaurantsResponse,
    },
  }
}
