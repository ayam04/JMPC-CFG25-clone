// Example in a page component (pages/volunteers.js)
'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import VolunteerCard from '../../components/VolunteerCard';
import { db } from '../../utils/firebase';

function VolunteersPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "volunteers"));
        const volunteerList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVolunteers(volunteerList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching volunteers:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) {
    return <div>Loading volunteers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Volunteers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {volunteers.map(volunteer => (
          <VolunteerCard key={volunteer.id} volunteer={volunteer} />
        ))}
      </div>
    </div>
  );
}

export default VolunteersPage;