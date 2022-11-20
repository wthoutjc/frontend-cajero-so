import { useState, useEffect } from "react";
import { Box } from "@mui/material";

// Components
import { Table } from "../ui/table";

// Redux
import { useAppSelector } from "../../hooks";

interface Props {
  data: number[][];
  cycle: number;
}

const Process = ({ data, cycle }: Props) => {
  const { active } = useAppSelector((state) => state.ui)

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [totalData, setTotalData] = useState(0);

  const [trueData, setTrueData] = useState<number[][]>([]);

  useEffect(() => {
    setTotalData(data.length);
  }, [data]);

  useEffect(() => {
    if (!active)
      setTrueData(data.map(array => [array[0], array[1], array[2], 0, 0, 0, 0, 0]))
    else
      {
        setTrueData(data.map(array=> cycle >= array[3] ? array : [array[0], array[1], array[2], 0,0,0,0,0]))
      }
  }, [data, cycle]);

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
        <Table
          title="Procesos"
          columns={[
            "Proceso",
            "T. Llegada",
            "Ráfaga",
            "T. Comienzo",
            "T. Final",
            "T. Retorno",
            "T. Espera",
            "Bloqueo",
          ]}
          to="/clients"
          context={{
            read: {
              enabled: false,
            },
          }}
          data={
            trueData.slice((page - 1) * limit, (page - 1) * limit + limit) || []
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

export { Process };
