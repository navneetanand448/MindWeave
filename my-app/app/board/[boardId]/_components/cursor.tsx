"use client"
import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react/suspense";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";
interface CursorProps{
  connectionId:number;
}
export const Cursor=memo(({connectionId}:CursorProps)=>{
  const cursor=useOther(connectionId,(user)=>user.presence.cursor)
  if(!cursor) return null;
  const {x,y}=cursor
  return(
    <foreignObject
    style={{
      transform:`translateX(${x}px) translateY(${y}px)`
    }}
    height={50}
    width={50}
    className="pointer-events-none relative drop-shadow-md"
    >
      <MousePointer2
      className="h-5 w-5"
      style={{

      fill:connectionIdToColor(connectionId),
      color:connectionIdToColor(connectionId)
      }}
      />

    </foreignObject>
  )
})
Cursor.displayName="Cursor";