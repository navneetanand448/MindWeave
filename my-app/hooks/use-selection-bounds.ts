import { shallow } from "@liveblocks/react";
import { Layer, XYWH } from "@/types/canvas";
import { useStorage, useSelf } from "@liveblocks/react/suspense";

const boundingBox = (layers: Layer[]): XYWH | null => {
  const first = layers[0];

  if (!first) {
    return null;
  }

  let left = first.x;
  let right = first.x + first.width;
  let top = first.y;
  let bottom = first.y + first.height;

  for (let i = 1; i < layers.length; i++) {
    const { x, y, width, height } = layers[i];

    if (left > x) {
      left = x;
    }

    if (right < x + width) {
      right = x + width;
    }

    if (top > y) {
      top = y;
    }

    if (bottom < y + height) {
      bottom = y + height;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};

export const useSelectionBounds = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useStorage((root) => {
    const selectedLayers = selection
      .map((layerId) => {
        // 🛡️ Safe check for LiveMap vs standard Object
        if (root.layers) {
          if (typeof root.layers.get === "function") {
            return root.layers.get(layerId);
          }
          return (root.layers as any)[layerId];
        }
        return undefined;
      })
      .filter(Boolean) as Layer[]; // Ensure TypeScript knows these are valid Layers

    return boundingBox(selectedLayers);
  }, shallow);
};