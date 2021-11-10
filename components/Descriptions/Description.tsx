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
}
interface StyleProps extends GridProps {
  marginvalue: number;
}

const StyledHeading = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  width: "100%",
}));

const HeadingContainer = styled(Grid)((props: StyleProps) => {
  const { marginvalue } = props;
  return {
    color: theme.palette.primary.main,
    justifyContent: "center",
    marginTop: theme.spacing(marginvalue | 0),
    "& svg": {
      fontSize: "4rem",
      marginBottom: theme.spacing(1),
    },
  };
});

const ButtonContainer = styled("div")(({ theme }) => ({
  margin: `${theme.spacing(3)} 0px `,
}));

const Description = (props: Props) => {
  //todo: handle image
  const { heading, children, Icon, button, margin = 0 } = props;

  return (
    <Grid
      sx={{
        color: "palette.primary",
        justifyContent: "left",
        paddingTop: 3,
        paddingBottom: 3,
      }}
    >
      <HeadingContainer container alignItems="center" marginvalue={margin}>
        {Icon && (
          <Icon
            style={{ transform: heading === "Gaps" ? "rotate(90deg)" : "" }}
          />
        )}
        <StyledHeading textAlign="center" variant="h6">
          {heading}
        </StyledHeading>
      </HeadingContainer>
      <Typography
        component="p"
        textAlign="left"
        justifyContent="left"
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
