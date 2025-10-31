"use client";

import { useEffect, useCallback, useRef } from "react";
import { GridStack, GridStackNode, GridStackOptions } from "gridstack";
import type { KartLayout } from "./gridPersistence.client";
import { gridPersistence } from "./gridPersistence.client";

export function useGridStackPersistence(
  sayfaId: string,
  gridRef: React.RefObject<HTMLDivElement | null>,
  gridOptions: Partial<GridStackOptions> = {}
) {
  const gridRefLocal = useRef<GridStack | null>(null);

  const resetLayout = useCallback(() => {
    console.log("♻️ ResetLayout çağrıldı");
    const layout = getJSXLayout(gridRef);
    gridRefLocal.current?.load(layout);
    gridPersistence.resetle(sayfaId);
    gridPersistence.kaydet(sayfaId, layout);
  }, [gridRef, sayfaId]);

  useEffect(() => {
    if (!gridRef.current) return;

    console.log("🧱 GridStack init ediliyor:", sayfaId);

    const jsxLayout = getJSXLayout(gridRef);
    console.log("📐 JSX layout:", jsxLayout);

    const persisted = gridPersistence.yukle(sayfaId);
    console.log("📦 Persisted layout:", persisted);

    const layoutToLoad = persisted.length > 0 ? persisted : jsxLayout;

    const grid = GridStack.init(
      {
        column: 12,
        cellHeight: 1,
        float: true,
        resizable: { handles: "e, se, s, sw, w" },
        ...gridOptions,
      },
      gridRef.current
    );

    console.log("✅ GridStack init tamamlandı:", grid);

    gridRefLocal.current = grid;
    (gridRef.current as any).__gridstack = grid;

    const items = gridRef.current?.querySelectorAll(".grid-stack-item");
    items?.forEach((el) => el.removeAttribute("style"));

    grid.load(layoutToLoad);

    grid.on("change", () => {
      console.log("🔄 Grid değişti, kayıt ediliyor...");
      const changed = grid.save(true) as GridStackNode[];
      const fullLayout: KartLayout[] = changed
        .filter((n): n is GridStackNode => !!n.id)
        .map((n) => ({
          id: n.id!,
          x: n.x ?? 0,
          y: n.y ?? 0,
          w: n.w ?? 1,
          h: n.h ?? 1,
        }));

      gridPersistence.kaydet(sayfaId, fullLayout);
    });

    return () => {
      grid.destroy(false);
      gridRefLocal.current = null;
    };
  }, [sayfaId, gridRef, gridOptions]);

  return { resetLayout };
}

function getJSXLayout(
  ref: React.RefObject<HTMLDivElement | null>
): KartLayout[] {
  const items = ref.current?.querySelectorAll(".grid-stack-item") ?? [];
  return Array.from(items)
    .map((el) => {
      const id = el.getAttribute("data-gs-id");
      if (!id) return null;
      return {
        id,
        x: parseInt(el.getAttribute("data-gs-x") ?? "0", 10),
        y: parseInt(el.getAttribute("data-gs-y") ?? "0", 10),
        w: parseInt(el.getAttribute("data-gs-w") ?? "1", 10),
        h: parseInt(el.getAttribute("data-gs-h") ?? "1", 10),
      };
    })
    .filter((item): item is KartLayout => !!item);
}
