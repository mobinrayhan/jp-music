import { createNewPlaylist } from "@/actions/plylistAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";

export default function CreatePlaylist({
  onHideAddPlaylist,
  hasShowBtn = true,
}) {
  const [state, action] = useFormState(createNewPlaylist, {
    error: null,
    success: null,
  });

  if (state?.success) {
    onHideAddPlaylist();
  }

  return (
    <div className="grid gap-4 py-4">
      <form className="flex flex-col gap-2" action={action}>
        <FormInputs />
      </form>

      {state?.error && (
        <p className="py-1 text-center text-sm text-red-500">{state.error}</p>
      )}

      {hasShowBtn && (
        <Button
          className="mt-4 justify-self-end rounded-sm"
          onClick={onHideAddPlaylist}
          variant="outline"
        >
          Go back
        </Button>
      )}
    </div>
  );
}

function FormInputs() {
  const { pending } = useFormStatus();

  return (
    <>
      <Label disabled={pending} htmlFor="playlistName">
        Playlist name
      </Label>
      <Input
        disabled={pending}
        id="playlistName"
        name="playlistName"
        placeholder="Enter Your Playlist Name"
      />

      <Button className="rounded-sm" type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Playlist"}
      </Button>
    </>
  );
}
