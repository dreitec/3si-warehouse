import { Typography, styled, Grid, GridProps } from "@mui/material";
import { theme } from "src/theme";
import { Button } from "../";

interface Props {
  heading: string;
  children: string;
  Icon?: any;
  button?: boolean;
  margin?: number;
}
interface StyleProps extends GridProps {
  marginValue: number;
}

const StyledHeading = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  width: "100%",
}));

const HeadingContainer = styled(Grid)((props: StyleProps) => {
  const { marginValue } = props;
  return {
    color: theme.palette.primary.main,
    justifyContent: "center",
    marginTop: theme.spacing(marginValue | 0),
    "& svg": {
      fontSize: "4rem",
      marginBottom: theme.spacing(1),
    },
  };
});

const ButtonContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(3),
}));

const Description = (props: Props) => {
  //todo: handle image
  const { heading, children, Icon, button, margin = 0 } = props;

  return (
    <Grid
      container
      sx={{
        color: "palette.primary",
        justifyContent: "center",
      }}
    >
      <HeadingContainer container alignItems="center" marginValue={margin}>
        {Icon && <Icon />}
        <StyledHeading textAlign="center" variant="h6">
          {heading}
        </StyledHeading>
      </HeadingContainer>
      <Typography
        component="p"
        textAlign="center"
        justifyContent="center"
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
