// components/common/TableSkeleton.js

const TableSkeleton = ({ headers=[1,2,3,4], rows = [1,2,3] }) => {
    return (
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                {headers.map((header, index) => (
                  <th
                    key={`skeleton-header-${header}`}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"/>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {rows.map((row, rowIndex) => (
                <tr key={`skeleton-row-${row}`} className="animate-pulse">
                  {headers.map((header) => (
                    <td
                      key={`skeleton-cell-${header}`}
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
                    >
                      <div className="h-4 bg-gray-200 rounded w-3/4"/>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default TableSkeleton;