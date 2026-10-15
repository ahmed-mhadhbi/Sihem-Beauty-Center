"use client";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Heart, MapPin, Phone } from "lucide-react";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useAtelier } from "./atelier-provider";
import { sihem } from "@/config/sihem";
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Header({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const { draft, setBooking } = useAtelier();
  return (
    <header className={`site-header ${dark ? "on-dark" : ""}`}>
      <Link href="/" className="brand" aria-label="Sihem, accueil">
        SIHEM<span>L’ATELIER DES MARIÉES</span>
      </Link>
      <nav aria-label="Navigation principale" className={open ? "is-open" : ""}>
        <Link onClick={() => setOpen(false)} href="/#atelier">
          L’atelier
        </Link>
        <Link onClick={() => setOpen(false)} href="/#inspirations">
          Les inspirations
        </Link>
        <Link onClick={() => setOpen(false)} href="/#forfaits">
          Les expériences
        </Link>
      </nav>
      <div className="header-actions">
        <a
          className="favorites-link"
          href="/#inspirations"
          aria-label={`${draft.favorites.length} inspirations favorites`}
        >
          <Heart size={17} />
          <span>{draft.favorites.length.toString().padStart(2, "0")}</span>
        </a>
        <button className="nav-cta" onClick={() => setBooking(true)}>
          Mon rendez-vous <ArrowUpRight size={15} />
        </button>
        <button
          className="menu-toggle"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <Link href="/" className="brand">
            SIHEM<span>L’ATELIER DES MARIÉES</span>
          </Link>
          <p>
            Chaque mariée mérite
            <br />
            une histoire unique.
          </p>
        </div>
        <div>
          <span className="eyebrow">RETROUVONS-NOUS</span>
          <a href={`tel:${sihem.phoneLink}`}>
            <Phone size={14} />
            {sihem.phone}
          </a>
          <p>
            <MapPin size={14} />
            {sihem.address}
          </p>
          <a href={sihem.facebook} target="_blank" rel="noreferrer">
            Découvrir le Facebook du salon <ArrowUpRight size={14} />
          </a>
        </div>
        <div>
          <span className="eyebrow">LE CONCEPT KAIRO DEV</span>
          <Link href="/presentation">
            Présentation guidée · 90 secondes <ArrowUpRight size={14} />
          </Link>
          <Link href="/admin-demo">
            Espace Sihem · démonstration <ArrowUpRight size={14} />
          </Link>
          <a href="/credits">Crédits des images</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          Concept de démonstration réalisé par Kairo Dev — non officiel.
        </span>
        <span>Imaginé avec soin, en Tunisie.</span>
      </div>
    </footer>
  );
}
export function DemoNote({ children }: { children?: ReactNode }) {
  return (
    <p className="demo-note">
      <span className="dot" />
      {children ||
        "Démonstration · prestations et tarifs illustratifs à valider avec le salon."}
    </p>
  );
}
