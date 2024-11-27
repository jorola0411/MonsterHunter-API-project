import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function MonsterDetails() {
    const { id } = useParams();
    const [monster, setMonster] = useState(null);

    useEffect(() => {
        fetch(`https://mhw-db.com/monsters/${id}`)
            .then(response => response.json())
            .then(data => setMonster(data))
            .catch(error => console.error('Error fetching Monster details:', error));
    }, []);

    if (!monster) {
        return <div>Loading...</div>;
    }
    return (
        <div>
          <h1>{monster.name}</h1>
          <p>Type: {monster.type}</p>
          <p>Description: {monster.description}</p>
          <p>{monster.species}</p>
          <h3>Locations</h3>
          <ul>
            {monster.locations.map((location) => (
              <li key={location.id}>{location.name}</li>
            ))}
          </ul>
          <button onClick={() => saveToFavorites(monster)}>Add to Favorites</button>
      
    
        <Link to="/">Back to Home</Link>
        </div>
    )
    }
    
    export default MonsterDetails;