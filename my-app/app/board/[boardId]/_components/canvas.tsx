"use client"
import { SelectionTools } from './selection-tool'

import React, { useCallback, useState,useMemo } from 'react'
import { nanoid } from 'nanoid'
import { Toolbar } from './toolbar'
import { Participants } from './participants'
import { Info } from './info'
import { CanvasMode, CanvasState, Camera, Color, LayerType, Point } from '@/types/canvas'
import { useHistory, useCanUndo, useCanRedo, useMutation, useStorage, useOthersMapped } from '@liveblocks/react/suspense'
import { CursorPresence } from './cursor-presence'
import { connectionIdToColor, findIntersectingLayersWithRectangle, pointerEventToCanvasPoint,resizeBounds } from '@/lib/utils'
import { LiveObject } from '@liveblocks/client'
import { LayerPreview } from './layer-preview'
import { SelectionBox } from './selection-box'
const MAX_LAYERS = 100;

interface CanvasProps {
  boardId: string;
}

function Canvas({ boardId }: CanvasProps) {
  const layersId = useStorage((root) => root.layersId);
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r:255,
    g: 255,
    b: 0,
  });
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const InsertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Note | LayerType.Text,
    position: Point,
  ) => {
    const liveLayers = storage.get("layers");
    if (liveLayers.size > MAX_LAYERS) {
      return;
    }
    const liveLayerIds = storage.get("layersId");
    const layerId = nanoid();
    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100,
      width: 100,
      fill: lastUsedColor
    });

    liveLayerIds.push(layerId);
    liveLayers.set(layerId, layer);
    setMyPresence({ selection: [layerId] }, { addToHistory: true });
    setCanvasState({
      mode: CanvasMode.None
    });
  }, [lastUsedColor]);
  const translateSelectedLayers=useMutation(
    ({storage,self },
    point:Point,
  )=>{
    if(canvasState.mode!==CanvasMode.Translating){
      return;
    }
    const offset={
      x:point.x-canvasState.current.x,
      y:point.y-canvasState.current.y,
    }
    const liveLayers=storage.get("layers")
    for(const id of self.presence.selection){
      const layer=liveLayers.get(id);

    if(layer){
      layer.update({
        x:layer.get("x")+offset.x,
        y:layer.get("y")+offset.y,
      })
    }
  }
  setCanvasState({mode:CanvasMode.Translating,current:point})

  },[canvasState])
  const unSelectLayers=useMutation((
    {self,setMyPresence}
  )=>{
    if(self.presence.selection.length>0){
      setMyPresence({selection:[]},{addToHistory:true});
    }
    },[])
    const startMultiSelection=useCallback((current:Point,origin:Point)=>{
    if(Math.abs(current.x-origin.x)+Math.abs(current.y-origin.y)>5){
      setCanvasState({
        mode:CanvasMode.SelectionNet,
        origin,
        current,
      })
    }
    },[])
    const updateSelectionNet=useMutation((
      {storage,setMyPresence},
      current:Point,
      origin:Point,
    )=>{
      const layersJson = storage.get("layers").toJSON();
      const layers = new Map(Object.entries(layersJson));
      setCanvasState({
        mode:CanvasMode.SelectionNet,
        current,
        origin,
      })
      const ids=findIntersectingLayersWithRectangle(
        layersId,
        layers,
        origin,
        current,
      )
      setMyPresence({selection:ids});
    },[layersId])
const resizeSelectedLayer=useMutation((
  {storage,self},
point:Point)=>{
  if(canvasState.mode!==CanvasMode.Resizing){
    return;
  }
  const bounds=resizeBounds(
    canvasState.initialBounds,
    canvasState.corner,
    point,
  )
  const liveLayers=storage.get("layers")
  const layer=liveLayers.get(self.presence.selection[0]);
    if (layer) {
      layer.update(bounds);
    };
},[canvasState])
  const onLayerPointerDown = useMutation((
    { self, setMyPresence },
    e: React.PointerEvent,
    layerId: string,
  ) => {
    if (
      canvasState.mode === CanvasMode.Pencil ||
      canvasState.mode === CanvasMode.Inserting
    ) {
      return;
    }

    history.pause();
    e.stopPropagation();

    const point = pointerEventToCanvasPoint(e, camera);

    if (!self.presence.selection.includes(layerId)) {
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
    }
    setCanvasState({ mode: CanvasMode.Translating, current: point });
  }, [
    setCanvasState,
    camera,
    history,
    canvasState.mode,
  ]);
  const onPointerDown=useCallback((
    e:React.PointerEvent,
  )=>{
    const point=pointerEventToCanvasPoint(e,camera);
    if(canvasState.mode===CanvasMode.Inserting){
      return;
    }
    setCanvasState({origin:point,mode:CanvasMode.Pressing})
  },[camera,canvasState.mode,setCanvasState])

  const onPointerUp = useMutation((
    {},
    e: React.PointerEvent
  ) => {
    const point = pointerEventToCanvasPoint(e, camera);
    if(
      canvasState.mode===CanvasMode.None ||
      canvasState.mode===CanvasMode.Pressing
    ){
      unSelectLayers();
      setCanvasState({
        mode:CanvasMode.None,
      })
    }
    else if (canvasState.mode === CanvasMode.Inserting) {
      InsertLayer(canvasState.layerType, point);
    } else {
      setCanvasState({
        mode: CanvasMode.None,
      });
    }
    history.resume();
  }, [
    camera,
    canvasState,
    history,
    InsertLayer,
    unSelectLayers,
  ]);
  const selections=useOthersMapped((other)=>other.presence.selection)
  const layerIdToColorSelection=useMemo(()=>{
    const layerIdToColorSelection:Record<string,string>={};
    for(const user of selections){
      const [connectionId,selection]=user;
      for(const layerId of selection){
        layerIdToColorSelection[layerId]=connectionIdToColor(connectionId)
      }
    }
    return layerIdToColorSelection;
  },[selections])
  const onResizeHandlePointerDown=useCallback((corner:Side,initialBounds:XYWH)=>{
    history.pause();
    setCanvasState({
      mode:CanvasMode.Resizing,
      initialBounds,
      corner,
    })
  },[history])
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, camera);
    if(canvasState.mode===CanvasMode.Pressing){
      startMultiSelection(current,canvasState.origin);
    }else if(canvasState.mode===CanvasMode.SelectionNet){
      updateSelectionNet(current,canvasState.origin);
    }
    else if(canvasState.mode===CanvasMode.Translating){
      translateSelectedLayers(current)
    }
     else if(canvasState.mode===CanvasMode.Resizing){
      resizeSelectedLayer(current)
    }
        setMyPresence({ cursor: current });
  }, [
    canvasState,
  camera,
  resizeSelectedLayer,
  translateSelectedLayers,
  ]);

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <SelectionTools
      camera={camera}
      setLastUsedColor={setLastUsedColor}
      />
      <svg
        className="h-screen w-screen"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layersId.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdToColorSelection[layerId]}
            />
          ))}
          <SelectionBox
          onResizeHandlePointerDown={onResizeHandlePointerDown}
          />
              {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
            <rect
              className="fill-blue-500/5 stroke-blue-500 stroke-1"
              x={Math.min(canvasState.origin.x, canvasState.current.x)}
              y={Math.min(canvasState.origin.y, canvasState.current.y)}
              width={Math.abs(canvasState.origin.x - canvasState.current.x)}
              height={Math.abs(canvasState.origin.y - canvasState.current.y)}
            />
          )}
          <CursorPresence />
        </g>
      </svg>
    </main>
  );
}

export default Canvas;