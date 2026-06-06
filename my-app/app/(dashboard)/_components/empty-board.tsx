"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

export const EmptyBoard = () => {
  // 1. Destructure the organization object
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  // 2. Explicitly return null to avoid React render errors
  if (!organization) return null;

  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created successfully");
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="/note.svg"
        height={110}
        width={110}
        alt="Empty"
      />
      <h2 className="mt-6 text-2xl font-semibold text-slate-900">
        Create your first board
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start by creating a board for your application
      </p>
      <div className="mt-6">

        <Button disabled={pending} onClick={onClick} size="lg">
          Create Board
        </Button>
      </div>
    </div>
  );
};