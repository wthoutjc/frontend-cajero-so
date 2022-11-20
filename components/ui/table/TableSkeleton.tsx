import { CircularProgress, Skeleton } from "@mui/material";

const TableSkeleton = () => {
  return (
    <table className={"table__produgan"}>
      <thead>
        <tr>
          <td
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "1rem",
            }}
          >
            <CircularProgress
              size={20}
              sx={{
                mr: 1,
              }}
            />{" "}
            Cargando datos
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Skeleton variant="rectangular" width={"100%"} height={43} />
          </td>
        </tr>
        <tr>
          <td>
            <Skeleton variant="rectangular" width={"100%"} height={43} />
          </td>
        </tr>
        <tr>
          <td>
            <Skeleton variant="rectangular" width={"100%"} height={43} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export { TableSkeleton };
