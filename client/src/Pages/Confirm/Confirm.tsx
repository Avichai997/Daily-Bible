import { Box, Button, Typography } from '@mui/material';
import { MarkEmailUnread } from '@mui/icons-material';
import { useAuth } from '@ApiService/Requests/useAuth';
import { useUser } from '@ApiService/Requests/useUser';

const Confirm = () => {
  const { sendConfirmEmail } = useAuth();
  const { user } = useUser();

  return (
    <Box
      sx={{
        marginTop: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <MarkEmailUnread sx={{ fontSize: 100 }} color='action' />
      <Typography variant='h3' gutterBottom>
        נישלח אליך מייל לאימות כתובת האימייל איתה נרשמת.
      </Typography>
      <Typography variant='h3' gutterBottom>
        בבקשה תאשר את כתובת המייל שלך כדי להתחבר.
      </Typography>

      {/* resend email confirmation */}
      {user?.email && (
        <Button
          onClick={() => sendConfirmEmail({ email: user.email })}
          variant='contained'
          sx={{ fontSize: 20 }}
          color='error'
        >
          שלח שוב מייל לאימות
        </Button>
      )}
    </Box>
  );
};

export default Confirm;
