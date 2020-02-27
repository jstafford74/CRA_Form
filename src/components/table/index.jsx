import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useTable, useSortBy } from "react-table";

function NewTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  return (
    <>
      <Table striped bordered hover variant="dark" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  );
}

function TableSched() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      let fileData = require("./data");
      setData(fileData.default);
    };
    getData();
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Skin Cancer Risk Assessment",
        columns: [
          {
            Header: "Skin Type",
            accessor: "type"
          },
          {
            Header:
              "When you are in the sun for 15 min without sunscreen, do you...",
            accessor: "burn_able"
          },
          {
            Header: "Examples",
            accessor: "description"
          }
        ]
      }
    ],
    []
  );

  return (
    <>
      <NewTable columns={columns} data={data} />
    </>
  );
}

export default TableSched;
