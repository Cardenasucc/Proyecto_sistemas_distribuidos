import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MEMBERSHIPS } from '../../graphql/queries';

const Memberships = () => {
  const { loading, error, data } = useQuery(GET_MEMBERSHIPS);

  if (loading) return <p>Loading memberships...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Memberships</h2>
      <ul>
        {data.memberships.map(membership => (
          <li key={membership.id}>
            Type: {membership.type} - Price: ${membership.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Memberships;