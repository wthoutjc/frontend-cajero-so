import { useState, useEffect } from "react";
import { Box } from "@mui/material";

// Components
import { Table } from "../ui/table";

interface Props {
  data: number[][];
}

const Process = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    setTotalData(data.length);
  }, [data]);

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
            "T. Llegada",
            "Ráfaga",
            "T. Comienzo",
            "T. Final",
            "T. Retorno",
            "T. Espera",
          ]}
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

export { Process };
