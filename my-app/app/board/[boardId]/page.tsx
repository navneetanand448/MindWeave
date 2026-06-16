import Canvas from "./_components/canvas";
import { Room } from "@/app/room";
import { Loading } from "./_components/loading";

interface BoardIdPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

export default async function BoardIdPage({ params }: BoardIdPageProps) {
  const resolvedParams = await params;

  return (
    <Room roomId={resolvedParams.boardId} fallback={<Loading/>}>
       <Canvas boardId={resolvedParams.boardId}/>
    </Room>
  );
}