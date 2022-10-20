import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDatabaseStore } from "../store/useDatabaseStore";

const DatabaseCard = ({
  host,
  port,
  database,
  id,
  thumbnail,
}: {
  host: string;
  port: string;
  database: string;
  id: string;
  thumbnail?: string;
}) => {
  const { selectedDatabase, setSelectedDatabase } = useDatabaseStore(
    (state) => ({
      selectedDatabase: state.databaseStore.selectedDatabase,
      setSelectedDatabase: state.setSelectedDatabase,
    })
  );
  return (
    <Card sx={{ minWidth: 240 }}>
      <CardMedia
        component="img"
        height="180"
        image={thumbnail}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {database}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {host} : {port}
        </Typography>
      </CardContent>
      <CardActions>
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
                onClick={() =>
                  setSelectedDatabase({ host, port, database, id })
                }
              >
                Select
              </Button>
            </>
          )
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
};

export default DatabaseCard;
