import { useState, useEffect, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";

// Components
import { Table } from "../ui/table";

// Icons
import SavingsIcon from "@mui/icons-material/Savings";

// Context
import { SocketContext } from "../../components";

// Services
import { serveCustomer } from "../../services";

// Redux
import { useAppDispatch } from "../../hooks";
import { newNotification } from "../../reducers";

// uuid
import { v4 as uuid } from "uuid";

const Clients = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState<string[][]>([]);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    setTotalData(data.length);
  }, [data]);

  useEffect(() => {
    if (socket) {
      socket.on("data", (res: string[][]) => {
        setData(res);
      });
    }
  }, [socket]);

  const handleServeCustomer = async () => {
    const { ok, message } = await serveCustomer();
    const notification = {
      id: uuid(),
      title: ok ? "Éxito" : "Error",
      message,
      type: ok ? "success" : ("error" as "success" | "error"),
      autoDismiss: 5000,
    };
    dispatch(newNotification(notification));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#CAD3C8",
        p: 4,
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
          onClick={handleServeCustomer}
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
          columns={["Nombre", "Número de transacciones"]}
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
          total_data={totalData}
          setPage={setPage}
          setLimit={setLimit}
        />
      </Box>
    </Box>
  );
};

export { Clients };
