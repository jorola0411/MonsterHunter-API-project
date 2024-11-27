import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { category, id } = useParams(); // Fetch category and id from the URL params
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetail();
  }, [category, id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://mhw-db.com/${category}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch detail');
      const data = await response.json();
      setDetail(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderDetail = () => {
    if (!detail) return null;

    switch (category) {
      case 'monsters':
        return (
          <div>
            <h2>{detail.name}</h2>
            <p><strong>Description:</strong> {detail.description}</p>
            <p><strong>Locations:</strong> {detail.locations?.map((loc) => loc.name).join(', ') || 'Unknown'}</p>
            <p><strong>Type:</strong> {detail.type}</p>
            <p><strong>Weaknesses:</strong> {detail.weaknesses?.map((weak) => weak.element).join(', ') || 'None'}</p>
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
          </div>
        );
      case 'charms':
        return (
          <div>
            <h2>{detail.name}</h2>
            <p><strong>Rank:</strong> {detail.rank}</p>
            <p><strong>Skills:</strong> {detail.skills?.map((skill) => skill.skillName).join(', ') || 'None'}</p>
            <p><strong>Rarity:</strong> {detail.rarity}</p>
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

  return (
    <div>
      <h1>Detail Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && renderDetail()}
    </div>
  );
};

export default DetailPage;
