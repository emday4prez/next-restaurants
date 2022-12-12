import RestaurantsList from '../components/RestaurantsList';
import { fetcher } from '../lib/api';
import useSWR from 'swr';
import { useState } from 'react';

export default function Home({ restaurants }) {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/restaurants?pagination[page]=${pageIndex}&pagination[pageSize]=5&sort=name`,
    fetcher,
    { fallbackData: restaurants }
  );
  return (
    <>
      <RestaurantsList restaurants={data} />
      <div className="space-x-2 space-y-2">
        <button
          className={`md:p-2 rounded py-2 text-white p-2 ${
            pageIndex === 1 ? 'bg-gray-300' : 'bg-purple-400'
          }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Previous
        </button>
        <button
          className={`md:p-2 rounded py-2 text-white p-2 ${
            pageIndex === (data && data.meta.pagination.pageCount)
              ? 'bg-gray-300'
              : 'bg-purple-400'
          }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
        <span>{`${pageIndex} of ${
          data && data.meta.pagination.pageCount
        }`}</span>
      </div>
    </>
  );
}

// export async function getServerSideProps() {}

export async function getStaticProps() {
  const restaurantsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/restaurants?pagination[page]=1&pagination[pageSize]=5&populate=%2A&sort=name`
  );

  return {
    props: {
      restaurants: restaurantsResponse,
    },
  };
}
