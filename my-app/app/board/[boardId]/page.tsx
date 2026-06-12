import Canvas from "./_components/canvas";
import { Room } from "@/app/room";
import { Loading } from "./_components/loading";
interface BoardIdPageProps{
  params:{
    boardId:string,
  }
}
const BoardIdPage=({params}:BoardIdPageProps)=>{
  return(
    <Room roomId={params.boardId} fallback={<Loading/>}>
       <Canvas boardId={params.boardId}/>
    </Room>

  )
}