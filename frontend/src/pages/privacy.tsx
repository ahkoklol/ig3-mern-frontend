import React from 'react';
import { Container, Typography } from '@mui/material';

const PrivacyPolicyPage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Typography variant="h3" sx={{ mt: 4, color: 'black' }}>
        Privacy Policy
        <br />
        
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
      Welcome to TOEIC Solo Leveling, a TOEIC preparation platform. We are committed to protecting your privacy and handling your personal information transparently. This Privacy Policy outlines how we collect, use, and protect your information when you use our website and services.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Information Collection</b>
        <br />
        We collect information that you provide when registering, such as your name, email address, and details about your TOEIC preparation needs. We may also collect usage data to improve our services.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Use of Information</b>
        <br />
        Your information is used to personalize your experience, provide customer support, improve our website, and communicate with you about our services, including updates and promotions.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Data Protection</b>
        <br />
        We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Cookies</b>
        <br />
        We use cookies to enhance your experience, gather general visitor information, and track visits to our website.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Sharing of Information</b>
        <br />
        We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Your Rights</b>
        <br />
        You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Changes to Privacy Policy</b>
        <br />
        We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Contact Us</b>
        <br />
        If you have any questions about this Privacy Policy, please contact us at wayne.wan-chow-wah@etu.umontpellier.fr
      </Typography>
    </Container>
  );
};

export default PrivacyPolicyPage;