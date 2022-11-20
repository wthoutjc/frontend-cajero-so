import { ToggleButtonGroup, ToggleButton, Tooltip } from "@mui/material";

// Icons
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';

interface Props {
  view: "table" | "gantt" | "together";
  setView: (view: "table" | "gantt" | "together") => void;
}

const ToggleView = ({ view, setView }: Props) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: "table" | "gantt" | "together"
  ) => {
    setView(nextView);
  };

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={handleChange}
      size="small"
    >
      <ToggleButton value="table" aria-label="table">
        <Tooltip title="Tabla">
          <ViewListIcon />
        </Tooltip>
      </ToggleButton>

      <ToggleButton value="gantt" aria-label="gantt">
        <Tooltip title="Diagrama de Gantt">
          <ViewModuleIcon />
        </Tooltip>
      </ToggleButton>

      <ToggleButton value="together" aria-label="together">
        <Tooltip title="Ambos">
          <ViewAgendaIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export { ToggleView };
