import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../graphql/queries';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <List>
        {data.users.map(user => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Users;