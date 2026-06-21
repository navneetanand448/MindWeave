"use client";

import { memo } from "react";
import { useStorage } from "@liveblocks/react/suspense";
import { LayerType } from "@/types/canvas";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(({
  id,
  onLayerPointerDown,
  selectionColor
}: LayerPreviewProps) => {
  const layer = useStorage((root) => {
    if (root.layers) {
      if (typeof root.layers.get === "function") {
        return root.layers.get(id); 
      }
      return (root.layers as any)[id];
    }
    return undefined;
  });

  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    default:
      console.warn("Unknown Layer Type");
      return null;
  }
});

LayerPreview.displayName = "LayerPreview";