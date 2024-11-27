import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favourites() {
  const [savedFavs, setSavedFavs] = useState(() => {
    const favs = localStorage.getItem("favs");
    return favs ? JSON.parse(favs) : [];
  });

  const [category, setCategory] = useState("monsters"); // Default category
  const [favItems, setFavItems] = useState([]);

  useEffect(() => {
    // Fetch items based on the current category
    if (savedFavs.length > 0) {
      fetch(`https://mhw-db.com/${category}`)
        .then((response) => response.json())
        .then((items) => {
          // Log the fetched items and saved favorites for debugging
          console.log('Fetched items:', items);
          console.log('Saved favorites:', savedFavs);

          // Filter out the items that are in the savedFavs list
          const filteredFavs = items.filter((item) => savedFavs.includes(item.id));
          console.log('Filtered favorite items:', filteredFavs); // Debugging line

          setFavItems(filteredFavs);
        })
        .catch((error) => console.log(`Error fetching ${category}:`, error));
    } else {
      setFavItems([]);
    }
  }, [category, savedFavs]);

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
          <option value="locations">Locations</option>
        </select>
      </div>
      <ul>
        {favItems.length > 0 ? (
          favItems.map((item) => (
            <li key={item.id}>
              <Link to={`/${category}/${item.id}`}>{item.name}</Link>
            </li>
          ))
        ) : (
          <p>No favourites in this category.</p>
        )}
      </ul>
      <Link to="/">Back to Home</Link>
    </>
  );
}

export default Favourites;
