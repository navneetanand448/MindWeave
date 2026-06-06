import Image from "next/image";
import { Button } from "@/components/ui/button";
export const EmptyBoard = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="/note.svg"
        height={110}
        width={110}
        alt="Empty"
      />
      <h2 className="mt-6 text-2xl font-semibold text-slate-900">
        Create Your First Board
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start by Creating a board for your application
      </p>
      <div>
        <Button size="lg">
          Create Board
        </Button>
      </div>
    </div>
  );
};
