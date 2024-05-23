import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Class {
  _id: string;
  name: string;
  teacher: string;
  students: string[];
}

interface User {
  _id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  dateJoined: Date;
  class: string;
}

const ClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userFormData, setUserFormData] = useState<Partial<User>>({});
  const [submitStatus, setSubmitStatus] = useState<{ status: 'idle' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/allclasses`);
        setClasses(response.data);
      } catch (error) {
        console.error('Failed to fetch classes', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/allusers`);
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchClasses();
    fetchUsers();
  }, []);

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUserId(user._id);
    setUserFormData(user);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setUserFormData({});
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/${editingUserId}`, userFormData);
      setUsers(users.map(user => user._id === editingUserId ? response.data : user));
      setEditingUserId(null);
      setUserFormData({});
      setSubmitStatus({ status: 'success', message: 'User updated successfully!' });
      toast.success('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      setSubmitStatus({ status: 'error', message: 'Failed to update user. Please try again.' });
      toast.error('Failed to update user. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ color: 'black', marginTop: '50px', marginBottom: '30px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Classes
      </Typography>
      <Paper elevation={3}>
        <List>
          {classes.map((cls) => (
            <ListItem key={cls._id} component={Link} to={`/class/${cls._id}/students`} button>
              <ListItemText primary={`Class: ${cls.name}`} secondary={`Teacher: ${cls.teacher}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Typography variant="h4" component="h1" gutterBottom style={{ marginTop: '30px' }}>
        Users
      </Typography>
      <Paper elevation={3}>
        <List>
          {users.map((user) => (
            <ListItem key={user._id}>
              {editingUserId === user._id ? (
                <form onSubmit={handleSaveUser}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={userFormData.email || ''}
                    onChange={handleUserInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={userFormData.name || ''}
                    onChange={handleUserInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Surname"
                    variant="outlined"
                    name="surname"
                    value={userFormData.surname || ''}
                    onChange={handleUserInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Role"
                    variant="outlined"
                    name="role"
                    value={userFormData.role || ''}
                    onChange={handleUserInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Class"
                    variant="outlined"
                    name="class"
                    value={userFormData.class || ''}
                    onChange={handleUserInputChange}
                    margin="normal"
                  />
                  <Button type="submit" variant="contained" color="primary" sx={{ marginRight: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'} }}>
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancelEdit} sx={{backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'rgb(153, 0, 0)', borderColor: 'rgb(153, 0, 0)'}}}>
                    Cancel
                  </Button>
                </form>
              ) : (
                <>
                  <ListItemText 
                    primary={`${user.name} ${user.surname} (${user.role})`} 
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          ID: {user._id} <br />
                          Email: {user.email} <br />
                          Joined: {new Date(user.dateJoined).toLocaleDateString()} <br />
                          Class: {user.class ? user.class : 'N/A'}
                        </Typography>
                      </>
                    }
                  />
                  <Button variant="contained" color="primary" onClick={() => handleEditUser(user)} sx={{ marginTop: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>
                    Edit
                  </Button>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
      {submitStatus.status !== 'idle' && (
        <Alert severity={submitStatus.status === 'error' ? 'error' : 'success'} style={{ marginTop: '20px' }}>
          {submitStatus.message}
        </Alert>
      )}
    </Container>
  );
};

export default ClassesPage;
