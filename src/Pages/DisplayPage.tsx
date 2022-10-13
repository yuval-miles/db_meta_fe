import { useLoadDatabases } from "../hooks/useGenerateErd";
import ReactFlow, { Controls, Background } from "reactflow";
import { Box, Fade } from "@mui/material";
import "reactflow/dist/style.css";
import { LinearProgress } from "@mui/material";
import TableNode from "../Componentes/TabelNode";

const nodeTypes = { tableNode: TableNode };

const DisplayPage = () => {
  const { refetch, erdLoading, nodes, edges, onEdgesChange, onNodesChange } =
    useLoadDatabases();
  return (
    <>
      <Box sx={{ width: "100%", height: "92.5vh" }}>
        <Fade in={erdLoading}>
          <LinearProgress />
        </Fade>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#aaa" gap={16} />
          <Controls />
        </ReactFlow>
      </Box>
    </>
  );
};

export default DisplayPage;
