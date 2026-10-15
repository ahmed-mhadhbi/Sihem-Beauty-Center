import Link from "next/link";
export default function NotFound() {
  return (
    <main id="contenu" className="credits-page">
      <span className="eyebrow">SIHEM / PAGE INTROUVABLE</span>
      <h1>
        Retrouvons
        <br />
        <em>le fil de votre histoire.</em>
      </h1>
      <p>Cette page n’existe pas ou a été déplacée. L’atelier vous attend.</p>
      <Link className="button" href="/">
        Revenir à l’atelier
      </Link>
    </main>
  );
}
