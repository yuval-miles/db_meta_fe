import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDatabaseStore } from "../../store/useDatabaseStore";
import DatabaseCard from "../../Componentes/DatabaseCard";

const DBList = ({
  setIsDBList,
}: {
  setIsDBList: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { databases } = useDatabaseStore((state) => ({
    databases: state.databaseStore.databases,
  }));
  return (
    <>
      <Stack>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignContent={"center"}
        >
          <Typography variant="h4">Databases:</Typography>
          <Tooltip title="Add database">
            <IconButton color="primary" onClick={() => setIsDBList(false)}>
              <AddCircleIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack direction={"row"} gap={2}>
          {databases.map((el) => (
            <DatabaseCard
              key={el.id}
              host={el.host}
              port={el.port}
              database={el.database}
              id={el.id}
              thumbnail={el.thumbnail}
            />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default DBList;
