import React from 'react';
import { Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: 'white', padding: '20px', borderTop: '3px solid #f5f5f5' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        <Link color="inherit" href="/refund-policy">
          Refund Policy
        </Link>
        {' | '}
        <Link color="inherit" href="/privacy-policy">
          Privacy Policy
        </Link>
        {' | '}
        <Link color="inherit" href="/terms-of-use">
          Terms of Use
        </Link>
      </Typography>
    </footer>
  );
};

export default Footer;