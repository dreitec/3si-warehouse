import Link from "next/link";
import { Typography, styled, Theme } from "@mui/material";

interface StyledAnchorProps extends React.HTMLAttributes<HTMLAnchorElement> {
  isActive: boolean;
  theme?: Theme;
  color: "text" | "primary";
  variant: "normal" | "spaced" | "buttoned";
  textAlign: string;
}
const notAllowed = ["textAlign", "variant", "isActive"];
const StyledLink = styled("a", {
  shouldForwardProp: (prop: string) => !notAllowed.includes(prop),
})((props: StyledAnchorProps) => {
  const { isActive, theme, color, variant, textAlign } = props;
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
  } else if (variant === "buttoned") {
    specific = {
      width: "100%",
      display: "inline-block",
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
  let hoverBottom: string = "";
  if (variant === "spaced") {
    hoverBottom = "1px solid";
  } else if (variant === "normal") {
    hoverBottom = "3px solid";
  } else if (variant === "buttoned") {
    hoverBottom = "0px solid";
  }
  return {
    ...specific,
    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
    paddingBottom: theme.spacing(2),
    textDecoration: "none",
    textAlign: textAlign,
    ":hover": {
      borderBottom: `${hoverBottom} solid ${
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
  variant?: "normal" | "spaced" | "buttoned";
  textAlign?: "left" | "right" | undefined;
}

const LinkComponent = (props: Props) => {
  const {
    href,
    children,
    active,
    color = "text",
    variant = "normal",
    textAlign = "left",
  } = props;

  return (
    <Link href={href} passHref>
      <StyledLink
        isActive={active}
        color={color}
        variant={variant}
        textAlign={textAlign}
      >
        {children}
      </StyledLink>
    </Link>
  );
};

export default LinkComponent;
