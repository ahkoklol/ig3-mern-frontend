import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Ensure this delay matches the drawer animation duration
    }
  }, [open]);

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
      )}
      <Drawer anchor="right" open={open} onClose={handleToggleChat}>
        <div style={{ width: '350px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Typography style={{ display: 'flex', padding: '20px', alignItems: 'center', borderBottom: '1px solid #ccc' }}>General Chat</Typography>
          <List style={{ flexGrow: 1, overflowY: 'auto', padding: '0 20px' }}>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${msg.user}: ${msg.text}`} />
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
          <form onSubmit={sendMessage} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '20px', borderTop: '1px solid #ccc' }}>
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
