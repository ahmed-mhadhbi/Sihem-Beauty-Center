"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Draft, emptyDraft, Request, totalFor } from "@/lib/model";
type Store = {
  draft: Draft;
  update: (patch: Partial<Draft>) => void;
  requests: Request[];
  setStatus: (id: string, status: Request["status"]) => void;
  save: () => string;
  reset: () => void;
  ready: boolean;
  storageError: string;
  booking: boolean;
  setBooking: (open: boolean) => void;
};
const Context = createContext<Store | null>(null);
const KEY = "sihem-atelier-v1";
export function AtelierProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [requests, setRequests] = useState<Request[]>([]);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [booking, setBooking] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.version === 1 && data.draft && Array.isArray(data.requests)) {
          setDraft({
            ...emptyDraft,
            ...data.draft,
            extras: Array.isArray(data.draft.extras) ? data.draft.extras : [],
            favorites: Array.isArray(data.draft.favorites)
              ? data.draft.favorites
              : [],
          });
          setRequests(
            data.requests.filter(
              (r: Request) => r.id && r.draft && typeof r.total === "number",
            ),
          );
        }
      }
    } catch {
      setStorageError(
        "Le stockage local est indisponible ou le brouillon est illisible. Vos choix restent utilisables pendant cette visite.",
      );
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ version: 1, draft, requests }),
      );
    } catch {
      setStorageError(
        "Sauvegarde locale indisponible : copiez votre récapitulatif avant de quitter cette page.",
      );
    }
  }, [draft, requests, ready]);
  const save = () => {
    const id = crypto.randomUUID();
    setRequests((items) => [
      ...items,
      {
        id,
        draft: structuredClone(draft),
        total: totalFor(draft),
        createdAt: new Date().toISOString(),
        status: "Nouvelle demande",
        fictional: false,
      },
    ]);
    return id;
  };
  return (
    <Context.Provider
      value={{
        draft,
        update: (patch) => setDraft((d) => ({ ...d, ...patch })),
        requests,
        ready,
        storageError,
        booking,
        setBooking,
        save,
        setStatus: (id, status) =>
          setRequests((items) =>
            items.map((r) => (r.id === id ? { ...r, status } : r)),
          ),
        reset: () => {
          setDraft({ ...emptyDraft });
          setRequests([]);
        },
      }}
    >
      {children}
      {storageError && (
        <div className="storage-warning" role="status">
          {storageError}
        </div>
      )}
    </Context.Provider>
  );
}
export function useAtelier() {
  const value = useContext(Context);
  if (!value) throw new Error("Contexte atelier manquant");
  return value;
}
