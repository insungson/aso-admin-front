import DataTable from "react-data-table-component";
import { FadeLoader } from "react-spinners";

const GridConditionalRow = ({
  columns,
  data,
  conditionalRowStyles,
  isFetching = false,
}) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      progressPending={isFetching}
      progressComponent={<FadeLoader />}
      conditionalRowStyles={conditionalRowStyles}
      highlightOnHover={true}
    />
  );
};

export default GridConditionalRow;
