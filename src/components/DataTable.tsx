import { TableData } from '@/types';

interface DataTableProps {
  table: TableData;
}

export default function DataTable({ table }: DataTableProps) {
  return (
    <div className="mt-3 rounded-xl border border-border-subtle overflow-hidden">
      <div className="px-4 py-2.5 bg-surface border-b border-border-subtle">
        <p className="text-xs font-medium text-text-secondary">{table.title}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-surface/50">
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-left font-medium text-text-tertiary whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-t border-border-subtle hover:bg-surface-hover transition-colors"
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-4 py-2.5 text-text-secondary whitespace-nowrap max-w-[240px] truncate"
                    title={cell}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
