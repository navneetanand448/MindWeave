"use client"
import React from 'react'
import { Toolbar } from './toolbar'
import { Participants } from './participants'
import { Info } from './info'
import { useSelf } from '@liveblocks/react/suspense'
interface CanvasProps{
  boardId:string;
}
function Canvas({boardId}:CanvasProps) {
  const info=useSelf((me)=>me.info);
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId}/>
      <Participants/>
      <Toolbar/>
    </main>
  )
}

export default Canvas