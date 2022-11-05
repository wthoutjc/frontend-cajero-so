import { useState } from "react";
import NextLink from "next/link";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

// Icons
import InfoIcon from "@mui/icons-material/Info";

// Redux
import { useAppDispatch } from "../../../hooks";

// Interfaces
import { IContextTable } from "../../../interfaces";

interface Props {
  title: string;
  numSelected: number;
  selected: string;
  to: string;
  context: IContextTable;
}

const TableToolbar = ({ title, numSelected, selected, context, to }: Props) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleAction = () => {
    console.log("action");
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      {numSelected > 0 ? (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#112233",
            display: "flex",
            p: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" fontSize={14} fontWeight={600}>
            {numSelected === 1
              ? "1 seleccionado"
              : `${numSelected} seleccionados`}
          </Typography>
          {numSelected === 1 && (
            <Box
              sx={{
                display: "flex",
              }}
            >
              {context.read.enabled && (
                <NextLink href={`${to}/${selected}`} passHref>
                  <Tooltip title="Ver">
                    <IconButton size="small">
                      <InfoIcon fontSize={"medium"} />
                    </IconButton>
                  </Tooltip>
                </NextLink>
              )}
            </Box>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            backgroundColor: "#001122",
            p: 3,
            border: "1px solid #112233",
          }}
        >
          <Typography variant="body2" fontSize={14} fontWeight={600}>
            {title}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export { TableToolbar };
