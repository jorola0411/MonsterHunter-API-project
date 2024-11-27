import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";

function Home() {
    const [ data, setData ] = useState([]) // this line of codes holds the fetched data of monsters, items, etc.
    
    const [ category, setCategory] = useState('monsters'); // This is the default category when the user loads the page.

    const [searchTerm, setSearchTerm] = useState("");



    const searchData = () => {

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
        setData(filteredData);
    }
    



    useEffect( () => {

        fetch(`https://mhw-db.com/${category}`)
        .then( (response) =>{
            return response.json();
        })
        .then( (dataObj) => {
            setData(dataObj);
        })
        .catch( (error) => {
            console.log('Error fetching ${category}!')
        })
    }, [category] ); //when the category changes, this line of code refetchs the data.

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
         <button onClick={searchData}>Search</button>

         <ul>
            {data.map((item) => {
                return(
                <li key={item.id}> 
                    <Link to={`/${category}/${item.id}`}>{item.name}</Link>

                </li>
                )
            })}
        </ul>
        <Link to="/favourites">View Favourites</Link>
        </>
    )
}

export default Home;