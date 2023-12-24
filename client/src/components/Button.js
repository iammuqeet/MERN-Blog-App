import Button from "@mui/material/Button";

const ButtonComponent = (props) => {
  const { buttonText, buttonVariant } = props;

  return (
    <Button
      type="submit"
      fullWidth
      variant={buttonVariant}
      sx={{ mt: 3, mb: 2 }}
    >
      {buttonText}
    </Button>
  );
};

export default ButtonComponent;
