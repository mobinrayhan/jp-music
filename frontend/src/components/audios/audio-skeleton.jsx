import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function Component() {
  return Array.apply(null, Array(5)).map(function (_, i) {
    return (
      <Table key={i}>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-8 w-full" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  });
}
