import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";

function Home() {
    const [ data, setData ] = useState([]) // this line of codes holds the fetched data of monsters, items, etc.
    const [ category, setCategory] = useState('monsters'); // This is the default category when the user loads the page.
    const [searchTerm, setSearchTerm] = useState("");



    useEffect(() => {
        // This function fetches the API as well as filter the data for the sear
        const fetchAndFilterData = async () => {
          try {
            const response = await fetch(`https://mhw-db.com/${category}`);
            const allData = await response.json();
    
            // This line of code filters the search by ideas
            const filteredData = allData.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
    
            setData(filteredData);
          } catch (error) {
            console.error(`Error fetching ${category}:`, error);
          }
        };
    
        fetchAndFilterData();
      }, [category, searchTerm]); // The line of code reruns if the category or search changes.
    
    return(
        <>
        <h1> Welcome to the Monster Hunter World database!</h1>
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

        <input type="text"
        placeholder={`Search for ${category}`}
        value={searchTerm}
        onChange={(event) => {setSearchTerm(event.target.value)}}
         />
         
         <Link to="/favourites">View Favourites</Link>
         <div className="card-container">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
           
            <p>
              <Link to={`/${category}/${item.id}`}>View Details</Link>
            </p>
          </div>
        ))}
      </div>
       
        </>
    )
}

export default Home;