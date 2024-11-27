import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {

    const [ monsters, setMonsters] = useState([]);

    const [searchTerm, setSearchTerm] = useState("")

    const [favs, setFavs] = useState( () => {

        const savedFavs = localStorage.getItem("favs");

        return savedFavs ? JSON.parse(savedFavs) : [];
    })

    const searchMonsters = () => {

        fetch("https://mhw-db.com/monsters")
        .then( response => response.json())
        .then( monsterArray => {

            const filteredMonsters = monstersArray/filter( (loopMonster) => {
                
                return loopMonster.title.toLowerCase().includes
                (searchTerm.toLowerCase());
            });

            setMonsters(filteredMonsters)
        })
    }

    const toggleFav = (monsterID) => {

        let filteredFavs;

        if(favs.includes(monsterID)) {

            filteredFavs = favs.filter(favId => favId !== monsterID );
        } else {

            filteredFavs = [...favs, monsterID];
        }
        localStorage.setItem("favs", JSON.stringify(filteredFavs));
        setFavs(filteredFavs)
    }

    useEffect( () => {

        fetch("https://mhw-db.com/monsters")
        .then( (response) =>{
            return response.json();
        })
        .then( (dataObj) => {
            setMonsters(dataObj);
        })
        .catch( (error) => {
            console.log('Error fetching monsters!')
        })
    }, [] );

    return(
        <>
        <h1> Welcome to the Monster Hunter World database!</h1>
        <input type="text"
        placeholder="Search for a monster!"
        value={searchTerm}
        onChange={(event) => {setSearchTerm( event.target.value)}}
         />
         <button onClick={searchMonsters}>Search</button>
         <ul>
            {monsters.map( (monster) => {
                return(
                <li key={monster.id}> 
                    <Link to={`/monster/${monster.id}`}>{monster.name}</Link>

                    <button onClick={ ()=> { toggleFav(monster.id)}}>
                        { favs.includes(monster.id) ? "Remove Fav" : "Add Fav"}
                    </button>
                </li>
                )
            })}
        </ul>
        <Link to="/favourites">View Favourites</Link>
        </>
    )
}

export default Home;