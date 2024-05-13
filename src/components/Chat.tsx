import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { IconButton, Drawer, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useProfile } from "../hooks/useProfile";
import { useAuthContext } from '../hooks/useAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket: Socket = io(import.meta.env.VITE_BACKEND_URL);

const Chat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ user: string; text: string }>>([]);

  const { profile } = useProfile();
  const { user } = useAuthContext();

  useEffect(() => {
    if (profile && profile.name && profile.surname) {
        setUsername(`${profile.name} ${profile.surname}`);
      }
  }, [profile]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
      // Display a toast notification for each new message
      toast.info(`New message from ${msg.user}: ${msg.text}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleToggleChat = () => setOpen(!open);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message && username) {
      socket.emit('chat message', { user: username, text: message });
      setMessages(prevMessages => [...prevMessages, { user: username, text: message }]);
        setMessage('');
    }
  };

  return (
    <>
    {user && (
      <IconButton onClick={handleToggleChat} color="primary" aria-label="chat" sx={{ color: 'blue', marginBottom: '10px' }}>
        <ChatIcon />
      </IconButton>
    )};
      <Drawer anchor="right" open={open} onClose={handleToggleChat}>
        <div style={{ width: '350px', padding: '20px' }}>
          <Typography>General Chat</Typography>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${msg.user}: ${msg.text}`} />
              </ListItem>
            ))}
          </List>
          <form onSubmit={sendMessage} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TextField
              label="Message"
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Button type="submit" color="primary" variant="contained">Send</Button>
          </form>
        </div>
      </Drawer>
      <ToastContainer />
    </>
  );
};

export default Chat;