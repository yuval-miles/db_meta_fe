import { Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useDatabaseStore } from "../store/useDatabaseStore";

const DatabaseCard = ({
  host,
  port,
  database,
}: {
  host: string;
  port: string;
  database: string;
}) => {
  const { selectedDatabase, setSelectedDatabase } = useDatabaseStore(
    (state) => ({
      selectedDatabase: state.databaseStore.selectedDatabase,
      setSelectedDatabase: state.setSelectedDatabase,
    })
  );
  return (
    <Paper sx={{ padding: "10px", width: "150px" }}>
      <Stack>
        <Typography variant="h6">{database}</Typography>
        <Typography>
          {host} : {port}
        </Typography>
        {selectedDatabase ? (
          selectedDatabase.host === host && selectedDatabase.port === port ? (
            <>
              <Button disabled variant="outlined">
                Selected
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => setSelectedDatabase({ host, port, database })}
              >
                Select
              </Button>
            </>
          )
        ) : (
          <></>
        )}
      </Stack>
    </Paper>
  );
};

export default DatabaseCard;
