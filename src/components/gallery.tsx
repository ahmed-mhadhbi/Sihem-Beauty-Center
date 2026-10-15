"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Heart, X, ArrowLeft, ArrowRight } from "lucide-react";
import { looks } from "@/config/sihem";
import { useAtelier } from "./atelier-provider";
import { Reveal } from "./shared";
export function Gallery() {
  const { draft, update } = useAtelier();
  const [filter, setFilter] = useState("Tout");
  const [active, setActive] = useState<string | null>(null);
  const [onlyFav, setOnlyFav] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = looks.filter(
    (l) =>
      (filter === "Tout" || l.category === filter) &&
      (!onlyFav || draft.favorites.includes(l.id)),
  );
  const selected = looks.find((l) => l.id === active);
  const toggle = (id: string) =>
    update({
      favorites: draft.favorites.includes(id)
        ? draft.favorites.filter((f) => f !== id)
        : [...draft.favorites, id],
    });
  useEffect(() => {
    if (active) dialog.current?.showModal();
    else dialog.current?.close();
  }, [active]);
  const move = (delta: number) => {
    const index = looks.findIndex((l) => l.id === active);
    setActive(looks[(index + delta + looks.length) % looks.length].id);
  };
  return (
    <section className="section gallery-section" id="inspirations">
      <Reveal>
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / LE CARNET D’INSPIRATIONS</span>
            <h2>
              Une allure.
              <br />
              <em>Mille émotions.</em>
            </h2>
          </div>
          <div className="section-intro">
            <p>
              Un regard, une matière, un détail.
              <br />
              Collectionnez ce qui vous ressemble,
              <br />
              nous imaginerons la suite ensemble.
            </p>
            <span className="micro">
              Galerie illustrative · à remplacer par les réalisations du salon.
            </span>
          </div>
        </div>
      </Reveal>
      <div className="gallery-toolbar">
        <div
          className="filter-list"
          role="group"
          aria-label="Filtrer les inspirations"
        >
          {["Tout", "Maquillage", "Coiffures", "Robes", "Soirée"].map((f) => (
            <button
              aria-pressed={filter === f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
              key={f}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          className={`text-link ${onlyFav ? "active" : ""}`}
          aria-pressed={onlyFav}
          onClick={() => setOnlyFav(!onlyFav)}
        >
          <Heart size={15} fill={onlyFav ? "currentColor" : "none"} /> Mes
          favoris ({draft.favorites.length})
        </button>
      </div>
      <div className="editorial-gallery">
        {filtered.map((look, i) => (
          <Reveal key={look.id} className={`look look-${i % 4}`}>
            <div className="look-image">
              <button
                className="image-open"
                onClick={() => setActive(look.id)}
                aria-label={`Agrandir : ${look.title}`}
              >
                <Image
                  src={look.image}
                  alt={`${look.title} Inspiration photographique, hors réalisations du salon.`}
                  fill
                  sizes="(max-width: 600px) 85vw, (max-width: 900px) 45vw, 25vw"
                />
                <span className="image-view">
                  Voir l’inspiration <ArrowUpRight size={18} />
                </span>
              </button>
              <button
                className="heart-button"
                aria-label={`${draft.favorites.includes(look.id) ? "Retirer" : "Enregistrer"} ${look.title}`}
                aria-pressed={draft.favorites.includes(look.id)}
                onClick={() => toggle(look.id)}
              >
                <Heart
                  size={18}
                  fill={
                    draft.favorites.includes(look.id) ? "currentColor" : "none"
                  }
                />
              </button>
              <span className="image-index">
                0{looks.findIndex((l) => l.id === look.id) + 1}
              </span>
            </div>
            <div className="look-caption">
              <span className="eyebrow">{look.category}</span>
              <h3>{look.title}</h3>
              <p>{look.note}</p>
              <button
                className="text-link"
                onClick={() => {
                  if (!draft.favorites.includes(look.id)) toggle(look.id);
                  document
                    .getElementById("experience")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Je veux ce style <ArrowUpRight size={14} />
              </button>
            </div>
          </Reveal>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="empty-state">
          Votre carnet attend ses premières inspirations. Explorez la galerie
          puis touchez le cœur pour les conserver.
        </p>
      )}
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Inspiration en plein écran"
        onCancel={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        {selected && (
          <div className="lightbox-inner">
            <button
              className="icon-button lightbox-close"
              aria-label="Fermer l’image"
              onClick={() => setActive(null)}
            >
              <X />
            </button>
            <div className="lightbox-photo">
              <Image
                src={selected.image}
                alt={`${selected.title} — image d’illustration`}
                fill
                sizes="90vw"
              />
            </div>
            <div className="lightbox-caption">
              <div>
                <span className="eyebrow">IMAGE D’ILLUSTRATION</span>
                <h3>{selected.title}</h3>
              </div>
              <button
                className="icon-button"
                aria-label="Inspiration précédente"
                onClick={() => move(-1)}
              >
                <ArrowLeft />
              </button>
              <button
                className="icon-button"
                aria-label="Inspiration suivante"
                onClick={() => move(1)}
              >
                <ArrowRight />
              </button>
              <button
                className="button small"
                onClick={() => toggle(selected.id)}
              >
                <Heart size={16} />
                {draft.favorites.includes(selected.id)
                  ? "Enregistrée"
                  : "Enregistrer"}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
