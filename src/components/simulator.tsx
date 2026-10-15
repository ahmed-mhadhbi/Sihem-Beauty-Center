"use client";
import { useState } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { money } from "@/lib/model";
export function Simulator({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState({
    leads: 30,
    current: 20,
    target: 35,
    price: 1000,
    margin: 60,
    costs: 300,
  });
  const extraBookings = (values.leads * (values.target - values.current)) / 100;
  const revenue = extraBookings * values.price,
    gross = (revenue * values.margin) / 100,
    profit = gross - values.costs;
  const fields = [
    {
      key: "leads",
      label: "Demandes mensuelles",
      min: 0,
      max: 300,
      unit: "demandes",
    },
    {
      key: "current",
      label: "Conversion actuelle",
      min: 0,
      max: 100,
      unit: "%",
    },
    {
      key: "target",
      label: "Conversion envisagée",
      min: 0,
      max: 100,
      unit: "%",
    },
    {
      key: "price",
      label: "Prix moyen du forfait",
      min: 0,
      max: 5000,
      unit: "DT",
    },
    {
      key: "margin",
      label: "Marge brute estimée",
      min: 0,
      max: 100,
      unit: "%",
    },
    {
      key: "costs",
      label: "Coûts supplémentaires / mois",
      min: 0,
      max: 10000,
      unit: "DT",
    },
  ] as const;
  return (
    <section
      className={`simulator ${compact ? "compact" : ""}`}
      id="simulateur"
    >
      <div className="simulator-intro">
        <span className="eyebrow">
          <TrendingUp size={14} /> SIMULATION / HYPOTHÈSES MODIFIABLES
        </span>
        <h2>
          Et si davantage de demandes
          <br />
          <em>devenaient des rencontres ?</em>
        </h2>
        <p>
          Explorez un scénario. Ces hypothèses ne décrivent pas l’activité de
          Sihem et ne constituent aucune garantie de résultat.
        </p>
      </div>
      <div className="simulator-layout">
        <div className="simulator-inputs">
          {fields.map((f) => (
            <label key={f.key}>
              <span>
                {f.label}
                <span>
                  <input
                    aria-label={f.label}
                    type="number"
                    min={f.min}
                    max={f.max}
                    value={values[f.key]}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        [f.key]: Math.min(
                          f.max,
                          Math.max(f.min, Number(e.target.value) || 0),
                        ),
                      })
                    }
                  />
                  {f.unit}
                </span>
              </span>
              <input
                aria-label={`${f.label}, curseur`}
                type="range"
                min={f.min}
                max={f.max}
                value={values[f.key]}
                onChange={(e) =>
                  setValues({ ...values, [f.key]: Number(e.target.value) })
                }
              />
            </label>
          ))}
        </div>
        <div className="simulator-results" aria-live="polite">
          <span className="eyebrow">SCÉNARIO MENSUEL HYPOTHÉTIQUE</span>
          <div className="sim-main-result">
            <ArrowUpRight size={24} />
            <strong>{money(revenue)}</strong>
            <span>de chiffre d’affaires supplémentaire potentiel</span>
          </div>
          <div className="sim-result-row">
            <span>Réservations supplémentaires théoriques</span>
            <strong>
              {extraBookings.toLocaleString("fr-FR", {
                maximumFractionDigits: 2,
              })}
            </strong>
          </div>
          <div className="sim-result-row">
            <span>Marge brute incrémentale estimée</span>
            <strong>{money(gross)}</strong>
          </div>
          <div className="sim-result-row profit">
            <span>Résultat après coûts supplémentaires estimés</span>
            <strong>{money(profit)}</strong>
          </div>
          <p className="micro">
            Demandes × écart de conversion × prix moyen. Marge = CA × taux de
            marge. Résultat = marge − coûts supplémentaires. Une projection peut
            être négative ; les fractions sont des moyennes statistiques.
          </p>
        </div>
      </div>
    </section>
  );
}
