"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { useState } from "react";

export default function DeleteSpeciesButton({ speciesId }: { speciesId: number }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  // Handle delete species logic
  const handleDelete = async () => {
    const supabase = createBrowserSupabaseClient();

    const { error } = await supabase.from("species").delete().eq("id", speciesId); // Delete the species by its ID

    if (error) {
      return toast({
        title: "Error",
        description: "Failed to delete species.",
        variant: "destructive",
      });
    }

    toast({
      title: "Success",
      description: "Species successfully deleted.",
    });

    setDeleteDialogOpen(false);
    // Optionally trigger a callback to refresh the list or perform further actions after deletion
  };

  return (
    <>
      <Button className="mt-3 w-full" variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
        Delete
      </Button>

      {/* Confirmation dialog for delete action */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogTrigger asChild>
          <div />
        </DialogTrigger>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <p>Are you sure you want to delete this species? This action cannot be undone.</p>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            {/* Use async/await in the inline function */}
            <Button variant="destructive" onClick={() => void handleDelete()}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
