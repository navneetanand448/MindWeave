"use client";

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "../hint";

export const NewButton = () => {
  return (
    <Dialog>
      <Hint label="Create organization" side="right" align="start" sideOffset={18}>
        <DialogTrigger asChild>
          <button className="flex aspect-square h-9 w-9 items-center justify-center rounded-md bg-white/25 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            <Plus className="h-5 w-5 text-white" />
          </button>
        </DialogTrigger>
      </Hint>

      <DialogContent className="max-w-[430px] border-none bg-transparent p-0">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};