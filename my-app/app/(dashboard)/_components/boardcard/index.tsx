import Link from "next/link";
import Image from "next/image";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import Actions from "@/components/action";
import { MoreHorizontal } from "lucide-react";
interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  imageUrl: string;
  createdAt: number;
  orgId: string;
  isFavourite: boolean;
}

export default function BoardCard({
  id,
  title,
  authorName,
  authorId,
  imageUrl,
  createdAt,
  orgId,
  isFavourite,
}: BoardCardProps) {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;

  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  return (
    <Link href={`/board/${id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
        <div className="relative flex-1 bg-blue-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <Overlay />
          <Actions
          id={id}
          title={title}
          side='right'>
              <button
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
            >
              <MoreHorizontal
                className="text-white opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>
            </Actions>
        </div>

        <Footer
          isFavourite={isFavourite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
}
BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-100/127 rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};