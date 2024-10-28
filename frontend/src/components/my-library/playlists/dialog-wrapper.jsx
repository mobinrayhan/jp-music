import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DialogWrapper({
  title,
  description,
  children,
  btnText,
  onSubmit,
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title || "Edit profile"}</DialogTitle>
        <DialogDescription>
          {description ||
            "Make changes to your profile here. Click save when you&apos;re done."}
        </DialogDescription>
      </DialogHeader>
      {children}
      {onSubmit && (
        <DialogFooter>
          <Button type="submit" onSubmit={onSubmit}>
            {btnText || "Save changes"}
          </Button>
        </DialogFooter>
      )}
    </DialogContent>
  );
}
