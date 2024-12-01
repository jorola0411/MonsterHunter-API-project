import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Details = () => {
const { category, id } = useParams(); 
const [detail, setDetail] = useState(null);
const [favs, setFavs] = useState( () => {

    const savedFavs = localStorage.getItem("favs");

    return savedFavs ? JSON.parse(savedFavs) : [];
})

const toggleFav = (itemID) => {
    const savedFavs = JSON.parse(localStorage.getItem("favs")) || {};
    const categoryFavs = savedFavs[category] || []; 

    let updatedFavs;
    if (categoryFavs.includes(itemID)) {
    
        updatedFavs = categoryFavs.filter((favId) => favId !== itemID);
    } else {
        
        updatedFavs = [...categoryFavs, itemID];
    }


    const newFavs = { ...savedFavs, [category]: updatedFavs };
    localStorage.setItem("favs", JSON.stringify(newFavs)); 


    setFavs(updatedFavs);
};



useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favs")) || {};
    const categoryFavs = savedFavs[category] || [];
    setFavs(categoryFavs); // Ensure favs is the array of IDs for the current category

    fetch(`https://mhw-db.com/${category}/${id}`)
        .then((response) => response.json())
        .then((data) => setDetail(data))
        .catch((error) => console.error('Error fetching Monster details:', error));
}, [category, id]);

if (!detail) {
    return <div>Loading...</div>;
}
const renderDetails = () => {
switch (category) { //we use a switch case because we need to display different details for each category, such as skills being exclusive to skills and Zenny (how much the item is worth in Monster Hunter Currency) is exclusive to the items category.
    case 'monsters':
        return (
            <div className=" w-2/3 mx-auto">
        <div>
            <h1 className="text-center text-white text-5xl m-5">{detail.name}</h1>
            <p className="text-left mb-5"><strong>Description:</strong> {detail.description}</p>
            <p className="text-left mb-5"><strong>Locations:</strong> {detail.locations?.map((loc) => loc.name).join(', ') || 'Unknown'}</p>
            <p className="text-left mb-5"><strong>Type:</strong> {detail.type}</p>
            <p className="text-left mb-5"><strong>Weaknesses:</strong> {detail.weaknesses?.map((weak) => weak.element).join(', ') || 'None'}</p>
        </div>
        </div>
        );
        case 'skills':
            return (
            <div>
                <h1 className="text-center text-white text-5xl m-5">{detail.name}</h1>
                <p className="text-left mb-5"><strong>Description:</strong> {detail.description}</p>
                <p className="text-left mb-5"><strong>Skills:</strong> {detail.skills?.map((skill) => skill.skillName).join(', ') || 'None'}</p>

            </div>
            );
    case 'items':
        return (
        <div className="w-2/3 mx-auto">
           <h1 className="text-center text-white text-5xl m-5">{detail.name}</h1>
            <p className="text-left mb-5"><strong>Description:</strong> {detail.description || 'No description available'}</p>
            <p className="text-left mb-5"><strong>Rarity:</strong> {detail.rarity}</p>
            <p className="text-left mb-5"><strong>Carry Limit:</strong> {detail.carryLimit}</p>
            <p className="text-left mb-5"><strong>Value:</strong> {detail.value} zenny</p>
        </div>
        );
    case 'charms':
        return (
            <div className="w-2/3 mx-auto">
                <h1 className="text-center text-white text-5xl mb-5">{detail.name}</h1>
                <p className="text-left mb-5"><strong>Rank:</strong> {detail.level}</p>
                <p className="text-left mb-5"><strong>Skills:</strong> {detail.skills?.map((skill) => skill.skillName).join(', ') || 'None'}</p>
                <p className="text-left mb-5"><strong>Rarity:</strong> {detail.rarity}</p>
            </div>
        );

    case 'weapons':
        return (
            <div className="w-2/3 mx-auto">
                <h1 className="text-center text-white text-5xl mb-5">{detail.name}</h1>
                <p className="text-left mb-5"><strong>Type:</strong> {detail.type}</p>
                <p className="text-left mb-5"><strong>Rarity:</strong> {detail.rarity}</p>
                <p className="text-left mb-5"><strong>Attack:</strong> {detail.attack?.display || 'Unknown'}</p>
                <p className="text-left mb-5"><strong>Elements:</strong> {detail.elements?.map((elem) => `${elem.type} (${elem.damage})`).join(', ') || 'None'}</p>
                <p className="text-left mb-5"><strong>Crafting Materials:</strong> {detail.crafting?.materials?.map((mat) => `${mat.item.name} x${mat.quantity}`).join(', ') || 'Unknown'}</p>
            </div>
        );

    case 'armor':
        return (
            <div className="w-2/3 mx-auto">
                <h1 className="text-center text-white text-5xl mb-5">{detail.name}</h1>
                <p className="text-left mb-5"><strong>Type:</strong> {detail.type}</p>
                <p className="text-left mb-5"><strong>Rarity:</strong> {detail.rarity}</p>
                <p className="text-left mb-5"><strong>Defense:</strong> {detail.defense?.base} (Base), {detail.defense?.max} (Max), {detail.defense?.augmented} (Augmented)</p>
                <p className="text-left mb-5"><strong>Resistances:</strong> 
                    {Object.entries(detail.resistances || {}).map(([element, value]) => (
                        <span key={element} className="block">{`${element}: ${value}`}</span>
                    ))}
                </p>
                <p className="text-left mb-5"><strong>Skills:</strong> {detail.skills?.map((skill) => skill.skillName).join(', ') || 'None'}</p>
                <p className="text-left mb-5"><strong>Set Bonus:</strong> {detail.armorSet?.rank || 'None'}</p>
            </div>
        );

    case 'locations':
        return (
            <div className="w-2/3 mx-auto">
                <h1 className="text-center text-white text-5xl mb-5">{detail.name}</h1>
                <p className="text-left mb-5"><strong>Zone Count:</strong> {detail.zoneCount}</p>
            </div>
        );


    default:
        return (
        <div>
            <p>Details for this category are not yet implemented.</p>
        </div>
        );
    }
    
}
return (
    <>
    <div className='min-h-screen'>
        <header className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center"></header>
      {renderDetails()} {/* this calls the renderDetails function we created for each category and item, and displays it.*/}
      <button
    onClick={() => toggleFav(detail.id)}
    className="bg-gray-500 rounded border border-gray-300 text-white m-5 py-2 px-4 hover:bg-gray-600"
>
    {favs.includes(detail.id) ? 'Remove from Favourites' : 'Add to Favourites'}
</button>

      <button className="bg-gray-500 rounded border border-gray-300 text-white m-5 py-2 px-4  hover:bg-gray-600">
      <Link to="/" className="text-white">Back to Home</Link>
      </button>
      </div>
      <footer className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center">
<a href="https://docs.mhw-db.com/#introduction" target="blank"><p>API from the Monster Hunter Database</p> </a>
</footer>
 
    </>
  );
};


export default Details;
