"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  RotateCcw,
} from "lucide-react";
import { looks, packages, styles } from "@/config/sihem";
import { useAtelier } from "@/components/atelier-provider";
import { Simulator } from "@/components/simulator";
import { money } from "@/lib/model";
const slides = [
  {
    overline: "01 / UNE IDENTITÉ QUI DONNE ENVIE",
    title: "Le premier regard.",
    accent: "La première émotion.",
    copy: "Une présence digitale à la hauteur des moments que vos mariées vous confient.",
    value: "Faire ressentir votre univers avant même le premier échange.",
  },
  {
    overline: "02 / DES ENVIES QUI SE PRÉCISENT",
    title: "De belles images.",
    accent: "De vraies intentions.",
    copy: "La future mariée garde ses inspirations. Vous découvrez ce qu’elle aime avant son rendez-vous.",
    value: "Transformer une visite en début de conversation.",
  },
  {
    overline: "03 / UNE EXPÉRIENCE PERSONNELLE",
    title: "Son style.",
    accent: "Votre savoir-faire.",
    copy: "Chaque choix compose un dossier personnel : maquillage, coiffure, robe et souhaits pour le grand jour.",
    value: "Mieux comprendre ses attentes et préparer votre conseil.",
  },
  {
    overline: "04 / LA VALEUR D’UN ACCOMPAGNEMENT",
    title: "Une attention.",
    accent: "Puis une autre.",
    copy: "Des forfaits lisibles et des compléments à discuter permettent à chaque mariée de composer son expérience.",
    value: "Présenter la valeur de vos prestations avec clarté.",
  },
  {
    overline: "05 / UN PREMIER PAS CONCRET",
    title: "L’envie devient",
    accent: "une demande.",
    copy: "Les coordonnées, la date et toutes les envies sont réunies. Plus de détails perdus entre plusieurs conversations.",
    value: "Faciliter la demande et garder une trace à suivre.",
  },
  {
    overline: "06 / UNE VISION POUR VOTRE ACTIVITÉ",
    title: "Plus de clarté.",
    accent: "De nouvelles possibilités.",
    copy: "Un planning, des demandes à suivre et des hypothèses chiffrées pour réfléchir ensemble à la suite.",
    value: "Une démonstration concrète, à adapter à votre façon de travailler.",
  },
];
export default function Presentation() {
  const [index, setIndex] = useState(0);
  const { draft, update, setBooking } = useAtelier();
  const reduced = useReducedMotion();
  const slide = slides[index];
  const [demoStyle, setDemoStyle] = useState("naturelle");
  const [demoFavorites, setDemoFavorites] = useState<string[]>(["lumiere"]);
  const [demoPackage, setDemoPackage] = useState("signature");
  const startRequest = () => {
    update({
      style: demoStyle,
      favorites: demoFavorites,
      package: demoPackage,
      evenings: packages.find((p) => p.id === demoPackage)!.evenings,
    });
    setBooking(true);
  };
  return (
    <div className="presentation-page">
      <header className="presentation-header">
        <Link className="brand" href="/">
          SIHEM<span>L’ATELIER DES MARIÉES</span>
        </Link>
        <span className="eyebrow">UNE VISION PAR KAIRO DEV · 90 SECONDES</span>
        <button
          className="text-link"
          onClick={() => {
            setIndex(0);
            setDemoStyle("naturelle");
            setDemoFavorites(["lumiere"]);
            setDemoPackage("signature");
          }}
        >
          <RotateCcw size={14} />
          Recommencer
        </button>
      </header>
      <main
        id="contenu"
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight") setIndex(Math.min(5, index + 1));
          if (e.key === "ArrowLeft") setIndex(Math.max(0, index - 1));
        }}
        tabIndex={0}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`presentation-slide slide-${index}`}
          >
            <div className="presentation-copy">
              <span className="eyebrow">{slide.overline}</span>
              <h1>
                {slide.title}
                <br />
                <em>{slide.accent}</em>
              </h1>
              <p>{slide.copy}</p>
              <div className="presentation-value">
                <span className="short-line" />
                {slide.value}
              </div>
              {index === 0 && (
                <Link className="button" href="/">
                  Explorer l’atelier <ArrowUpRight size={16} />
                </Link>
              )}
              {index === 1 && (
                <Link className="text-link" href="/#inspirations">
                  Ouvrir le carnet complet <ArrowUpRight size={15} />
                </Link>
              )}
              {index === 2 && (
                <Link className="text-link" href="/#experience">
                  Composer toute l’expérience <ArrowUpRight size={15} />
                </Link>
              )}
              {index === 4 && (
                <button className="button" onClick={startRequest}>
                  Essayer la demande de démonstration <ArrowUpRight size={16} />
                </button>
              )}
              {index === 5 && (
                <Link className="button" href="/admin-demo">
                  Découvrir l’espace Sihem <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
            <div className="presentation-stage">
              {index === 0 && (
                <div className="presentation-hero-image">
                  <Image
                    priority
                    src="/images/hero.jpg"
                    alt="Portrait nuptial d’illustration"
                    fill
                    sizes="(max-width: 760px) 95vw, 50vw"
                  />
                  <div>
                    <span className="eyebrow">CHAQUE MARIÉE MÉRITE</span>
                    <span>une histoire unique.</span>
                  </div>
                </div>
              )}
              {index === 1 && (
                <div className="presentation-looks">
                  {looks.slice(0, 3).map((l) => (
                    <button
                      key={l.id}
                      aria-label={`Sélectionner ${l.title}`}
                      aria-pressed={demoFavorites.includes(l.id)}
                      onClick={() =>
                        setDemoFavorites((f) =>
                          f.includes(l.id)
                            ? f.filter((id) => id !== l.id)
                            : [...f, l.id],
                        )
                      }
                    >
                      <Image
                        src={l.image}
                        alt={`${l.title} · illustration`}
                        fill
                        sizes="200px"
                      />
                      <span>
                        <Heart
                          size={17}
                          fill={
                            demoFavorites.includes(l.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                        {l.title}
                      </span>
                    </button>
                  ))}
                  <p className="micro">
                    Touchez un cœur · {demoFavorites.length} inspiration(s)
                    retenue(s). Images d’illustration.
                  </p>
                </div>
              )}
              {index === 2 && (
                <div className="presentation-style">
                  <div className="presentation-style-photo">
                    <Image
                      src={styles.find((s) => s.id === demoStyle)!.image}
                      alt="Style illustratif"
                      fill
                      sizes="400px"
                    />
                  </div>
                  <div className="presentation-style-options">
                    {styles.map((s) => (
                      <button
                        key={s.id}
                        aria-pressed={demoStyle === s.id}
                        className={demoStyle === s.id ? "selected" : ""}
                        onClick={() => setDemoStyle(s.id)}
                      >
                        {s.title}
                        {demoStyle === s.id && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                  <p className="micro">
                    Composition illustrative · le conseil final appartient au
                    salon.
                  </p>
                </div>
              )}
              {index === 3 && (
                <div className="presentation-package-list">
                  {packages.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setDemoPackage(p.id)}
                      aria-pressed={demoPackage === p.id}
                      className={demoPackage === p.id ? "selected" : ""}
                    >
                      <span className="eyebrow">
                        {p.evenings} SOIRÉE(S) · HYPOTHÈSE
                      </span>
                      <strong>{p.name}</strong>
                      <span>
                        {money(p.price)}
                        {demoPackage === p.id && <Check size={18} />}
                      </span>
                    </button>
                  ))}
                  <p className="micro">
                    Compositions et tarifs de démonstration, à valider.
                  </p>
                </div>
              )}
              {index === 4 && (
                <div className="presentation-dossier">
                  <span className="eyebrow">L’APERÇU D’UN DOSSIER</span>
                  <h2>
                    Sa journée.
                    <br />
                    <em>Ses envies.</em>
                  </h2>
                  <dl className="summary-list">
                    <div>
                      <dt>Style</dt>
                      <dd>{styles.find((s) => s.id === demoStyle)?.title}</dd>
                    </div>
                    <div>
                      <dt>Expérience</dt>
                      <dd>
                        {packages.find((p) => p.id === demoPackage)?.name}
                      </dd>
                    </div>
                    <div>
                      <dt>Inspirations</dt>
                      <dd>{demoFavorites.length} sélection(s)</dd>
                    </div>
                    <div>
                      <dt>Statut</dt>
                      <dd>À préparer · aucun envoi</dd>
                    </div>
                  </dl>
                  <p className="micro">
                    Acompte simulé, message préparé et suivi local. Aucune
                    réservation réelle.
                  </p>
                  <span className="micro">
                    {draft.name
                      ? "Un brouillon existe déjà sur cet appareil."
                      : "Aucune coordonnée requise pour explorer."}
                  </span>
                </div>
              )}
              {index === 5 && <Simulator compact />}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="presentation-controls">
        <div
          className="presentation-dots"
          role="group"
          aria-label="Écrans de présentation"
        >
          {slides.map((s, i) => (
            <button
              key={s.title}
              aria-label={`Écran ${i + 1}`}
              aria-current={i === index ? "step" : undefined}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <span className="micro">
          Concept de démonstration non officiel · {index + 1} / 6
        </span>
        <div>
          <button
            className="icon-button"
            aria-label="Écran précédent"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            <ArrowLeft size={19} />
          </button>
          <button
            className="button"
            onClick={() => setIndex(index === 5 ? 0 : index + 1)}
          >
            {index === 5 ? "Revoir le concept" : "La suite"}
            <ArrowRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
