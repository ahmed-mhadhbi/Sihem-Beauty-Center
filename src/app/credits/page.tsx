import Link from "next/link";
import { looks } from "@/config/sihem";
export default function Credits() {
  return (
    <main className="credits-page" id="contenu">
      <Link className="text-link" href="/">
        ← Revenir à l’atelier
      </Link>
      <span className="eyebrow">TRANSPARENCE / LES VISUELS</span>
      <h1>
        Le carnet des <em>crédits.</em>
      </h1>
      <p>
        Toutes les photographies de ce concept sont des images d’illustration.
        Elles ne représentent ni des clientes, ni des réalisations, ni des robes
        disponibles chez Sihem Beauty Center.
      </p>
      <p>
        Elles proviennent de Pexels et sont proposées sous la{" "}
        <a
          href="https://www.pexels.com/license/"
          target="_blank"
          rel="noreferrer"
        >
          licence Pexels
        </a>
        . Elles devront être remplacées par des photos autorisées du salon pour
        la version officielle.
      </p>
      <ul>
        <li>
          <a
            href="https://www.pexels.com/photo/charming-bride-in-wedding-dress-with-makeup-in-bijouterie-4374420/"
            target="_blank"
            rel="noreferrer"
          >
            Portrait principal et inspiration « Ligne épurée »
          </a>
        </li>
        {looks.map((l) => (
          <li key={l.id}>
            <a href={l.source} target="_blank" rel="noreferrer">
              {l.title}
            </a>
          </li>
        ))}
      </ul>
      <p>
        Typographies : Cormorant Garamond et Manrope, distribuées sous licence
        SIL Open Font License. Fichiers hébergés localement.
      </p>
      <p className="micro">
        Concept de démonstration réalisé par Kairo Dev — non officiel.
      </p>
    </main>
  );
}
