import { io } from 'socket.io-client';

const urls = {
    server1: "http://localhost:5000",
    server2: import.meta.env.VITE_BACKEND_URL
};

// Create multiple socket instances
const sockets = {
    server1: io(urls.server1),
    server2: io(urls.server2),
};

export default sockets;