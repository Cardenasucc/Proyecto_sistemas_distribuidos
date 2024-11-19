import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../graphql/queries';

const Orders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {data.orders.map(order => (
          <li key={order.id}>Order ID: {order.id}, Product: {order.product}, Date: {order.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;