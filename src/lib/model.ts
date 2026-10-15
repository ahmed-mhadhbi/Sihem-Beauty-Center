import {
  packages,
  extras,
  styles,
  hairstyles,
  dresses,
  looks,
  sihem,
} from "@/config/sihem";
export type Draft = {
  date: string;
  evenings: number;
  celebration: string;
  preferences: string;
  style: string;
  hair: string;
  dress: string;
  package: string;
  extras: string[];
  favorites: string[];
  name: string;
  phone: string;
  comment: string;
};
export type Request = {
  id: string;
  createdAt: string;
  draft: Draft;
  total: number;
  status: "Nouvelle demande" | "En attente" | "Confirmée" | "Annulée";
  fictional: boolean;
};
export const emptyDraft: Draft = {
  date: "",
  evenings: 2,
  celebration: "Mariage",
  preferences: "",
  style: "naturelle",
  hair: "chignon",
  dress: "",
  package: "signature",
  extras: [],
  favorites: [],
  name: "",
  phone: "",
  comment: "",
};
export const money = (value: number) =>
  new Intl.NumberFormat("fr-TN", { maximumFractionDigits: 0 }).format(value) +
  " DT";
export const totalFor = (d: Draft) =>
  (packages.find((p) => p.id === d.package)?.price ?? 0) +
  extras
    .filter((e) => d.extras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
export const dateLabel = (date: string) =>
  date
    ? new Intl.DateTimeFormat("fr-TN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: sihem.booking.timezone,
      }).format(new Date(date + "T12:00:00Z"))
    : "À définir";
export const today = () =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: sihem.booking.timezone }).format(
    new Date(),
  );
export const phoneValid = (phone: string) =>
  /^(?:\+?216)?[2459]\d{7}$/.test(phone.replace(/[\s().-]/g, ""));
export const summary = (d: Draft) =>
  `Bonjour Sihem Beauty Center,\nJe souhaite discuter de mon expérience de mariée.\n\nNom : ${d.name || "À renseigner"}\nTéléphone : ${d.phone || "À renseigner"}\nDate souhaitée : ${dateLabel(d.date)}\nCélébration : ${d.celebration} · ${d.evenings} soirée(s) souhaitée(s)\nStyle : ${styles.find((s) => s.id === d.style)?.title}\nCoiffure : ${hairstyles.find((h) => h.id === d.hair)?.title}\nRobe (inspiration uniquement) : ${dresses.find((r) => r.id === d.dress)?.title || "Sans sélection"}\nForfait illustratif : ${packages.find((p) => p.id === d.package)?.name}\nOptions à valider : ${
    extras
      .filter((e) => d.extras.includes(e.id))
      .map((e) => e.name)
      .join(", ") || "Aucune"
  }\nInspirations : ${
    looks
      .filter((l) => d.favorites.includes(l.id))
      .map((l) => l.title)
      .join(", ") || "Aucune"
  }\nPréférences : ${d.preferences || "À discuter"}\nCommentaire : ${d.comment || "Aucun"}\n\nEstimation de démonstration : ${money(totalFor(d))}.\nDemande non confirmée. Tarifs, prestations, robe et disponibilité à vérifier avec le salon.`;
export function fictionalRequests(): Request[] {
  const base = today().slice(0, 7);
  return [
    {
      id: "exemple-1",
      createdAt: today(),
      draft: {
        ...emptyDraft,
        name: "Mariée exemple A",
        date: base + "-22",
        extras: ["soin"],
      },
      total: 1090,
      status: "Confirmée",
      fictional: true,
    },
    {
      id: "exemple-2",
      createdAt: today(),
      draft: {
        ...emptyDraft,
        name: "Mariée exemple B",
        date: base + "-26",
        package: "prestige",
      },
      total: 1450,
      status: "En attente",
      fictional: true,
    },
    {
      id: "exemple-3",
      createdAt: today(),
      draft: {
        ...emptyDraft,
        name: "Mariée exemple C",
        date: base + "-28",
        package: "essentiel",
      },
      total: 650,
      status: "Nouvelle demande",
      fictional: true,
    },
  ];
}
