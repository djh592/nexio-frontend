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
          px: 4,
          py: 3,
          boxShadow: 'none',
        }
      }
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 1 }}
      >
        Sign up
      </Typography>
      <SignupForm />
      <Typography
        variant="body2"
        sx={{ alignSelf: 'center', mt: 1 }}
      >
        {"Already have an account? "}
        <Link href="/signin" passHref>
          Login
        </Link >
      </Typography>
    </Paper >
  );
}
