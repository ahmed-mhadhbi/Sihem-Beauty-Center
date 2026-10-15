"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import { packages } from "@/config/sihem";
import { money } from "@/lib/model";
import { useAtelier } from "./atelier-provider";
import { DemoNote, Reveal } from "./shared";
export function Packages() {
  const { draft, update } = useAtelier();
  const [compare, setCompare] = useState(false);
  return (
    <section className="section packages-section" id="forfaits">
      <Reveal>
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / LES EXPÉRIENCES</span>
            <h2>
              À chaque histoire,
              <br />
              <em>son attention.</em>
            </h2>
          </div>
          <div className="section-intro">
            <p>
              Du premier regard au dernier instant,
              <br />
              imaginez l’accompagnement qui vous ressemble.
            </p>
            <button
              className="text-link"
              aria-expanded={compare}
              onClick={() => setCompare(!compare)}
            >
              {compare ? <Minus size={16} /> : <Plus size={16} />}
              {compare ? "Fermer le comparateur" : "Comparer les expériences"}
            </button>
          </div>
        </div>
      </Reveal>
      <div className="package-grid">
        {packages.map((p, i) => (
          <article
            className={`package ${draft.package === p.id ? "chosen" : ""}`}
            key={p.id}
          >
            <div className="package-top">
              <span className="eyebrow">EXPÉRIENCE 0{i + 1}</span>
              {p.id === "signature" && (
                <span className="tag">L’esprit de l’atelier</span>
              )}
            </div>
            <h3>{p.name}</h3>
            <p>{p.subtitle}</p>
            <div className="package-price">
              {money(p.price)}
              <span>Estimation de démonstration</span>
            </div>
            <ul>
              {p.includes.map((item) => (
                <li key={item}>
                  <Check size={14} />
                  {item}
                </li>
              ))}
            </ul>
            <button
              className={`button ${draft.package === p.id ? "" : "outline"}`}
              onClick={() => {
                update({ package: p.id, evenings: p.evenings });
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {draft.package === p.id
                ? "Votre sélection"
                : "Choisir cette expérience"}
              {draft.package === p.id ? (
                <Check size={16} />
              ) : (
                <ArrowUpRight size={16} />
              )}
            </button>
          </article>
        ))}
      </div>
      {compare && (
        <div className="comparison-scroll">
          <table className="comparison">
            <caption>
              Compositions et durées illustratives à valider avec Sihem
            </caption>
            <thead>
              <tr>
                <th>Votre accompagnement</th>
                {packages.map((p) => (
                  <th key={p.id}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Soirées", ...packages.map((p) => String(p.evenings))],
                ["Temps de préparation", ...packages.map((p) => p.duration)],
                ["Personnalisation", ...packages.map((p) => p.personalization)],
                [
                  "Location de robe",
                  ...packages.map(() => "Non incluse · à vérifier"),
                ],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) =>
                    i === 0 ? <th key={i}>{cell}</th> : <td key={i}>{cell}</td>,
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <DemoNote>
        Compositions, durées et montants fictifs, à valider. La référence de 1
        000 DT pour deux soirées provient d’une publication de 2026 : tarif à
        confirmer.
      </DemoNote>
    </section>
  );
}
