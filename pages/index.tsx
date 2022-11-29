import { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Slider,
} from "@mui/material";

// Components
import {
  Process,
  Gantt,
  ToggleView,
  SocketContext,
  SkeletonPage,
  TrafficLight,
  RoundRobin,
  Sjf,
  Fcfs,
} from "../components";

// Icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// Redux
import { useAppDispatch, useAppSelector } from "../hooks";
import { setActive } from "../reducers";

function valuetext(value: number) {
  return `${value}`;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const { active } = useAppSelector((state) => state.ui);

  const [view, setView] = useState<"table" | "gantt" | "together">("together");

  const [data, setData] = useState<number[][]>([]);
  const [dataTable, setDataTable] = useState<number[][]>([]);

  const [quantum, setQuantum] = useState(4);

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
      socket.emit("quantum", quantum);
    }
  }, [quantum, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("data", (res: number[][]) => {
        setData(res);
      });

      socket.on("data-table", (res: number[][]) => {
        setDataTable(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);

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
          Round Robin - Procesos
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
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#001122",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "420px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ width: "160px" }} variant="body2">
            Quantum {`[${quantum}]`}:
          </Typography>
          <Slider
            disabled={active}
            aria-label="Temperature"
            value={quantum}
            onChange={(event, newValue) => {
              setQuantum(newValue as number);
            }}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={2}
            max={6}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {(view === "table" || view == "together") && (
          <Box
            sx={{
              display: "flex",
              height: "50%",
              width: "100%",
            }}
          >
            <Process data={dataTable} />
            <Box
              sx={{
                display: "flex",
                width: "25%",
              }}
            >
              <RoundRobin />
              {/* <Sjf /> */}
              {/* <Fcfs /> */}
            </Box>
          </Box>
        )}
        {(view === "gantt" || view == "together") && (
          <Box
            sx={{
              display: "flex",
              height: "50%",
            }}
          >
            <Gantt
              data={data}
              gridElement={[...Array(100)].map((value, index) => index)}
            />
            <TrafficLight />
          </Box>
        )}
      </Box>
    </Box>
  );
}
