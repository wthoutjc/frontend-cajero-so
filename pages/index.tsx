import { useState, useEffect, useContext } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

// Components
import {
  Process,
  Gantt,
  ToggleView,
  SocketContext,
  SkeletonPage,
} from "../components";

// Icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// Redux
import { useAppDispatch, useAppSelector } from "../hooks";
import { setActive } from "../reducers";

export default function Home() {
  const dispatch = useAppDispatch();
  const { active } = useAppSelector((state) => state.ui);

  const [view, setView] = useState<"table" | "gantt" | "together">("together");

  const [data, setData] = useState<number[][]>([]);
  const [dataTable, setDataTable] = useState<number[][]>([]);
  const [gridElement, setGridElement] = useState<number[]>([]);

  const [cycle, setCycle] = useState<number>(0);

  const { socket } = useContext(SocketContext);

  const handleStartService = async () => {
    if (socket) {
      socket.emit("start", true);
    }
  };

  const handleStopService = async () => {
    if (socket) {
      socket.emit("stop", true);
      dispatch(setActive(false));
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("data", (res: number[][]) => {
        setData(res);
      });

      socket.on("data-table", (res: number[][]) => {
        setDataTable(res);
      });

      socket.on("cycle", (res: number) => {
        setCycle(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);

  useEffect(() => {
    if (data[data.length - 1] && data[data.length - 1][4])
      setGridElement(
        [...Array(data[data.length - 1][4])].map((value, index) => index + 1)
      );
  }, [data]);

  if (!socket) return <SkeletonPage />;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#001122",
        }}
      >
        <Typography variant="h6" fontSize={22} fontWeight={800}>
          FCFS - Procesos
        </Typography>
        <Box>
          <ToggleView view={view} setView={setView} />
        </Box>
        <Box>
          <Button
            variant="contained"
            color={active ? "error" : "success"}
            size="small"
            startIcon={
              active ? (
                <CircularProgress size={15} color="info" />
              ) : (
                <PlayArrowIcon />
              )
            }
            onClick={active ? handleStopService : handleStartService}
          >
            {active ? "Terminar" : "Iniciar"}
          </Button>
        </Box>
      </Box>
      {(view === "table" || view == "together") && (
        <Process data={dataTable} cycle={cycle} />
      )}
      {(view === "gantt" || view == "together") && (
        <Gantt data={data} gridElement={gridElement} />
      )}
    </Box>
  );
}
