function DishesList({ dishes, value }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {dishes &&
        dishes
          .filter((dish) => {
            if (!value) return true;
            if (
              dish.attributes.name.toLowerCase().includes(value.toLowerCase())
            ) {
              return true;
            }
          })
          .map((dish) => {
            return (
              <div
                key={dish.id}
                className="card lg:w-48 bg-purple-600 text-teal-100"
              >
                <div className="card-body">
                  <h2 className="card-title text-2xl">
                    {dish.attributes.name}
                  </h2>
                  <p className="text-sm">{dish.attributes.description}</p>
                  <p className="text-lg">${dish.attributes.price}</p>
                  <div className="card-actions justify-end">
                    <button className="btn">Add to Cart</button>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default DishesList;
