import { Box, Grid } from "@mui/material";

// Components
import { ItemGannt, StatusViewer } from "../../components";

interface Props {
  data: number[][];
  gridElement: number[];
}

const Gantt = ({ gridElement, data }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#001122",
        overflow: "auto",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "sticky",
          top: 0,
        }}
      >
        {gridElement.map((row, index) => (
          <Grid item xs={0.5} key={index}>
            <ItemGannt
              sx={{
                backgroundColor: "#112233",
              }}
            >
              {index}
            </ItemGannt>
          </Grid>
        ))}
      </Box>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <StatusViewer />
        {data.map((row, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            {[...Array(row[3] + 1)].map((value, index) =>
              index >= row[0] ? (
                <Grid item xs={0.5} key={row[0] + index}>
                  <ItemGannt
                    sx={{
                      backgroundColor: index >= row[2] ? "#218c74" : "#7f8c8d",
                    }}
                  >
                    {row[0]}
                  </ItemGannt>
                </Grid>
              ) : (
                <Grid item xs={0.5} key={row[0] + index}>
                  <ItemGannt
                    sx={{
                      backgroundColor: "#001122",
                      height: "100%",
                    }}
                  ></ItemGannt>
                </Grid>
              )
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { Gantt };
