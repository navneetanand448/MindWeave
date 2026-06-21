"use client"
import React from 'react'
import { useCallback,useState } from 'react'
import { Toolbar } from './toolbar'
import { Participants } from './participants'
import { Info } from './info'
import { CanvasMode, CanvasState ,Camera} from '@/types/canvas'
import { useHistory,useCanUndo,useCanRedo,useMutation } from '@liveblocks/react/suspense'
import { CursorPresence } from './cursor-presence'
import { pointerEventToCanvasPoint } from '@/lib/utils'
interface CanvasProps{
  boardId:string;
}
function Canvas({boardId}:CanvasProps) {
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [canvasState,setCanvasState]=useState<CanvasState>({
    mode: CanvasMode.None,
  })
 const history=useHistory();
 const canUndo=useCanUndo();
 const canRedo=useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);
 const onPointerMove=useMutation(({setMyPresence},e:React.PointerEvent)=>{
  e.preventDefault();
  const current = pointerEventToCanvasPoint(e, camera);
  setMyPresence({ cursor: current });

 },[])
   const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId}/>
      <Participants/>
      <Toolbar
      canvasState={canvasState}
      setCanvasState={setCanvasState}
      canRedo={canRedo}
      canUndo={canUndo}
      undo={history.undo}
      redo={history.redo}
      />
      <svg className="h-100vh w-100vw"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onWheel={onWheel}
      >
        <g style={{
          transform:`translate(${camera.x}px,${camera.y}px)`
        }}>
          <CursorPresence/>
        </g>
      </svg>
    </main>
  )
}

export default Canvas