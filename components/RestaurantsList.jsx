import Restaurants from './Restaurants'

function RestaurantsList({ restaurants }) {
  //console.log(`restaurants`, restaurants)
  return (
    <div>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 py2">
          Restaurants
        </span>
      </h1>
      <Restaurants restaurants={restaurants} />
    </div>
  )
}

export default RestaurantsList
