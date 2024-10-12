import { Paper, Typography } from "@mui/material";
import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <Paper
      sx={
        {
          height: '100%',
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          padding: 4,
        }
      }
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 2 }}
      >
        Sign up
      </Typography>
      <SignupForm />
      <Typography
        variant="body2"
        sx={{ alignSelf: 'center', mt: 2 }}
      >
        {"Already have an account? "}
        <Link href="/signin" passHref>
          Login
        </Link >
      </Typography>
    </Paper >
  );
}
