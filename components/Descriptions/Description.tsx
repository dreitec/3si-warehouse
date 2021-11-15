import Grid, { GridProps } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";
import { theme } from "../../mui";
import { Button } from "../";

interface Props {
  heading?: string;
  children: string;
  Icon?: any;
  button?: boolean;
  margin?: number;
  justify?: "right" | "left" | "inherit" | "center" | "justify" | undefined;
  headingJustify?: "right" | "left" | "inherit" | "center" | "justify";
  color?: string;
}
interface StyleProps extends GridProps {
  marginValue: number;
  headingJustify: "right" | "left" | "inherit" | "center" | "justify";
  color?: string;
}

const StyledHeading = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  width: "100%",
}));

const HeadingContainer = styled(Grid, {
  shouldForwardProp: (prop: string) =>
    prop !== "headingJustify" && prop !== "marginValue",
})((props: StyleProps) => {
  const { marginValue, headingJustify, color } = props;
  return {
    color: color ? color : theme.palette.primary.main,
    justifyContent: headingJustify,
    marginTop: theme.spacing(marginValue | 0),
    "& svg": {
      fontSize: "2rem",
      marginBottom: theme.spacing(1),
    },
  };
});

const ButtonContainer = styled("div")(({ theme }) => ({
  margin: `${theme.spacing(3)} 0px `,
}));

const Description = (props: Props) => {
  //todo: handle image
  const {
    heading,
    children,
    Icon,
    button,
    margin = 0,
    justify = "left",
    headingJustify = "center",
    color,
  } = props;

  return (
    <Grid
      sx={{
        color: color ? color : "palette.primary",
        justifyContent: justify,
        paddingTop: 3,
        paddingBottom: 3,
      }}
    >
      <HeadingContainer
        container
        headingJustify={headingJustify}
        marginValue={margin}
        color={color}
      >
        {Icon && (
          <Icon
            style={{ transform: heading === "Gaps" ? "rotate(90deg)" : "" }}
          />
        )}
        <StyledHeading textAlign={headingJustify} variant="h6">
          {heading}
        </StyledHeading>
      </HeadingContainer>
      <Typography
        component="p"
        textAlign={justify}
        justifyContent={justify}
        variant="body1"
      >
        {children}
      </Typography>
      {button && (
        <ButtonContainer>
          <Button variant="outlined" color="primary">
            See Methodology
          </Button>
        </ButtonContainer>
      )}
    </Grid>
  );
};

export default Description;
