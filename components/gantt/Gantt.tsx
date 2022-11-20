import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";

// Components
import { ItemGannt, StatusViewer } from "../../components";

interface Props {
  data: number[][];
  gridElement: number[];
  cycle: number;
}

// Redux
import { useAppSelector } from "../../hooks";

const Gantt = ({ gridElement, data, cycle }: Props) => {
  const { active } = useAppSelector((state) => state.ui)

  const [trueData, setTrueData] = useState<number[][]>([]);

  useEffect(() => {
    if (!active)
      setTrueData(data.slice(0, 1))
    else {
      setTrueData(data.map(array => cycle >= array[3] ? array : []))
    }
  }, [data, cycle]);

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
      {Array.isArray(gridElement) && gridElement.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              position: "sticky",
              top: 0,
              zIndex: 1,
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
            {trueData.map((row, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                }}
              >
                {[...Array(row[4])].map((value, index) =>
                  index >= row[1] ? (
                    <Grid item xs={0.5} key={row[1] + index}>
                      <ItemGannt
                        sx={{
                          backgroundColor:
                            index >= row[3]
                              ? index >= row[3] + row[7] && row[7] !== 0
                                ? "#353b48"
                                : "#218c74"
                              : "#7f8c8d",
                        }}
                      >
                        {row[0]}
                      </ItemGannt>
                    </Grid>
                  ) : (
                    <Grid item xs={0.5} key={row[1] + index}>
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
        </>
      ) : (
        <Box
          sx={{
            p: 2,
            width: "100%",
            height: "100%",
            backgroundColor: "#112233",
          }}
        >
          <Typography variant="h6" fontWeight={500} fontSize={14}>
            {" "}
            No hay datos para r{" "}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export { Gantt };
