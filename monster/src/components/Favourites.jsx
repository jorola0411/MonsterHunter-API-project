import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Favourites() {
  const [category, setCategory] = useState("monsters"); // Default category
  const [favItems, setFavItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favs")) || {};
    const categoryFavs = savedFavs[category] || [];

    if (categoryFavs.length > 0) { {/* the reason we need categoryFavs.length > 0 is to stop the fetch call if there's no favorites. If there is atleast 1 favorite, it will fetch the array to check whatever was favorited.*/}
        fetch(`https://mhw-db.com/${category}`)
            .then((response) => response.json())
            .then((items) => {
                const filteredFavs = items.filter((item) => categoryFavs.includes(item.id));
                setFavItems(filteredFavs);
            })
            .catch((error) => console.log(`Error fetching ${category}:`, error));
    } else {
        setFavItems([]);
    }
}, [category]);

const removeFromFavorites = (itemId) => {
  const savedFavs = JSON.parse(localStorage.getItem("favs")) || {}; //this retrieves the favorites from the local storage
  const categoryFavs = savedFavs[category] || []; // this is the same constant used in the home page, as well as it being declared in the code above, and categoryFavs,

 
  const updatedFavs = categoryFavs.filter((id) => id !== itemId);  // this filters out the item to be removed, if the id doesn't equal the item id, then remove it.

  savedFavs[category] = updatedFavs;  
  localStorage.setItem("favs", JSON.stringify(savedFavs)); // this updates the favs in the LocalStorage, and updatedFavs is there to update the favorites when an item is removed.

  setFavItems((prevItems) => prevItems.filter((item) => item.id !== itemId));  // this line of code updates the state of the category
};


  return (
    <>
    <header className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center"></header>
    <div className="  min-h-screen w-2/3 mx-auto"> 
      <h1 className="text-white text-5xl m-5">My Favourites</h1>
      <div className="flex flex-wrap justify-center mx-auto">
        <button className="text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("monsters")}>Monsters</button>
        <button className="text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("skills")}>Skills</button>
        <button className="text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("items")}>Items</button>
        <button className="text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("charms")}>Charms</button>
        <button className="text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("weapons")}>Weapons</button>
        <button className="text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("armor")}>Armor</button>
        <button className="text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("locations")}>Location</button>
        </div>
      <ul>
        {favItems.map((item) => (
          <li className="text-white" key={item.id}>
            <Link to={`/${category}/${item.id}`}>{item.name}</Link> {/* this links to the detail page to the respective item. item.id is the id in the API, and item.name is both the name of the thing associated with the id and what the user sees.*/}
            <button onClick={() => removeFromFavorites(item.id)} className="bg-gray-500 rounded border border-gray-300 text-white m-5  px-2 hover:bg-gray-600">Remove</button>
          </li>
        ))}
      </ul>
     
     
      <button className="bg-gray-500 rounded border border-gray-300 text-white m-5 py-2 px-4 hover:bg-gray-600">
      <Link to="/">Back to Home</Link>
      </button>
      </div>
      <footer className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center">
<a href="https://docs.mhw-db.com/#introduction" target="blank"><p>API from the Monster Hunter Database</p> </a>
</footer>
    </>

  );
}

export default Favourites;
