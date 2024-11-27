import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Details = () => {
const { category, id } = useParams(); // Fetch category and id from the URL params
const [detail, setDetail] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [favs, setFavs] = useState( () => {

    const savedFavs = localStorage.getItem("favs");

    return savedFavs ? JSON.parse(savedFavs) : [];
})

const toggleFav = (itemID) => {

    let filteredFavs;

    if(favs.includes(itemID)) {

        filteredFavs = favs.filter(favId => favId !== itemID );
    } else {

        filteredFavs = [...favs, itemID];
    }
    localStorage.setItem("favs", JSON.stringify(filteredFavs));
    setFavs(filteredFavs)
}

useEffect(() => {
    fetch(`https://mhw-db.com/${category}/${id}`)
        .then(response => response.json())
        .then(data => setDetail(data))
        .catch(error => console.error('Error fetching Monster details:', error));
}, []);

if (!detail) {
    return <div>Loading...</div>;
}
switch (category) {
    case 'monsters':
        return (
        <div>
            <h2>{detail.name}</h2>
            <p><strong>Description:</strong> {detail.description}</p>
            <p><strong>Locations:</strong> {detail.locations?.map((loc) => loc.name).join(', ') || 'Unknown'}</p>
            <p><strong>Type:</strong> {detail.type}</p>
            <p><strong>Weaknesses:</strong> {detail.weaknesses?.map((weak) => weak.element).join(', ') || 'None'}</p>
              <button onClick={ ()=> { toggleFav(detail.id)}}>
                        { favs.includes(detail.id) ? "Remove Fav" : "Add Fav"}
                    </button>
            <Link to="/">Back to Home</Link>
        </div>
        );
    case 'items':
        return (
        <div>
            <h2>{detail.name}</h2>
            <p><strong>Description:</strong> {detail.description || 'No description available'}</p>
            <p><strong>Rarity:</strong> {detail.rarity}</p>
            <p><strong>Carry Limit:</strong> {detail.carryLimit}</p>
            <p><strong>Value:</strong> {detail.value} zenny</p>
            <button onClick={ ()=> { toggleFav(detail.id)}}>
                        { favs.includes(detail.id) ? "Remove Fav" : "Add Fav"}
                    </button>
            <Link to="/">Back to Home</Link>
        </div>
        );
    case 'charms':
        return (
        <div>
            <h2>{detail.name}</h2>
            <p><strong>Rank:</strong> {detail.rank}</p>
            <p><strong>Skills:</strong> {detail.skills?.map((skill) => skill.skillName).join(', ') || 'None'}</p>
            <p><strong>Rarity:</strong> {detail.rarity}</p>
            <button onClick={ ()=> { toggleFav(detail.id)}}>
                        { favs.includes(detail.id) ? "Remove Fav" : "Add Fav"}
                    </button>
        </div>
        );
    default:
        return (
        <div>
            <h2>{detail.name}</h2>
            <p>Details for this category are not yet implemented.</p>
        </div>
        );
    }
    
};

export default Details;
