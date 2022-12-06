import { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";

// Components
import { Table, SocketContext } from "../../components";

interface Props {
  data: number[][];
}

const RoundRobin = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket && data.length > 0) {
      socket.emit("rr-new_process", true);
    }
  }, [socket, data.length]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#001122",
      }}
    >
      <Box
        sx={{
          overflow: "auto",
          backgroundColor: "#112233",
        }}
      >
        <Typography
          variant="body1"
          fontWeight={800}
          sx={{
            p: 1,
            backgroundColor: "#001122",
          }}
        >
          Round Robin
        </Typography>
        <Table
          title="Procesos"
          columns={["Proceso", "T. Llegada", "Ráfaga"]}
          to="/clients"
          context={{
            read: {
              enabled: false,
            },
          }}
          data={
            data.slice((page - 1) * limit, (page - 1) * limit + limit) || []
          }
          page={page}
          limit={limit}
          total_data={data.length}
          setPage={setPage}
          setLimit={setLimit}
        />
      </Box>
    </Box>
  );
};

export { RoundRobin };
