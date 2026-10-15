# SIHEM — L’Atelier des Mariées

Concept de démonstration réalisé par **Kairo Dev** — non officiel. Application Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion et Lucide. Interface en français, photographies et polices hébergées localement.

## Lancement

Prérequis : Node.js 22 ou 24 et npm.

```powershell
cd "D:\Kairo\Sihem Beauty Center"
npm ci
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

- `/` : atelier, inspirations, configurateur et forfaits.
- `/admin-demo` : demandes locales, exemples fictifs séparés, planning et simulation commerciale.
- `/presentation` : présentation guidée en six écrans.
- `/credits` : sources photographiques et licences.

Production locale :

```powershell
npm run typecheck
npm run build
npm start
```

## Configuration

`src/config/sihem.ts` centralise l’identité, les contacts, les services, les visuels, les forfaits, les compléments, l’acompte proposé et les messages de rappel. Les règles de calcul, la validation du téléphone et la génération du récapitulatif sont dans `src/lib/model.ts`.

Tous les forfaits, inclusions, durées et prix affichés sont des **hypothèses de démonstration**. Le montant de 1 000 DT pour deux soirées est une référence historique fournie dans le brief, à confirmer. Il ne constitue pas une offre actuelle. Les robes sont des inspirations sans inventaire associé. Certaines illustrations sont réutilisées dans plusieurs directions créatives et ne garantissent pas une reproduction exacte du style.

La demande est conservée sous la clé `sihem-atelier-v1` dans le `localStorage` du navigateur. Elle n’est pas envoyée au salon. Les données ne se synchronisent pas entre appareils. Les statuts sont simulés ; « Confirmée » ne réserve aucune date. Les exemples fictifs du tableau de bord sont séparés des demandes créées localement ; leurs changements sont limités à la visite en cours. La réinitialisation efface uniquement les données de ce concept.

Le numéro public n’est pas présumé être un numéro WhatsApp validé. `sihem.whatsapp.validatedForUsage` vaut `false`. Le message peut être préparé et copié. Passer ce paramètre à `true` **uniquement après validation du salon**, avec un numéro tunisien conforme. Ouvrir WhatsApp ne prouve pas qu’un message a été envoyé : l’application ne présente jamais cela comme un envoi réussi.

L’acompte de 30 % est configurable et entièrement simulé. Aucun paiement ni numéro de carte n’est collecté. Les rappels sont des prévisualisations uniquement.

## Tests

Un serveur doit tourner sur le port 3000 (`npm start` après build, ou `npm run dev`). Puis, dans un second terminal :

```powershell
npx playwright install chromium
npm run test:e2e
```

Le parcours couvre favoris, agrandissement d’une photo, validation du calendrier, style/coiffure/robe, forfait et options, formulaire invalide puis valide, estimation/acompte, sauvegarde, message WhatsApp, consultation et statut persistant, simulation et présentation. Les contrôles de largeur et captures couvrent 360, 390, 768 et 1440 px pour les trois routes principales. Les captures sont dans `test-results/visuels/`, le rapport dans `playwright-report/`.

## Déploiement Vercel

1. Placer ce dossier dans un dépôt Git privé, en excluant les chemins du `.gitignore`.
2. Importer le dépôt dans Vercel et sélectionner **Next.js**.
3. Choisir ce dossier comme répertoire racine. Installation : `npm ci`. Build : `npm run build`. Laisser le répertoire de sortie par défaut.
4. Sélectionner Node.js 22 ou 24. Aucune variable d’environnement ni base de données n’est nécessaire pour cette démo.
5. Déployer une prévisualisation et tester les trois routes, le stockage local et les images sur un téléphone.
6. Garder une protection d’accès Vercel pour la présentation si disponible sur le compte. `robots: noindex` décourage l’indexation, mais ne protège pas l’accès.

Le projet n’a pas été publié dans un compte Vercel. `/admin-demo` est public et non sécurisé : cette route est destinée à la présentation, pas à l’exploitation de véritables dossiers clients.

## À demander à Mme Sihem avant la version réelle

- Logo officiel et validation du nom de concept, de la signature et de la direction artistique.
- Photos originales autorisées, nom du photographe, accord d’utilisation et consentement des personnes représentées.
- Catalogue réel des robes : références, tailles, état, conditions, caution et calendrier de location.
- Prestations réellement proposées, inclusions, durées, forfaits, prix à jour et traitement des soirées supplémentaires.
- Modalités d’acompte, d’annulation, de remboursement et de confirmation.
- Horaires, capacité de préparation, jours de fermeture, adresse précise et localisation cartographique.
- Validation du téléphone WhatsApp, des messages et des personnes responsables du suivi.
- Mentions légales, information de confidentialité, consentements et durée de conservation à définir avec le salon et ses conseils.

## Intégrations pour une mise en production

Remplacer le stockage navigateur par une API et une base de données avec contrôles serveur, authentification et accès réservés à l’équipe. Ajouter la gestion des créneaux et des capacités, la vérification de disponibilité des robes, les devis validés et la prévention des doubles réservations. Connecter un service de messagerie autorisé, les notifications avec consentement et un prestataire de paiement adapté au salon. Un paiement confirmé doit être vérifié côté serveur par événement signé ; aucune confirmation commerciale ne doit dépendre uniquement du navigateur. Prévoir journalisation, sauvegardes, gestion des erreurs, suppression/export des données, monitoring et tests de sécurité.

## Présentation commerciale

Le script de 90 secondes et le déroulé de la démonstration sont dans `PRESENTATION-90-SECONDES.md`.

## Visuels et licences

Les cinq photographies sont des illustrations Pexels : voir `/credits` et `public/ASSETS.md`. Elles ne représentent aucune réalisation, cliente ou robe du salon. Polices Cormorant Garamond et Manrope sous licence SIL Open Font License ; sources et licences dans `public/fonts/`.
