import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Favourites() {
  const [category, setCategory] = useState("monsters"); // Default category
  const [favItems, setFavItems] = useState([]);
  
  useEffect(() => {
    const savedFavs = localStorage.getItem(category);
    const parsedFavs = savedFavs ? JSON.parse(savedFavs) : [];

    if (parsedFavs.length > 0) {
      fetch(`https://mhw-db.com/${category}`)
        .then((response) => response.json())
        .then((items) => {
         
          const filteredFavs = items.filter((item) => parsedFavs.includes(item.id));
          setFavItems(filteredFavs);
        })
        .catch((error) => console.log(`Error fetching ${category}:`, error));
    } else {
      setFavItems([]); 
    }
  }, [category]); 

  return (
    <>
      <h1>My Favourites</h1>
      <div>
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="monsters">Monsters</option>
          <option value="skills">Skills</option>
          <option value="items">Items</option>
          <option value="charms">Charms</option>
          <option value="weapons">Weapons</option>
          <option value="armor">Armor</option>
          <option value="locations">Location</option>
        </select>
      </div>
      <ul>
        {favItems.map((item) => (
          <li key={item.id}>
            <Link to={`/${category}/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Home</Link>
    </>
  );
}

export default Favourites;
