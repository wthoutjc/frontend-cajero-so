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
import LockOpenIcon from "@mui/icons-material/LockOpen";

// Redux
import { useAppDispatch, useAppSelector } from "../hooks";
import { newNotification, setActive } from "../reducers";

// uuid
import { v4 as uuid } from "uuid";

export default function Home() {
  const dispatch = useAppDispatch();
  const { active } = useAppSelector((state) => state.ui);

  const [view, setView] = useState<"table" | "gantt" | "together">("together");

  const [data, setData] = useState<number[][]>([]);
  const [gridElement, setGridElement] = useState<number[]>([]);

  const [blocked, setBlocked] = useState(false);

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

  const handleUnlockService = async () => {
    if (socket) {
      socket.emit("unblocked", true);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("data", (res: number[][]) => {
        setData(res);
      });

      socket.on("blocked", (res: boolean) => {
        setBlocked(res);
      });

      socket.on(
        "unblocked",
        ({ message, ok }: { ok: boolean; message: string }) => {
          if (ok){
            setBlocked(false)
            dispatch(setActive(false));
          };
          const notification = {
            id: uuid(),
            title: ok ? "Éxito" : "Error",
            message,
            type: ok ? "success" : ("error" as "success" | "error"),
            autoDismiss: 5000,
          };
          dispatch(newNotification(notification));
        }
      );
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (data[data.length - 1] && data[data.length - 1][3])
      setGridElement(
        [...Array(data[data.length - 1][3] + 2)].map(
          (value, index) => index + 1
        )
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
          {blocked && (
            <Button
              variant="contained"
              color="warning"
              size="small"
              startIcon={<LockOpenIcon />}
              onClick={handleUnlockService}
              sx={{
                ml: 2,
              }}
            >
              Desbloquear
            </Button>
          )}
        </Box>
      </Box>
      {(view === "table" || view == "together") && <Process data={data} />}
      {(view === "gantt" || view == "together") && (
        <Gantt data={data} gridElement={gridElement} />
      )}
    </Box>
  );
}
