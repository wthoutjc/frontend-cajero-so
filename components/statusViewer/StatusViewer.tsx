import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";

// Context
import { SocketContext } from "..";

// Redux
import { useAppDispatch } from "../../hooks";
import { setActive } from "../../reducers";

const StatusViewer = () => {
  const dispatch = useAppDispatch();

  const { socket } = useContext(SocketContext);

  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on("cycle", (res: number) => {
        console.log(res);
        
        if (res === 0) dispatch(setActive(false));
        else {
          setLeft(res);
          dispatch(setActive(true));
        }
      });
    }
  }, [socket, dispatch]);

  return (
    <Box
      sx={{
        position: "absolute",
        height: "100%",
        backgroundColor: "#d63031",
        zIndex: 1000,
        width: "5px",
        left: left ? `${46 * left}px` : "0px",
        transition: "left 0.5s",
      }}
    />
  );
};

export { StatusViewer };
