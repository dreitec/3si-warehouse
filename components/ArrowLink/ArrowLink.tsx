import Link from "next/link";
import styled from "@mui/system/styled";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const StyledLink = styled("a")(({ theme, color }) => {
  return {
    color: color ? color : theme.palette.primary.main,
    paddingBottom: theme.spacing(2),
    fontWeight: "bold",
    textDecoration: "none",
    ":hover": {
      borderBottom: `3px solid ${color ? color : theme.palette.primary.main}`,
    },
  };
});

const StyledArrowIcon = styled(ArrowRightAltIcon)(() => ({
  position: "relative",
  top: 8,
  left: 14,
}));

interface Props {
  href: string;
  children: any;
  color?: string;
}

const LinkComponent = (props: Props) => {
  const { href, children, color } = props;

  return (
    <Link href={href} passHref>
      <StyledLink color={color}>
        {children} <StyledArrowIcon />
      </StyledLink>
    </Link>
  );
};

export default LinkComponent;
