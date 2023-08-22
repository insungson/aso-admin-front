import DataTable from "react-data-table-component";
import { FadeLoader } from "react-spinners";

const Grid = ({ columns, data, isFetching = false }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      progressPending={isFetching}
      progressComponent={<FadeLoader />}
      highlightOnHover={true}
    />
  );
};

export default Grid;
