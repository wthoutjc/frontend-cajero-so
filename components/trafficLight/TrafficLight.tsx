import { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";

// Components
import { Table, SocketContext } from "../../components";

// Redux
import { useAppSelector } from "../../hooks";

const TrafficLight = () => {
  const { active } = useAppSelector((state) => state.ui);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [data, setData] = useState<string[][]>([]);
  const [totalData, setTotalData] = useState(0);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    setTotalData(data.length);
  }, [data]);

  useEffect(() => {
    if (socket) {
      socket.on("traffic_light-data", (res: string[][]) => {
        setData(
          res.map((data, index) =>
            index === 0 ? [data[0], "En ejecución"] : [data[0], "Esperando"]
          )
        );
      });
    }
  }, [socket]);

  return (
    <Box
      sx={{
        width: "5%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#001122",
      }}
    >
      <Box
        sx={{
          height: "100%",
          backgroundColor: active ? "#EA2027" : "#535c68",
          boxShadow: active
            ? `0 0 .2rem red, 
            inset 0 0 .2rem red,
            inset 0 0 2rem red,
            0 0 0.8rem red,
            0 0 2.8rem #EA2027,
            inset 0 0 1.3rem #EA2027;`
            : "None",
        }}
      />
      <Box
        sx={{
          height: "100%",
          backgroundColor: active ? "#535c68" : "green",
          boxShadow: active
            ? "None"
            : `0 0 .2rem #4cd137, 
            inset 0 0 .2rem #4cd137,
            inset 0 0 2rem #4cd137,
            0 0 0.8rem #4cd137,
            0 0 2.8rem #44bd32,
            inset 0 0 1.3rem #44bd32;`,
        }}
      />
      {/* <Typography
        variant="body1"
        fontWeight={800}
        sx={{
          p: 1,
          backgroundColor: "#001122",
        }}
      >
        Semáforo
      </Typography>
      <Box
        sx={{
          overflow: "auto",
          backgroundColor: "#112233",
        }}
      >
        <Table
          title="Semáforo"
          columns={["Proceso", "Estado"]}
          to="/clients"
          context={{
            read: {
              enabled: false,
            },
          }}
          data={data}
          page={page}
          limit={limit}
          total_data={totalData}
          setPage={setPage}
          setLimit={setLimit}
        />
      </Box> */}
    </Box>
  );
};

export { TrafficLight };
