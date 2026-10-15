"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  dresses,
  extras,
  hairstyles,
  looks,
  packages,
  styles,
} from "@/config/sihem";
import { dateLabel, money, totalFor } from "@/lib/model";
import { useAtelier } from "./atelier-provider";
import { Calendar } from "./calendar";
import { DemoNote } from "./shared";
const steps = [
  "Mon mariage",
  "Mon style",
  "Ma coiffure",
  "Ma robe",
  "Mes prestations",
  "Mon expérience",
];
export function ExperienceSummary() {
  const { draft } = useAtelier();
  const items = [
    ["Date souhaitée", dateLabel(draft.date)],
    [
      "Célébration",
      `${draft.celebration} · ${draft.evenings} soirée(s) souhaitée(s)`,
    ],
    ["Style", styles.find((s) => s.id === draft.style)?.title],
    ["Coiffure", hairstyles.find((h) => h.id === draft.hair)?.title],
    [
      "Robe · inspiration",
      dresses.find((d) => d.id === draft.dress)?.title || "À discuter",
    ],
    ["Forfait illustratif", packages.find((p) => p.id === draft.package)?.name],
    [
      "Compléments à valider",
      extras
        .filter((e) => draft.extras.includes(e.id))
        .map((e) => e.name)
        .join(", ") || "Aucun",
    ],
    [
      "Carnet d’inspirations",
      looks
        .filter((l) => draft.favorites.includes(l.id))
        .map((l) => l.title)
        .join(" / ") || "À composer",
    ],
  ];
  return (
    <dl className="summary-list">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
export function Configurator() {
  const { draft, update, setBooking, ready } = useAtelier();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const reduced = useReducedMotion();
  const style = styles.find((s) => s.id === draft.style) || styles[0];
  const photo =
    step === 2
      ? hairstyles.find((h) => h.id === draft.hair)?.image
      : step === 3 && draft.dress
        ? dresses.find((d) => d.id === draft.dress)?.image
        : style.image;
  const next = () => {
    if (step === 0 && !draft.date) {
      setError("Choisissez une date souhaitée pour poursuivre.");
      return;
    }
    setError("");
    setStep(Math.min(5, step + 1));
  };
  return (
    <section id="experience" className="experience-section">
      <div className="experience-top">
        <span className="eyebrow">02 / VOTRE RENDEZ-VOUS AVEC VOUS-MÊME</span>
        <h2>
          Composez votre
          <br />
          <em>expérience de mariée.</em>
        </h2>
        <p>Six instants pour imaginer un jour qui ne ressemble qu’à vous.</p>
      </div>
      <div className="atelier-config">
        <div className="config-visual">
          <AnimatePresence mode="wait">
            <motion.div
              className="config-visual-image"
              key={photo}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={photo || style.image}
                alt={`${style.title} — composition d’illustration`}
                fill
                sizes="(max-width: 760px) 100vw, 45vw"
              />
            </motion.div>
          </AnimatePresence>
          <span className="visual-overline">VOTRE UNIVERS PREND FORME</span>
          <div className="visual-caption">
            <span className="script-word">Sihem.</span>
            <h3>{style.title}</h3>
            <p>{style.desc}</p>
            <div className="swatches">
              {style.colors.map((color) => (
                <span style={{ backgroundColor: color }} key={color} />
              ))}
            </div>
            <span className="micro">Photographie d’illustration</span>
          </div>
        </div>
        <div className="config-content">
          <div className="step-track" aria-label="Étapes du configurateur">
            {steps.map((label, i) => (
              <button
                key={label}
                aria-label={`Étape ${i + 1} : ${label}`}
                aria-current={step === i ? "step" : undefined}
                className={step >= i ? "done" : ""}
                onClick={() => {
                  setStep(i);
                  setError("");
                }}
              >
                <span>{step > i ? <Check size={12} /> : `0${i + 1}`}</span>
                <small>{label}</small>
              </button>
            ))}
          </div>
          <div className="config-step" key={step}>
            <span className="eyebrow">ÉTAPE 0{step + 1} / 06</span>
            <h3>
              {
                [
                  "Tout commence par un jour.",
                  "Quelle mariée êtes-vous ?",
                  "Le détail qui change tout.",
                  "Une silhouette à imaginer.",
                  "Les petites attentions.",
                  "Votre expérience, imaginée pour vous.",
                ][step]
              }
            </h3>
            {step === 0 && (
              <>
                <Calendar
                  value={draft.date}
                  onChange={(date) => {
                    update({ date });
                    setError("");
                  }}
                />
                <div className="form-row">
                  <label>
                    Soirées souhaitées
                    <select
                      value={draft.evenings}
                      onChange={(e) =>
                        update({ evenings: Number(e.target.value) })
                      }
                    >
                      <option value={1}>Une soirée</option>
                      <option value={2}>Deux soirées</option>
                      <option value={3}>Trois soirées</option>
                    </select>
                  </label>
                  <label>
                    Votre célébration
                    <select
                      value={draft.celebration}
                      onChange={(e) => update({ celebration: e.target.value })}
                    >
                      <option>Mariage</option>
                      <option>Fiançailles</option>
                      <option>Henné</option>
                      <option>Autre célébration</option>
                    </select>
                  </label>
                </div>
                <label className="field">
                  Vos envies en quelques mots
                  <textarea
                    value={draft.preferences}
                    onChange={(e) => update({ preferences: e.target.value })}
                    placeholder="Une ambiance, une couleur, une envie…"
                    rows={2}
                    maxLength={1000}
                  />
                </label>
              </>
            )}
            {step === 1 && (
              <div className="style-options">
                {styles.map((s) => (
                  <button
                    className={`style-option ${draft.style === s.id ? "selected" : ""}`}
                    aria-pressed={draft.style === s.id}
                    key={s.id}
                    onClick={() => update({ style: s.id })}
                  >
                    <span className="option-thumb">
                      <Image src={s.image} alt="" fill sizes="70px" />
                    </span>
                    <span>
                      <strong>{s.title}</strong>
                      <small>{s.desc}</small>
                    </span>
                    <span className="selection-circle">
                      {draft.style === s.id && <Check size={12} />}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {step === 2 && (
              <>
                <p className="muted">
                  Choisissez une direction. La coiffure finale se décidera avec
                  Sihem.
                </p>
                <div className="photo-options">
                  {hairstyles.map((h) => (
                    <button
                      key={h.id}
                      className={draft.hair === h.id ? "selected" : ""}
                      aria-pressed={draft.hair === h.id}
                      onClick={() => update({ hair: h.id })}
                    >
                      <span>
                        <Image
                          src={h.image}
                          alt={`${h.title} — inspiration illustrative`}
                          fill
                          sizes="160px"
                        />
                      </span>
                      <strong>{h.title}</strong>
                      {draft.hair === h.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
                <DemoNote>
                  Directions illustratives, sans promesse de reproduction
                  exacte.
                </DemoNote>
              </>
            )}
            {step === 3 && (
              <>
                <p className="muted">
                  Dentelle, pureté, mouvement… choisissez une inspiration à
                  partager avec le salon.
                </p>
                <div className="photo-options">
                  {dresses.map((d) => (
                    <button
                      key={d.id}
                      className={draft.dress === d.id ? "selected" : ""}
                      aria-pressed={draft.dress === d.id}
                      onClick={() => update({ dress: d.id })}
                    >
                      <span>
                        <Image
                          src={d.image}
                          alt={`${d.title} — aucun stock réel associé`}
                          fill
                          sizes="160px"
                        />
                      </span>
                      <strong>{d.title}</strong>
                      {draft.dress === d.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
                <button
                  className="text-link"
                  onClick={() => update({ dress: "" })}
                >
                  Je préfère en discuter au salon
                </button>
                <DemoNote>
                  Ces robes ne constituent pas l’inventaire du salon. Toute
                  location nécessite une vérification.
                </DemoNote>
              </>
            )}
            {step === 4 && (
              <>
                <label className="field">
                  Votre forfait illustratif
                  <select
                    value={draft.package}
                    onChange={(e) => {
                      const p = packages.find((p) => p.id === e.target.value)!;
                      update({ package: p.id, evenings: p.evenings });
                    }}
                  >
                    {packages.map((p) => (
                      <option value={p.id} key={p.id}>
                        {p.name} · {p.evenings} soirée(s) · {money(p.price)}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="extras-list">
                  {extras.map((e) => (
                    <button
                      className={draft.extras.includes(e.id) ? "selected" : ""}
                      aria-pressed={draft.extras.includes(e.id)}
                      key={e.id}
                      onClick={() =>
                        update({
                          extras: draft.extras.includes(e.id)
                            ? draft.extras.filter((id) => id !== e.id)
                            : [...draft.extras, e.id],
                        })
                      }
                    >
                      <span className="selection-circle">
                        {draft.extras.includes(e.id) ? (
                          <Check size={12} />
                        ) : (
                          <Plus size={12} />
                        )}
                      </span>
                      <span>
                        <strong>{e.name}</strong>
                        <small>{e.desc}</small>
                      </span>
                      <span className="extra-price">+ {money(e.price)}</span>
                    </button>
                  ))}
                </div>
                <DemoNote>
                  Suggestions et prix fictifs. Existence de ces prestations à
                  valider.
                </DemoNote>
              </>
            )}
            {step === 5 && (
              <>
                <ExperienceSummary />
                <div className="summary-estimate">
                  <span>Votre estimation illustrative</span>
                  <strong>{money(totalFor(draft))}</strong>
                </div>
                <DemoNote>
                  Le forfait comprend{" "}
                  {packages.find((p) => p.id === draft.package)?.evenings}{" "}
                  soirée(s). Tout écart avec votre souhait sera étudié par le
                  salon. Aucune disponibilité ni prestation confirmée.
                </DemoNote>
              </>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="config-bottom">
            <div className="config-total">
              <Sparkles size={14} />
              <span>
                Estimation illustrative
                <strong aria-live="polite">{money(totalFor(draft))}</strong>
              </span>
            </div>
            <div className="config-buttons">
              {step > 0 && (
                <button
                  className="icon-button"
                  aria-label="Étape précédente"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              <button
                disabled={!ready}
                className="button"
                onClick={step === 5 ? () => setBooking(true) : next}
              >
                {step === 5 ? "Préparer ma demande" : "Continuer"}
                {step === 5 ? (
                  <ArrowUpRight size={17} />
                ) : (
                  <ArrowRight size={17} />
                )}
              </button>
            </div>
          </div>
          <span className="micro autosave">
            Vos choix sont conservés sur cet appareil · aucun envoi automatique.
          </span>
        </div>
      </div>
    </section>
  );
}
