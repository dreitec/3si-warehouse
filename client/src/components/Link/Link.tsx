import { Typography, Link, styled } from "@mui/material";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingBottom: theme.spacing(2),
  textDecoration: "none",
  ":hover": {
    borderBottom: `3px solid ${theme.palette.text.primary}`,
  },
}));

interface Props {
  href: string;
  children: any;
}

const LinkComponent = (props: Props) => {
  const { href, children } = props;

  return (
    <Typography variant="h6" component="p" align="right">
      <StyledLink href={href}>{children}</StyledLink>
    </Typography>
  );
};

export default LinkComponent;
