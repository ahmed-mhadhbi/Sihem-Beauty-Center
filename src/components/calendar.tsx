"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { today } from "@/lib/model";
export function Calendar({
  value,
  onChange,
  events = [],
  readonly = false,
}: {
  value: string;
  onChange?: (date: string) => void;
  events?: { date: string; fictional: boolean }[];
  readonly?: boolean;
}) {
  const [month, setMonth] = useState(
    () => new Date((value || today()).slice(0, 7) + "-01T12:00:00"),
  );
  const year = month.getFullYear(),
    m = month.getMonth();
  const offset = (new Date(year, m, 1).getDay() + 6) % 7;
  const days = new Date(year, m + 1, 0).getDate();
  const monthLabel = month.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="calendar">
      <div className="calendar-head">
        <button
          type="button"
          aria-label="Mois précédent"
          onClick={() => setMonth(new Date(year, m - 1, 1))}
        >
          <ChevronLeft size={17} />
        </button>
        <span aria-live="polite">{monthLabel}</span>
        <button
          type="button"
          aria-label="Mois suivant"
          onClick={() => setMonth(new Date(year, m + 1, 1))}
        >
          <ChevronRight size={17} />
        </button>
      </div>
      <div className="calendar-grid">
        {["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"].map((d) => (
          <span className="weekday" key={d}>
            {d}
          </span>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <span key={`empty${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const date = `${year}-${String(m + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
          const ev = events.filter((e) => e.date === date);
          return (
            <button
              type="button"
              className={`${value === date ? "selected" : ""} ${ev.length ? "has-event" : ""}`}
              disabled={!readonly && date < today()}
              aria-label={`${i + 1} ${monthLabel}${ev.length ? `, ${ev.length} demande(s)` : ""}`}
              aria-pressed={value === date}
              key={date}
              onClick={() => onChange?.(date)}
            >
              {i + 1}
              {ev.length > 0 && (
                <span
                  className={`calendar-dot ${ev.some((e) => !e.fictional) ? "local" : ""}`}
                />
              )}
            </button>
          );
        })}
      </div>
      <p className="micro">
        {readonly
          ? "Les marqueurs représentent des demandes, sans garantie de disponibilité."
          : "Choisissez une date souhaitée. Disponibilité à confirmer par le salon."}
      </p>
    </div>
  );
}
