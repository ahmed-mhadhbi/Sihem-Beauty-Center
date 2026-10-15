"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  RotateCcw,
  Users,
  X,
} from "lucide-react";
import { useAtelier } from "@/components/atelier-provider";
import { Calendar } from "@/components/calendar";
import { Simulator } from "@/components/simulator";
import {
  extras,
  looks,
  packages,
  sihem,
  styles,
  hairstyles,
  dresses,
} from "@/config/sihem";
import { dateLabel, fictionalRequests, money, Request } from "@/lib/model";
const statuses: Request["status"][] = [
  "Nouvelle demande",
  "En attente",
  "Confirmée",
  "Annulée",
];
export default function Admin() {
  const { requests, setStatus, reset, ready } = useAtelier();
  const [examples, setExamples] = useState<Request[]>(() =>
    fictionalRequests(),
  );
  const [source, setSource] = useState("local");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [selected, setSelected] = useState("");
  const [detail, setDetail] = useState<Request | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  useEffect(() => {
    if (!detail && !resetOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const panel = document.querySelector<HTMLElement>(
      ".detail-panel, .reset-panel",
    );
    const background = Array.from(
      document.querySelectorAll<HTMLElement>(".admin-sidebar, .admin-main"),
    );
    background.forEach((el) => {
      el.inert = true;
    });
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("button")?.focus();
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDetail(null);
        setResetOpen(false);
      }
      if (event.key !== "Tab") return;
      const items = panel?.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, summary, [tabindex="0"]',
      );
      if (!items?.length) return;
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      background.forEach((el) => {
        el.inert = false;
      });
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handle);
      previous?.focus();
    };
  }, [detail, resetOpen]);
  const data = source === "local" ? requests : examples;
  const filtered = data.filter(
    (r) =>
      (statusFilter === "Tous" || r.status === statusFilter) &&
      (!selected || r.draft.date === selected),
  );
  const confirmed = data.filter((r) => r.status === "Confirmée");
  const average = data.length
    ? data.reduce((a, r) => a + r.total, 0) / data.length
    : 0;
  const popular = useMemo(
    () =>
      packages
        .map((p) => ({
          ...p,
          count: data.filter((r) => r.draft.package === p.id).length,
        }))
        .sort((a, b) => b.count - a.count),
    [data],
  );
  const changeStatus = (r: Request, status: Request["status"]) => {
    if (r.fictional)
      setExamples((items) =>
        items.map((item) => (item.id === r.id ? { ...item, status } : item)),
      );
    else setStatus(r.id, status);
  };
  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <Link className="brand" href="/">
          SIHEM<span>L’ESPACE ATELIER</span>
        </Link>
        <span className="admin-demo-label">DÉMONSTRATION LOCALE</span>
        <nav aria-label="Navigation espace Sihem">
          <a href="#demandes">
            <LayoutDashboard size={17} />
            Vue d’ensemble
          </a>
          <a href="#planning">
            <CalendarDays size={17} />
            Le planning
          </a>
          <a href="#simulateur">
            <ArrowUpRight size={17} />
            Les opportunités
          </a>
          <Link href="/presentation">
            <Users size={17} />
            Présentation client
          </Link>
        </nav>
        <div className="sidebar-bottom">
          <p>
            Un concept pensé pour
            <br />
            <strong>votre quotidien.</strong>
          </p>
          <Link href="/">
            <ArrowLeft size={15} />
            Revenir à l’atelier
          </Link>
          <span>KAIRO DEV / CONCEPT NON OFFICIEL</span>
        </div>
      </aside>
      <main className="admin-main" id="contenu">
        <header className="admin-header">
          <div>
            <span className="eyebrow">L’ATELIER, CÔTÉ COULISSES</span>
            <h1>
              Bienvenue, <em>Sihem.</em>
            </h1>
            <p>Des envies de mariées aux rendez-vous à préparer.</p>
          </div>
          <button
            className="button outline small"
            onClick={() => setResetOpen(true)}
          >
            <RotateCcw size={14} />
            Réinitialiser la démo
          </button>
        </header>
        <div className="admin-disclaimer">
          Espace de présentation sans authentification. Statuts simulés, aucune
          confirmation commerciale ni notification réelle. Les données restent
          dans ce navigateur.
        </div>
        <div
          className="source-tabs"
          role="group"
          aria-label="Source des demandes"
        >
          <button
            aria-pressed={source === "local"}
            className={source === "local" ? "active" : ""}
            onClick={() => {
              setSource("local");
              setSelected("");
            }}
          >
            Demandes de cet appareil <span>{requests.length}</span>
          </button>
          <button
            aria-pressed={source === "examples"}
            className={source === "examples" ? "active" : ""}
            onClick={() => {
              setSource("examples");
              setSelected("");
            }}
          >
            Exemples fictifs <span>{examples.length}</span>
          </button>
        </div>
        <p className="micro">
          {source === "local"
            ? "Dossiers créés dans cette démonstration. Les valeurs sont des estimations fictives."
            : "Jeu de données entièrement fictif, sans lien avec l’activité réelle du salon. Les changements de ce jeu ne sont pas conservés."}
        </p>
        <div className="admin-stats">
          <div>
            <span>Demandes reçues</span>
            <strong>{data.length.toString().padStart(2, "0")}</strong>
            <small>
              {source === "local" ? "Sur cet appareil" : "Exemples fictifs"}
            </small>
          </div>
          <div>
            <span>Statut « Confirmée »</span>
            <strong>{confirmed.length.toString().padStart(2, "0")}</strong>
            <small>Simulation uniquement</small>
          </div>
          <div>
            <span>Valeur moyenne indicative</span>
            <strong>{money(average)}</strong>
            <small>Tarifs de démonstration</small>
          </div>
          <div>
            <span>Compléments sélectionnés</span>
            <strong>
              {data
                .reduce((n, r) => n + r.draft.extras.length, 0)
                .toString()
                .padStart(2, "0")}
            </strong>
            <small>À valider avec le salon</small>
          </div>
        </div>
        <section className="admin-panel" id="demandes">
          <div className="panel-title">
            <div>
              <span className="eyebrow">LES HISTOIRES À ÉCRIRE</span>
              <h2>Les demandes.</h2>
            </div>
            <label className="compact-field">
              Filtrer le statut
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>Tous</option>
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          {selected && (
            <button className="text-link" onClick={() => setSelected("")}>
              Retirer le filtre : {dateLabel(selected)} <X size={14} />
            </button>
          )}
          <div className="request-table-wrap">
            <table className="request-table">
              <thead>
                <tr>
                  <th>Mariée / date souhaitée</th>
                  <th>Expérience</th>
                  <th>Valeur illustrative</th>
                  <th>Statut de démo</th>
                  <th>Dossier</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <strong>{r.draft.name}</strong>
                      <small>
                        {dateLabel(r.draft.date)}
                        {r.fictional ? " · fictif" : " · local"}
                      </small>
                    </td>
                    <td>
                      {packages.find((p) => p.id === r.draft.package)?.name}
                      <small>
                        {r.draft.favorites.length} inspiration(s) ·{" "}
                        {r.draft.extras.length} complément(s)
                      </small>
                    </td>
                    <td>{money(r.total)}</td>
                    <td>
                      <select
                        aria-label={`Statut de ${r.draft.name}`}
                        value={r.status}
                        className={`status-select status-${statuses.indexOf(r.status)}`}
                        onChange={(e) =>
                          changeStatus(r, e.target.value as Request["status"])
                        }
                      >
                        {statuses.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="icon-button"
                        aria-label={`Voir le dossier de ${r.draft.name}`}
                        onClick={() => setDetail(r)}
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <FlowerIcon />
              <h3>
                {ready
                  ? "Votre prochaine histoire commence ici."
                  : "Chargement des dossiers…"}
              </h3>
              <p>
                Créez une demande depuis l’atelier ou consultez les exemples
                fictifs pour explorer cette démonstration.
              </p>
              <Link className="text-link" href="/#experience">
                Composer une expérience <ArrowUpRight size={14} />
              </Link>
            </div>
          )}
        </section>
        <div className="admin-two-columns">
          <section className="admin-panel" id="planning">
            <div className="panel-title">
              <div>
                <span className="eyebrow">LE TEMPS DE CHAQUE MARIÉE</span>
                <h2>Le planning.</h2>
              </div>
            </div>
            <Calendar
              readonly
              value={selected}
              onChange={setSelected}
              events={data.map((r) => ({
                date: r.draft.date,
                fictional: r.fictional,
              }))}
            />
            <p className="calendar-legend">
              <span
                className={`legend-dot ${source === "local" ? "local" : ""}`}
              />
              {source === "local"
                ? "Demandes locales de démonstration"
                : "Rendez-vous entièrement fictifs"}
            </p>
          </section>
          <section className="admin-panel">
            <span className="eyebrow">LES ENVIES QUI SE DESSINENT</span>
            <h2>Les expériences choisies.</h2>
            {popular.map((p) => (
              <div className="popularity-row" key={p.id}>
                <div>
                  <span>{p.name}</span>
                  <strong>{p.count}</strong>
                </div>
                <div className="bar-track">
                  <div
                    style={{
                      width: `${data.length ? (p.count / data.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
            <h3 className="admin-subtitle">Les attentions complémentaires</h3>
            {extras.map((e) => (
              <div className="extra-stat" key={e.id}>
                <span>{e.name}</span>
                <span>
                  {data.filter((r) => r.draft.extras.includes(e.id)).length}
                </span>
              </div>
            ))}
            <p className="micro">
              Répartition du jeu sélectionné, sans historique réel du salon.
            </p>
          </section>
        </div>
        <Simulator />
        <div className="admin-footer">
          Concept de démonstration réalisé par Kairo Dev — non officiel.{" "}
          <Link href="/presentation">
            Lancer la présentation <ArrowUpRight size={14} />
          </Link>
        </div>
      </main>
      {detail && (
        <div
          className="detail-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDetail(null);
          }}
        >
          <section
            className="detail-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dossier-title"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Escape") setDetail(null);
            }}
          >
            <button
              autoFocus
              className="icon-button detail-close"
              aria-label="Fermer le dossier"
              onClick={() => setDetail(null)}
            >
              <X />
            </button>
            <span className="eyebrow">
              DOSSIER {detail.fictional ? "FICTIF" : "LOCAL"} / DÉMONSTRATION
            </span>
            <h2 id="dossier-title">{detail.draft.name}</h2>
            <p>
              {detail.draft.phone || "Téléphone non renseigné · exemple fictif"}
            </p>
            <dl className="summary-list">
              {[
                ["Date souhaitée", dateLabel(detail.draft.date)],
                [
                  "Style",
                  styles.find((s) => s.id === detail.draft.style)?.title,
                ],
                [
                  "Coiffure",
                  hairstyles.find((h) => h.id === detail.draft.hair)?.title,
                ],
                [
                  "Robe illustrative",
                  dresses.find((d) => d.id === detail.draft.dress)?.title ||
                    "À discuter",
                ],
                [
                  "Forfait",
                  packages.find((p) => p.id === detail.draft.package)?.name,
                ],
                [
                  "Compléments",
                  extras
                    .filter((e) => detail.draft.extras.includes(e.id))
                    .map((e) => e.name)
                    .join(", ") || "Aucun",
                ],
                [
                  "Inspirations",
                  looks
                    .filter((l) => detail.draft.favorites.includes(l.id))
                    .map((l) => l.title)
                    .join(", ") || "Aucune",
                ],
                ["Préférences", detail.draft.preferences || "Non précisées"],
                ["Commentaire", detail.draft.comment || "Aucun"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="deposit-preview">
              <span className="eyebrow">ACOMPTE SIMULÉ · AUCUN PAIEMENT</span>
              <div>
                <span>Valeur indicative</span>
                <strong>{money(detail.total)}</strong>
              </div>
              <div>
                <span>Acompte proposé ({sihem.booking.depositPercent} %)</span>
                <strong>
                  {money(
                    Math.round(
                      (detail.total * sihem.booking.depositPercent) / 100,
                    ),
                  )}
                </strong>
              </div>
              <div>
                <span>Solde simulé</span>
                <strong>
                  {money(
                    detail.total -
                      Math.round(
                        (detail.total * sihem.booking.depositPercent) / 100,
                      ),
                  )}
                </strong>
              </div>
            </div>
            <details className="reminder-preview">
              <summary>
                Prévisualiser les rappels <ChevronDown size={14} />
              </summary>
              {sihem.reminders.map((r) => (
                <div key={r.title}>
                  <strong>{r.title}</strong>
                  <p>
                    {r.text
                      .replace("{nom}", detail.draft.name)
                      .replace("{date}", dateLabel(detail.draft.date))}
                  </p>
                </div>
              ))}
              <p className="micro">Aucune notification réelle envoyée.</p>
            </details>
            <button className="button" onClick={() => setDetail(null)}>
              Fermer le dossier
            </button>
          </section>
        </div>
      )}
      {resetOpen && (
        <div className="detail-overlay">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            className="reset-panel"
          >
            <h2 id="reset-title">Repartir d’une page blanche ?</h2>
            <p>
              Le brouillon, les favoris et les demandes de cet appareil seront
              supprimés. Les exemples fictifs seront rétablis.
            </p>
            <div>
              <button
                autoFocus
                className="button outline"
                onClick={() => setResetOpen(false)}
              >
                Conserver les données
              </button>
              <button
                className="button"
                onClick={() => {
                  reset();
                  setExamples(fictionalRequests());
                  setSelected("");
                  setResetOpen(false);
                }}
              >
                Réinitialiser
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
function FlowerIcon() {
  return <span className="empty-flower">✳</span>;
}
