import DataTable from "react-data-table-component";

const GridExpand = ({ columns, data, ExpandedComponent }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
    />
  );
};

export default GridExpand;
