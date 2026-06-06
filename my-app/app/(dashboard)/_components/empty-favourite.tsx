import Image from "next/image";

export const EmptyFavourite = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="/empty-search.svg"
        height={140}
        width={140}
        alt="Empty"
      />
      <h2 className="mt-6 text-2xl font-semibold text-slate-900">
        No Favourite at all!
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try Favouriting a Board
      </p>
    </div>
  );
};