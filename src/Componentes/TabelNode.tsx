import { Handle, Position } from "reactflow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Row } from "../hooks/useGenerateErd";
import { Tooltip, Typography } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import TableCell from "@mui/material/TableCell";

const TableNode = ({
  data: { columns, tableName },
}: {
  data: { columns: Row[]; tableName: string };
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={5}>{tableName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Data type</TableCell>
            <TableCell>Length</TableCell>
            <TableCell>Is Nullable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {columns.map((row, idx) => (
            <TableRow
              key={row.columnName}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>
                {row.isPrimaryKey ? (
                  <Tooltip title="Primary key">
                    <KeyIcon color="primary" />
                  </Tooltip>
                ) : row.isForeignKey ? (
                  <Tooltip title="Foreign key">
                    <KeyIcon color="warning" />
                  </Tooltip>
                ) : (
                  <></>
                )}
              </TableCell>
              <TableCell>{row.columnName}</TableCell>
              <TableCell>{row.dataType}</TableCell>
              <TableCell>
                <Typography>
                  {row.charLength ? row.charLength : "N/A"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>{row.isNullable}</Typography>
                {row.isPrimaryKey ? (
                  <>
                    <Handle
                      id={`${tableName}_${row.columnName}`}
                      type="source"
                      position={Position.Right}
                      style={{ top: 142.5 + idx * 57 }}
                    />
                  </>
                ) : row.isForeignKey ? (
                  <>
                    <Handle
                      id={`${tableName}_${row.columnName}`}
                      type="target"
                      position={Position.Left}
                      style={{ top: 142.5 + idx * 57 }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableNode;
