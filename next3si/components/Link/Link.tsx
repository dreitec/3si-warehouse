import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import styled from "@mui/system/styled";

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
  align: "right" | "inherit" | "left" | "center" | "justify" | undefined;
}

const LinkComponent = (props: Props) => {
  const { href, children, align } = props;

  return (
    <Typography variant="h6" component="p" align={align}>
      <StyledLink href={href}>{children}</StyledLink>
    </Typography>
  );
};

export default LinkComponent;
