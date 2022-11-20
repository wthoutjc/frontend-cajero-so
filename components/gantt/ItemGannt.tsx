import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const ItemGannt = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#112233" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 0,
  backgroundImage: "none",
  width: "46px",
}));

export { ItemGannt };
