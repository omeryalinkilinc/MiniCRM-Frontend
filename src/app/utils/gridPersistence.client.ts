export type KartLayout = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

let safeWindow: Window | undefined =
  typeof window !== "undefined" ? window : undefined;

export const gridPersistence = {
  kaydet: (sayfaId: string, layout: KartLayout[]) => {
    if (!safeWindow) return;
    console.log("💾 Kayıt ediliyor:", sayfaId, layout);
    safeWindow.localStorage.setItem(`grid-${sayfaId}`, JSON.stringify(layout));
  },

  yukle: (sayfaId: string): KartLayout[] => {
    if (!safeWindow) return [];
    console.log("📤 Layout yükleniyor:", sayfaId);
    const kayitli = safeWindow.localStorage.getItem(`grid-${sayfaId}`);
    return kayitli ? JSON.parse(kayitli) : [];
  },

  resetle: (sayfaId: string) => {
    if (!safeWindow) return;
    console.log("🧹 Layout resetleniyor:", sayfaId);
    safeWindow.localStorage.removeItem(`grid-${sayfaId}`);
  },
};
