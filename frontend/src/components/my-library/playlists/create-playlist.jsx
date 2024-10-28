import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreatePlaylist({ onHideAddPlaylist }) {
  return (
    <div className="grid gap-4 py-4">
      <form className="flex flex-col gap-2">
        <Label htmlFor="playlistName">Playlist name</Label>
        <Input id="playlistName" placeholder="Enter Your Playlist Name" />

        <Button className="rounded-sm">Create Playlist</Button>
      </form>

      <Button
        className="mt-4 justify-self-end rounded-sm"
        onClick={onHideAddPlaylist}
        variant="outline"
      >
        Go back
      </Button>
    </div>
  );
}
