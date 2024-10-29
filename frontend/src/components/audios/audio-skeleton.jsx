import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function AudioSkeleton({ length = 10 }) {
  return Array.apply(null, Array(length)).map(function (_, i) {
    return (
      <Table key={i}>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  });
}
