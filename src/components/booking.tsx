"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  MessageCircle,
  X,
} from "lucide-react";
import { useAtelier } from "./atelier-provider";
import { dresses, looks, packages, sihem } from "@/config/sihem";
import {
  dateLabel,
  money,
  phoneValid,
  summary,
  today,
  totalFor,
} from "@/lib/model";
import { Calendar } from "./calendar";
import { ExperienceSummary } from "./configurator";
import { DemoNote } from "./shared";
export function Booking() {
  const { booking, setBooking, draft, update, save, ready } = useAtelier();
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [reference, setReference] = useState("");
  useEffect(() => {
    if (booking) {
      setStep(0);
      setError("");
      setCopied(false);
      setMessageOpen(false);
      setReference("");
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [booking]);
  const validate = () => {
    if ((step === 1 || step === 3) && (!draft.date || draft.date < today()))
      return "Choisissez une date souhaitée à partir d’aujourd’hui.";
    if (step === 3 && draft.name.trim().length < 2)
      return "Renseignez votre nom (au moins deux caractères).";
    if (step === 3 && !phoneValid(draft.phone))
      return "Renseignez un numéro tunisien valide : huit chiffres, commençant par 2, 4, 5 ou 9, avec ou sans +216.";
    return "";
  };
  const next = () => {
    const message = validate();
    setError(message);
    if (!message) setStep(step + 1);
  };
  const submit = () => {
    if (
      !draft.date ||
      draft.date < today() ||
      draft.name.trim().length < 2 ||
      !phoneValid(draft.phone)
    ) {
      setStep(3);
      setError("Vérifiez votre nom, votre téléphone et la date souhaitée.");
      return;
    }
    setReference(save());
    setStep(5);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary(draft));
      setCopied(true);
    } catch {
      setMessageOpen(true);
      setError(
        "La copie automatique est indisponible. Sélectionnez le message ci-dessous pour le copier.",
      );
    }
  };
  const total = totalFor(draft),
    deposit = Math.round((total * sihem.booking.depositPercent) / 100);
  const whatsappEnabled =
    sihem.whatsapp.validatedForUsage &&
    /^216[2459]\d{7}$/.test(sihem.whatsapp.number);
  return (
    <dialog
      ref={dialog}
      className="booking-dialog"
      aria-label="Préparer une demande de démonstration"
      onCancel={() => setBooking(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget) setBooking(false);
      }}
    >
      <div className="booking-shell">
        <div className="booking-head">
          <span className="eyebrow">SIHEM / VOTRE DEMANDE</span>
          <button
            className="icon-button"
            aria-label="Fermer la demande"
            onClick={() => setBooking(false)}
          >
            <X size={21} />
          </button>
        </div>
        <div className="booking-body">
          {step < 5 ? (
            <>
              <div className="booking-progress">
                {[
                  "Forfait",
                  "Date",
                  "Inspirations",
                  "Coordonnées",
                  "Récapitulatif",
                ].map((s, i) => (
                  <button
                    type="button"
                    key={s}
                    disabled={i > step}
                    aria-current={step === i ? "step" : undefined}
                    onClick={() => {
                      setStep(i);
                      setError("");
                    }}
                  >
                    <span className={i <= step ? "active" : ""}>
                      {i < step ? <Check size={12} /> : i + 1}
                    </span>
                    <small>{s}</small>
                  </button>
                ))}
              </div>
              <span className="eyebrow">ÉTAPE {step + 1} SUR 5</span>
              <h2>
                {
                  [
                    "Votre expérience commence ici.",
                    "Un jour à imaginer.",
                    "Ce qui vous ressemble.",
                    "Faisons connaissance.",
                    "Tout est dans les détails.",
                  ][step]
                }
              </h2>
              <DemoNote>
                Demande locale de démonstration. Aucun envoi au salon, aucune
                réservation réelle.
              </DemoNote>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (step === 4) submit();
                  else next();
                }}
                noValidate
              >
                {step === 0 && (
                  <div className="booking-packages">
                    {packages.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={draft.package === p.id ? "selected" : ""}
                        aria-pressed={draft.package === p.id}
                        onClick={() =>
                          update({ package: p.id, evenings: p.evenings })
                        }
                      >
                        <span>
                          <strong>{p.name}</strong>
                          <small>
                            {p.evenings} soirée(s) · composition illustrative
                          </small>
                        </span>
                        <span>
                          {money(p.price)}
                          {draft.package === p.id && <Check size={15} />}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {step === 1 && (
                  <>
                    <Calendar
                      value={draft.date}
                      onChange={(date) => update({ date })}
                    />
                    <label className="field">
                      Date souhaitée
                      <input
                        aria-label="Date souhaitée"
                        type="date"
                        min={today()}
                        value={draft.date}
                        onChange={(e) => update({ date: e.target.value })}
                      />
                    </label>
                  </>
                )}
                {step === 2 && (
                  <>
                    <p className="muted">
                      Vos favoris du carnet sont déjà repris ici. Vous pouvez
                      les ajuster.
                    </p>
                    <div className="inspiration-checks">
                      {looks.map((l) => (
                        <label key={l.id}>
                          <input
                            type="checkbox"
                            checked={draft.favorites.includes(l.id)}
                            onChange={() =>
                              update({
                                favorites: draft.favorites.includes(l.id)
                                  ? draft.favorites.filter((id) => id !== l.id)
                                  : [...draft.favorites, l.id],
                              })
                            }
                          />
                          <span>
                            {l.title}
                            <small>{l.category} · illustration</small>
                          </span>
                        </label>
                      ))}
                    </div>
                    <label className="field">
                      Inspiration de robe
                      <select
                        value={draft.dress}
                        onChange={(e) => update({ dress: e.target.value })}
                      >
                        <option value="">À discuter avec le salon</option>
                        {dresses.map((d) => (
                          <option value={d.id} key={d.id}>
                            {d.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <p className="micro">
                      Aucune robe n’est promise ni louée dans cette
                      démonstration.
                    </p>
                  </>
                )}
                {step === 3 && (
                  <div className="contact-form">
                    <label className="field">
                      Votre nom *
                      <input
                        autoComplete="name"
                        value={draft.name}
                        maxLength={100}
                        onChange={(e) => update({ name: e.target.value })}
                        required
                        placeholder="Prénom et nom"
                      />
                    </label>
                    <label className="field">
                      Téléphone tunisien *
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={draft.phone}
                        maxLength={20}
                        onChange={(e) => update({ phone: e.target.value })}
                        required
                        placeholder="+216 00 000 000"
                      />
                    </label>
                    <label className="field">
                      Date du mariage *
                      <input
                        type="date"
                        min={today()}
                        value={draft.date}
                        onChange={(e) => update({ date: e.target.value })}
                        required
                      />
                    </label>
                    <label className="field">
                      Un mot pour Sihem
                      <textarea
                        rows={3}
                        value={draft.comment}
                        maxLength={2000}
                        onChange={(e) => update({ comment: e.target.value })}
                        placeholder="Une envie particulière, une question…"
                      />
                    </label>
                    <p className="micro">
                      Ces coordonnées sont conservées uniquement dans ce
                      navigateur. Pour la présentation, privilégiez des données
                      fictives.
                    </p>
                  </div>
                )}
                {step === 4 && (
                  <>
                    <p className="contact-preview">
                      {draft.name} · {draft.phone}
                    </p>
                    <ExperienceSummary />
                    <div className="deposit-preview">
                      <span className="eyebrow">
                        APERÇU D’ACOMPTE · SIMULATION
                      </span>
                      <div>
                        <span>Valeur indicative</span>
                        <strong>{money(total)}</strong>
                      </div>
                      <div>
                        <span>
                          Acompte proposé ({sihem.booking.depositPercent} %)
                        </span>
                        <strong>{money(deposit)}</strong>
                      </div>
                      <div>
                        <span>Solde simulé</span>
                        <strong>{money(total - deposit)}</strong>
                      </div>
                      <p>
                        Aucun paiement demandé. Modalités à confirmer par le
                        salon.
                      </p>
                    </div>
                    <p className="micro">
                      Votre souhait : {draft.evenings} soirée(s). Le forfait
                      choisi en illustre{" "}
                      {packages.find((p) => p.id === draft.package)?.evenings}.
                      Toute adaptation et tout supplément devront être chiffrés
                      par le salon.
                    </p>
                  </>
                )}
                {error && (
                  <p role="alert" className="form-error">
                    {error}
                  </p>
                )}
                <div className="booking-actions">
                  {step > 0 && (
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => {
                        setStep(step - 1);
                        setError("");
                      }}
                    >
                      <ArrowLeft size={15} />
                      Retour
                    </button>
                  )}
                  <button className="button" type="submit" disabled={!ready}>
                    {step === 4
                      ? "Enregistrer ma demande de démo"
                      : "Continuer"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="booking-success">
              <CheckCircle2 size={42} strokeWidth={1} />
              <span className="eyebrow">VOTRE DOSSIER EST PRÊT</span>
              <h2>
                Une belle histoire
                <br />
                <em>à écrire ensemble.</em>
              </h2>
              <p className="success-status">
                Demande enregistrée dans cette démonstration.
              </p>
              <p>
                {dateLabel(draft.date)} · Réf.{" "}
                {reference.slice(0, 8).toUpperCase()}
              </p>
              <p className="muted">
                Elle est visible dans l’espace Sihem sur cet appareil. Le salon
                n’a reçu aucun message et la date reste à confirmer.
              </p>
              <div className="success-buttons">
                <button className="button" onClick={copy}>
                  <Copy size={16} />
                  {copied ? "Récapitulatif copié" : "Copier le récapitulatif"}
                </button>
                <button
                  className="button outline"
                  onClick={() => setMessageOpen(!messageOpen)}
                >
                  <MessageCircle size={16} />
                  Préparer un message WhatsApp
                </button>
                <Link
                  className="text-link"
                  href="/admin-demo"
                  onClick={() => setBooking(false)}
                >
                  Consulter le dossier dans l’espace Sihem{" "}
                  <ArrowRight size={15} />
                </Link>
              </div>
              {messageOpen && (
                <div className="message-preview">
                  <label className="field">
                    Message préparé · aucun envoi
                    <textarea
                      readOnly
                      value={summary(draft)}
                      rows={12}
                      onFocus={(e) => e.target.select()}
                    />
                  </label>
                  {whatsappEnabled ? (
                    <a
                      className="button"
                      href={`https://wa.me/${sihem.whatsapp.number}?text=${encodeURIComponent(summary(draft))}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ouvrir WhatsApp
                    </a>
                  ) : (
                    <p className="micro">
                      Le numéro WhatsApp du salon n’a pas encore été validé pour
                      cet usage. Vous pouvez copier ce message ; aucun lien
                      WhatsApp n’est activé.
                    </p>
                  )}
                </div>
              )}
              {error && (
                <p role="alert" className="form-error">
                  {error}
                </p>
              )}
              <details className="reminder-preview">
                <summary>Aperçu du suivi et des rappels</summary>
                {sihem.reminders.map((r) => (
                  <div key={r.title}>
                    <strong>{r.title}</strong>
                    <p>
                      {r.text
                        .replace("{nom}", draft.name)
                        .replace("{date}", dateLabel(draft.date))}
                    </p>
                  </div>
                ))}
                <DemoNote>
                  Textes d’exemple. Aucune notification envoyée.
                </DemoNote>
              </details>
            </div>
          )}
        </div>
        <div className="booking-footer">
          Concept Kairo Dev · aucune date réservée · aucun paiement
        </div>
      </div>
    </dialog>
  );
}
