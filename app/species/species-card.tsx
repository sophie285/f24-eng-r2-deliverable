"use client";
/*
Note: "use client" is a Next.js App Router directive that tells React to render the component as
a client component rather than a server component. This establishes the server-client boundary,
providing access to client-side functionality such as hooks and event handlers to this component and
any of its imported children. Although the SpeciesCard component itself does not use any client-side
functionality, it is beneficial to move it to the client because it is rendered in a list with a unique
key prop in species/page.tsx. When multiple component instances are rendered from a list, React uses the unique key prop
on the client-side to correctly match component state and props should the order of the list ever change.
React server components don't track state between rerenders, so leaving the uniquely identified components (e.g. SpeciesCard)
can cause errors with matching props and state in child components if the list order changes.
*/
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";
import DeleteSpeciesButton from "./delete-species-button";
import EditSpeciesDialog from "./edit-species-dialog";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard({ species, sessionId }: { species: Species; sessionId: string }) {
  // Control whether the dialog is open or closed
  const [open, setOpen] = useState<boolean>(false);

  // Determine whether this card was created by this user
  const isOwner = species.author === sessionId;

  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.scientific_name}</h3>
      <h4 className="text-lg font-light italic">{species.common_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      {/* Learn More Button that triggers the dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-3 w-full">Learn More</Button>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{species.scientific_name}</DialogTitle>
            <h4 className="mt-3 text-lg font-light italic">{species.common_name}</h4>
            <div className="mt-2">
              <p className="mt-2">
                <strong>Kingdom:</strong> {species.kingdom}
              </p>
              <p className="mt-2">
                <strong>Total Population:</strong> {species.total_population}
              </p>
              <p className="mt-2">{species.description}</p>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Conditionally render the Edit and Delete buttons next to each other */}
      {isOwner && (
        <div className="mt-3 flex w-full space-x-2">
          <EditSpeciesDialog species={species} />
          <DeleteSpeciesButton speciesId={species.id} />
        </div>
      )}
    </div>
  );
}
