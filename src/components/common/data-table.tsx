import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  rowKey: keyof T;
}

export function DataTable<T>({ data, columns, title, rowKey }: DataTableProps<T>) {
  return (
    <div className="rounded-md border">
      {title && (
        <div className="bg-muted/50 px-4 py-3 border-b">
          <p className="text-sm font-medium">{title}</p>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={String(row[rowKey])}>
              {columns.map((column, colIndex) => {
                const value = typeof column.accessor === 'function'
                  ? column.accessor(row)
                  : row[column.accessor];

                return (
                  <TableCell key={colIndex} className={column.className}>
                    {value as React.ReactNode}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
