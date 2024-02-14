import { Container, Typography } from '@mui/material';

const TermsPage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Typography variant="h3" sx={{ mt: 4, color: 'black' }}>
        Terms of use
        <br />
        
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
      Welcome to TOEIC Solo Leveling. By accessing our website and using our TOEIC preparation services, you agree to comply with and be bound by the following terms and conditions of use.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Use License</b>
        <br />
        We grant you a limited license to access and make personal use of our TOEIC preparation materials. This license does not include any resale or commercial use of our service or its contents.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Account Responsibility</b>
        <br />
        You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Limitations of Liability</b>
        <br />
        TOEIC Solo Leveling will not be liable for any damages arising from the use of this website or from any information, content, materials, or services included on or otherwise made available to you.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Governing Law</b>
        <br />
        Any claim relating to TOEIC Solo Leveling's website shall be governed by the laws of France without regard to its conflict of law provisions.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Changes to Terms of Use</b>
        <br />
        We reserve the right to make changes to our website, policies, and these Terms of Use at any time.
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify', color: 'black' }}>
        <b>Contact Us</b>
        <br />
        For any questions regarding these Terms of Use, please contact us at wayne.wan-chow-wah@etu.umontpellier.fr
      </Typography>

    </Container>
  );
};

export default TermsPage;