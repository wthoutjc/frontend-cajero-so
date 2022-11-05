import { useState, useEffect, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";

// Components
import { Table } from "../ui/table";

// Icons
import SavingsIcon from "@mui/icons-material/Savings";

// Context
import { SocketContext } from "../../components";

const Clients = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState([
    [1, "Juan", 2],
    [2, "Pedro", 1],
  ]);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    setTotalData(data.length);
  }, [data]);

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#CAD3C8",
        p: 2,
      }}
    >
      <Box
        sx={{
          p: 3,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#001122",
        }}
      >
        <Typography variant="h6" fontSize={22} fontWeight={800}>
          ¡Bienvenido al cajero!
        </Typography>
      </Box>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#112233",
        }}
      >
        <Button
          variant="contained"
          color="success"
          size="small"
          startIcon={<SavingsIcon />}
        >
          Atender cliente
        </Button>
      </Box>
      <Box
        sx={{
          overflow: "auto",
          backgroundColor: "#112233",
        }}
      >
        <Table
          title="Clientes"
          columns={["ID", "Nombre", "Número de transacciones"]}
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
      </Box>
    </Box>
  );
};

export { Clients };
