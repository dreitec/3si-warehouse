import Link from "next/link";
import { Typography, styled, Theme } from "@mui/material";

interface StyledAnchorProps extends React.HTMLAttributes<HTMLAnchorElement> {
  isActive: boolean;
  theme?: Theme;
  color: "text" | "primary";
  variant: "normal" | "spaced";
}
const StyledLink = styled("a", {
  shouldForwardProp: (prop: string) => prop !== "isActive",
})((props: StyledAnchorProps) => {
  const { isActive, theme, color, variant } = props;
  if (!theme) {
    return {};
  }
  let specific = {};
  if (variant === "spaced") {
    specific = {
      display: "inline-block",
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      borderBottom: isActive
        ? `1px solid ${
            color === "primary"
              ? theme.palette.primary.main
              : theme.palette.text.primary
          }`
        : "none",
    };
  } else {
    specific = {
      borderBottom: isActive
        ? `3px solid ${
            color === "primary"
              ? theme.palette.primary.main
              : theme.palette.text.primary
          }`
        : "none",
    };
  }
  return {
    ...specific,
    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
    paddingBottom: theme.spacing(2),
    textDecoration: "none",
    ":hover": {
      borderBottom: `${variant === "spaced" ? 1 : 3}px solid ${
        color === "primary"
          ? theme.palette.primary.main
          : theme.palette.text.primary
      }`,
      color:
        color === "primary"
          ? theme.palette.primary.main
          : theme.palette.text.primary,
    },
  };
});

interface Props {
  href: string;
  children: any;
  active: boolean;
  color?: "text" | "primary" | undefined;
  variant?: "normal" | "spaced";
}

const LinkComponent = (props: Props) => {
  const { href, children, active, color = "text", variant = "normal" } = props;

  return (
    <Link href={href} passHref>
      <StyledLink isActive={active} color={color} variant={variant}>
        {children}
      </StyledLink>
    </Link>
  );
};

export default LinkComponent;
