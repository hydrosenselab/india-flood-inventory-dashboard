import React, { useState, useMemo } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const attributesToShow = [
  { key: "startDate", header: "Date" },
  { key: "duration", header: "Duration (in Days)" },
  { key: "districts", header: "Districts" },
  { key: "states", header: "State" },
  { key: "cause", header: "Main Cause" },
];

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

const DataTable = ({ data, onRowClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;
  const totalPages = useMemo(
    () => Math.ceil(data.length / rowsPerPage),
    [data.length]
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = useMemo(() => {
    return data.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [data, currentPage, rowsPerPage]);

  if (data.length === 0) {
    return <div className="empty-data">No data available!</div>;
  }

  return (
    <div>
      <div className="data-table-container">
        <table>
          <thead className="table-header">
            <tr>
              {attributesToShow.map((attr) => (
                <th key={attr.key} className={`column-${attr.key}`}>
                  {attr.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((entry, index) => (
              <tr
                key={index}
                onClick={() => onRowClick(entry)}
                data-tip
                data-for={`row-${index}`}
                role="button"
                tabIndex="0"
              >
                {attributesToShow.map((attr) => (
                  <td key={attr.key} className={`column-${attr.key}`}>
                    <span data-tip data-for={`cell-${index}-${attr.key}`}>
                      {entry[attr.key]}
                    </span>
                    <ReactTooltip
                      id={`cell-${index}-${attr.key}`}
                      place="top"
                      effect="solid"
                      delayShow={500}
                    >
                      {entry[attr.key]}
                    </ReactTooltip>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
      />
    </div>
  );
};

export default DataTable;
