# Vérification de livraison

Vérifications réalisées le 15 octobre 2026, sous Windows avec Node.js 24 et Chromium via Playwright, sur le serveur de production Next.js local.

## Résultats

- `npm run typecheck` : réussi, aucune erreur TypeScript.
- `npm run build` : réussi. Routes `/`, `/admin-demo`, `/presentation`, `/credits` et page 404 française générées.
- `npm start` : serveur de production lancé sur le port 3000.
- `npm run test:e2e` : **7 tests réussis**, dernière exécution en 48,3 secondes.

## Parcours réellement exécutés

Deux parcours complets, à 390 et 1440 px : filtrage de la galerie, favori, photo en plein écran et fermeture clavier, validation de la date, changement de style/coiffure/robe, forfait Prestige, soin complémentaire, estimation à 1 540 DT, coordonnées invalides puis valides, simulation d’acompte à 462 DT, sauvegarde locale et copie effective dans le presse-papiers. Vérification du texte WhatsApp et de l’absence de lien d’envoi tant que le numéro n’est pas validé.

Consultation du dossier dans l’espace Sihem, modification du statut puis rechargement pour vérifier sa persistance. Manipulation du simulateur, y compris un scénario de baisse de conversion produisant une valeur négative. Parcours des six écrans de présentation et retour au premier écran. Aucun événement `pageerror` pendant ces parcours.

Quatre tests de mise en page couvrent 360, 390, 768 et 1440 px sur l’accueil, le tableau de bord et la présentation : pas de débordement horizontal du document, ouverture du panneau de demande dans la largeur de l’écran et images chargées avec dimensions naturelles non nulles. Captures pleine page produites et inspection visuelle des vues mobile, tablette et ordinateur. Un dernier test vérifie la réinitialisation des données locales.

## Captures et rapport

`test-results/visuels/` contient les captures des trois routes aux quatre largeurs, les vues du premier écran et les expériences composées à 390 et 1440 px. `playwright-report/index.html` contient le rapport automatisé. Ces fichiers de QA sont régénérés lors du prochain lancement des tests et exclus du suivi Git.

## Portée et limites

Les contrôles navigateur ont été effectués dans Chromium, pas sur des appareils physiques ni dans Safari ou Firefox. Aucun audit Lighthouse, audit WCAG exhaustif ou test de service externe n’est revendiqué. Le code prévoit le mouvement réduit, les liens d’évitement, les contrôles au clavier, des dialogues modaux et le confinement du focus des panneaux de gestion.

Le build émet un avertissement non bloquant concernant l’absence du plugin Next dans la configuration ESLint héritée de l’environnement parent. La compilation, les vérifications de types et tous les tests ci-dessus réussissent. Le compilateur natif SWC local, initialement incomplet après l’interruption de l’installation, a été réinstallé et vérifié.

Les tests ne contactent pas le salon et ne réalisent aucun paiement. Aucun déploiement Vercel n’a été effectué. Les données locales et les exemples restent une démonstration sans système de réservation connecté ni espace administrateur sécurisé.
