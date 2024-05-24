import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { IconButton, Drawer, TextField, Button, List, ListItem, Typography, Box } from '@mui/material';
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
        onClick: handleToggleChat, // Open the chat drawer when the toast is clicked
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
          <Typography style={{ display: 'flex', padding: '30px', alignItems: 'center', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>General Chat</Typography>
          <List style={{ flexGrow: 1, overflowY: 'auto', padding: '0 20px', overflowX: 'hidden', marginTop: '20px', marginBottom: '10px' }}>
            {messages.map((msg, index) => (
              <ListItem key={index} style={{ wordBreak: 'break-word', justifyContent: msg.user === username ? 'flex-end' : 'flex-start' }}>
                <Box
                  sx={{
                    display: 'inline-block',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: msg.user === username ? '#d1e8ff' : '#f7f7f7',
                    color: msg.user === username ? 'black' : 'black',
                    maxWidth: '70%',
                    wordBreak: 'break-word',
                    textAlign: msg.user === username ? 'right' : 'left'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {msg.user}
                  </Typography>
                  <Typography variant="body1">
                    {msg.text}
                  </Typography>
                </Box>
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
