"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Flower2,
  Heart,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Header, Footer, Reveal } from "@/components/shared";
import { Gallery } from "@/components/gallery";
import { Configurator } from "@/components/configurator";
import { Packages } from "@/components/packages";
import { useAtelier } from "@/components/atelier-provider";
export default function Home() {
  const { setBooking } = useAtelier();
  const reduced = useReducedMotion();
  return (
    <>
      <Header />
      <main id="contenu">
        <section className="hero">
          <div className="hero-copy">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <span className="eyebrow hero-overline">
                <span className="short-line" />
                SIHEM BEAUTY CENTER · REGUEB
              </span>
              <h1>
                Votre beauté.
                <br />
                Votre histoire.
                <br />
                <em>Votre grand jour.</em>
              </h1>
              <p>
                Une expérience beauté imaginée autour
                <br className="desktop-break" /> de vos plus beaux moments.
              </p>
              <div className="hero-buttons">
                <a className="button" href="#experience">
                  Créer mon expérience <ArrowUpRight size={18} />
                </a>
                <a className="text-link" href="#inspirations">
                  Découvrir nos réalisations <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="hero-foot">
                <span>POUR LES INSTANTS QUI COMPTENT.</span>
                <a href="#atelier" aria-label="Découvrir l’atelier">
                  <ArrowDown size={16} />
                </a>
              </div>
            </motion.div>
          </div>
          <div className="hero-photo">
            <Image
              src="/images/hero.jpg"
              alt="Portrait nuptial d’illustration : mariée au voile et au diadème. Ce visuel ne représente pas une réalisation du salon."
              fill
              priority
              sizes="(max-width: 760px) 100vw, 53vw"
              quality={90}
            />
            <div className="hero-photo-shade" />
            <span className="photo-top-note">
              LA BEAUTÉ D’UN INSTANT. L’ÉMOTION POUR TOUJOURS.
            </span>
            <div className="photo-caption">
              <span className="photo-caption-line" />
              <p>
                Le début de
                <br />
                <em>votre histoire.</em>
              </p>
              <span>COLLECTION D’INSPIRATIONS / 01</span>
            </div>
            <span className="photo-credit">Image d’illustration · Pexels</span>
            <div className="round-seal" aria-hidden="true">
              <Flower2 size={26} strokeWidth={1} />
              <span>
                UNE ALLURE
                <br />À VOTRE IMAGE
              </span>
            </div>
          </div>
        </section>
        <div className="expertise-strip">
          <span>MAQUILLAGE MARIÉE</span>
          <Flower2 size={14} />
          <span>COIFFURE & ÉLÉGANCE</span>
          <Flower2 size={14} />
          <span>ROBES & INSPIRATIONS</span>
          <Flower2 size={14} />
          <span>INSTANTS PRÉCIEUX</span>
        </div>
        <section className="atelier-intro section" id="atelier">
          <Reveal>
            <span className="eyebrow">L’ATELIER / REGUEB, TUNISIE</span>
            <div className="intro-grid">
              <h2>
                Bien plus qu’une mise en beauté.
                <br />
                <em>Une attention, rien que pour vous.</em>
              </h2>
              <div>
                <p>
                  Il y a des jours que l’on imagine longtemps. Des détails que
                  l’on garde précieusement. Et cette envie, si simple, de se
                  sentir pleinement soi-même.
                </p>
                <p>
                  Avec ce concept pour Sihem Beauty Center, explorez vos envies
                  de maquillage, de coiffure et de robe. Votre histoire commence
                  par une inspiration ; elle se construit dans l’échange avec
                  Sihem.
                </p>
                <span className="atelier-signature">
                  Chaque mariée mérite une histoire unique.
                </span>
              </div>
            </div>
          </Reveal>
        </section>
        <Gallery />
        <Configurator />
        <Packages />
        <section className="journey-section section">
          <Reveal>
            <span className="eyebrow">DE L’INSPIRATION À LA RENCONTRE</span>
            <h2>
              Le premier pas,
              <br />
              <em>en toute simplicité.</em>
            </h2>
            <div className="journey-grid">
              {[
                {
                  icon: Heart,
                  title: "Laissez-vous inspirer.",
                  text: "Gardez vos looks favoris dans votre carnet personnel.",
                },
                {
                  icon: Sparkles,
                  title: "Imaginez votre expérience.",
                  text: "Associez vos envies, votre forfait et les petites attentions.",
                },
                {
                  icon: Flower2,
                  title: "Rencontrons-nous.",
                  text: "Préparez une demande. Sihem pourra ensuite valider les détails avec vous.",
                },
              ].map((item, i) => (
                <div key={item.title}>
                  <span className="journey-number">0{i + 1}</span>
                  <item.icon size={26} strokeWidth={1} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
        <section className="closing-section">
          <Image
            src="/images/hair.jpg"
            alt="Silhouette nuptiale d’illustration au bord d’une fenêtre"
            fill
            sizes="100vw"
          />
          <div className="closing-shade" />
          <Reveal>
            <span className="eyebrow">LE PLUS BEAU DÉTAIL, C’EST VOUS.</span>
            <h2>
              Et si l’on imaginait
              <br />
              <em>votre grand jour ?</em>
            </h2>
            <button className="button light" onClick={() => setBooking(true)}>
              Préparer mon rendez-vous <ArrowUpRight size={17} />
            </button>
            <p>Regueb, Sidi Bouzid · +216 97 849 399</p>
            <span className="micro">
              Image d’illustration · demande de démonstration
            </span>
          </Reveal>
        </section>
        <div className="presentation-invite">
          <span>
            Une nouvelle expérience imaginée pour Sihem Beauty Center.
          </span>
          <Link href="/presentation">
            Découvrir le concept Kairo Dev <ArrowUpRight size={15} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
