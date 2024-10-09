import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function AudioSkeleton() {
  return Array.apply(null, Array(10)).map(function (_, i) {
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
