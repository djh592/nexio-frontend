import { Paper, Typography } from "@mui/material";
import SigninForm from "@/components/auth/SigninForm";
import Link from "next/link";

export default function SigninPage() {
  return (
    <Paper
      sx={
        {
          height: '100%',
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          padding: 4,
          boxShadow: 'none',
        }
      }
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 2 }}
      >
        Sign in
      </Typography>
      <SigninForm />
      <Typography
        variant="body2"
        sx={{ alignSelf: 'center', mt: 2 }}
      >
        {"New to Nexio? "}
        <Link href="/signup" passHref>
          Sign up
        </Link >
      </Typography>
    </Paper >
  );
}
