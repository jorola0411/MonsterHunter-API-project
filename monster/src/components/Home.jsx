import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";

function Home() {
    const [ data, setData ] = useState([]) // this line of codes holds the fetched data of monsters, items, etc.
    const [ category, setCategory] = useState('monsters'); // This is the default category when the user loads the page.
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        
        const fetchAndFilterData = async () => { // This function fetches the API as well as filter the data for the search
          setLoading(true); //while the data is loading, it sets the function to true, which displays the word "Loading"

          try {
            const response = await fetch(`https://mhw-db.com/${category}`);
            const allData = await response.json();
    
            // This line of code filters the search by letters and makes sure the search isn't case sensitive, the api will recognize Potion or potion from the search bar as potion in the API data 
            const filteredData = allData.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          
            const displayData = filteredData.slice(0,20) //.slice reduces the results displayed to 20.
            setData(displayData);
          } catch (error) {
            console.error(`Error fetching ${category}:`, error);
          } finally {
            setLoading(false); // End the loading.
          }
        };
    
        fetchAndFilterData();
      }, [category, searchTerm]); // The line of code reruns if the category or search changes.

    return(
        <>
         <header className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center">
        <div className="flex flex-wrap justify-center md:justify-start">
        <button className="px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("monsters")}>Monsters</button>
        <button className="px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("skills")}>Skills</button>
        <button className="px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("items")}>Items</button>
        <button className="px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("charms")}>Charms</button>
        <button className="px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("weapons")}>Weapons</button>
        <button className="px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("armor")}>Armor</button>
        <button className="px-4 py-2 rounded hover:bg-gray-400 transition duration-200" onClick={() =>setCategory("locations")}>Location</button>
        </div>
       
        <input type="text" className="w-full md:w-auto px-4 py-2 rounded text-black" placeholder={`Search for ${category}`} value={searchTerm} onChange={(event) => {setSearchTerm(event.target.value)}}/>
        </header>
  
        <div className="  min-h-screen w-2/3 mx-auto">
         <h1 className="text-center text-white text-5xl mt-5 "> Welcome to the Monster Hunter World database!</h1>
         <button className="bg-gray-500 rounded border border-gray-300 text-white m-5 py-2 px-4 hover:bg-gray-600">
         <Link to="/favourites">View Favourites</Link>
         </button>

         {loading && (
        <div className="text-3xl text-white text-center font-bold">Loading...</div>
        )}

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
  {data.map((item) => (
    <div
      key={item.id}
      className="bg-gray-700 border border-gray-300 rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105 hover:shadow-lg">
      <h2 className="text-xl font-bold text-white mb-2">{item.name}</h2>
      <p>
        <Link to={`/${category}/${item.id}`} className="text-blue-400 font-semibold hover:underline">
          View Details
        </Link>
      </p>
    </div>
    
  ))}
</div>
</div>
<footer className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center">
<a href="https://docs.mhw-db.com/#introduction" target="blank"><p>API from the Monster Hunter Database</p> </a>
</footer>
          
      
    
        </>
    )
}

export default Home;