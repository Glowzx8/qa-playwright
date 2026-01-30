# QA Playwright — CURA Healthcare (projet de démonstration)

En reconversion professionnelle vers le métier de QA/testeur logiciel (formation ENI Nantes), ce dépôt est mon projet « vitrine » pour m'exercer sur Playwright et TypeScript sur une application de démonstration (CURA Healthcare).

Le but n'était pas d'accumuler les tests, mais de présenter mon approche dans l'automatisation : couvrir les parcours importants, rédiger des tests clairs, et disposer d'une CI simple.

## Mon objectif
- Une méthode axée sur le parcours utilisateur et la non-régression
- Des tests qui sont faciles à lire et à maintenir (POM + fixtures)
- Un système d'intégration continue basé sur GitHub Actions (CI).

## Ce qui est testé (exemples)
- Parcours principal : prise de rendez-vous “cas nominal” (données valides)
- Cas négatifs : champs obligatoires / validations (ex: date manquante) / mauvais identifiants
- Quelques tests “smoke” pour vérifier que l’appli est opérationnelle

> Je privilégie la qualité des scénarios et la clarté du test plutôt que la quantité.

## Structure du projet
- `pages/` : Page Objects (interactions réutilisables)
- `tests/`
  - `regression/` : tests de non-régression (cas aux limites + authentification)
  - `smoke/` : tests rapides
- `tests/fixtures/` : fixtures Playwright (pages prêtes à l’emploi, user connecté / user non connecté)
- `tests/helpers/` : données / helpers pour garder les tests simples à lire

## Quelques choix techniques
- **POM (Page Object Model)** : les actions de page (login, remplir le formulaire, soumettre) sont centralisées dans des classes → les tests restent lisibles.
- **Fixtures Playwright** : je prépare ce dont les tests ont besoin (pages prêtes, user déjà connecté si nécessaire) → moins de duplication.
- **GitHub Actions (CI)** : les tests tournent automatiquement à chaque push/PR → feedback rapide.

## Lancer le projet
Installation :
```bash
npm install
npx playwright install
```
Lancer les tests :
```bash
npx playwright test
```
Report HTML :   
```bash
npx playwright show-report
```

## Notes (site de démo)
CURA Healthcare est une application de démonstration : certaines règles métier ne sont pas forcément implémentées.
Exemple : l'entrée d'une date antérieure (J-1) est acceptée.  
Dans ce repo, les tests vérifient surtout la cohérence du parcours.

## Évolution
Suite à des retours de QA expérimenté(e) :
- J’ai utilisé des fixtures pour rendre les tests plus lisibles et éviter la duplication ;
- J’ai renforcé la couverture avec davantage de cas négatifs et de cas aux limites (authentification, validations, dates).

