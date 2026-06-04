"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Hint } from "../hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="relative aspect-square h-9 w-9">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <button
          onClick={onClick}
          className={cn(
            "relative flex h-full w-full cursor-pointer items-center justify-center rounded-md opacity-60 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
            isActive && "opacity-100"
          )}
        >
          <Image
            fill
            alt={name}
            src={imageUrl}
            className="rounded-md object-cover"
          />
        </button>
      </Hint>
    </div>
  );
};