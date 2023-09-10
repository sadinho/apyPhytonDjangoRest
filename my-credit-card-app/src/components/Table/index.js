import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import {
  Styles, TableRowWrapper, HeaderWrapper, ButtonPagination, Pagination,
} from './styles';
import { MdImportExport } from 'react-icons/md/';
import { Button } from 'reactstrap';


export function TableComponent({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    rows,
    state: {
      pageSize
    },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  );

  const generatePaginationArray = (total) => {
    const genesisIndex = Math.ceil(total / 10);
    const auxNum = 10;
    const pageSizeArr = [];
    for (let i = 1; i <= genesisIndex; i += 1) {
      pageSizeArr.push(i * auxNum);
    }
    return pageSizeArr;
  };
  return (
    <Styles>
      <table {...getTableProps()} style={{ width: '100%', overflowX: 'auto', fontFamily: 'inter'}}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  className={column.itemType && `header${index}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ width: column.width }}
                >
                  <HeaderWrapper align={column.align}>
                    {column.render('Header')}
                    {column.Header && (
                  
                      <div style={{ marginLeft: '10px' }}>
                        <MdImportExport />
                      </div>
                      
                    )}
                  </HeaderWrapper>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRowWrapper {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    style={{ paddingRight: '20.68px' }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </TableRowWrapper>
            );
          })}
        </tbody>
      </table>

      <Pagination>
        {rows.length > 10
          && (
            <>
              <span>por página:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {generatePaginationArray(rows.length).map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <p>
                {`${pageSize > rows.length ? rows.length : pageSize} de ${rows.length}`}
              </p>

              <ButtonPagination type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <Button color="primary">Anterior</Button>
              </ButtonPagination>

              <ButtonPagination type="button" onClick={() => nextPage()} disabled={!canNextPage}>
                <Button color="primary">Próximo</Button>
              </ButtonPagination>
            </>
          )}
      </Pagination>
    </Styles>
  );
}
