import { useState } from "react";

export function useAvatarUpload(
  setCustomer: (updater: (prev: any) => any) => void
) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/api/customer/upload-profile-image", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Yükleme başarısız");

      const data = await res.json();
      setCustomer((prev) => ({ ...prev, photoUrl: data.photoUrl }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { file, setFile, loading, upload };
}
