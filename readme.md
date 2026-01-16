# 🧪 Stratégie d’automatisation QA — CURA Healthcare

> Projet d’automatisation QA avec Playwright illustrant une stratégie réaliste de tests E2E, de régression et exploratoires sur l’application CURA Healthcare.

## 🎯 Objectif du projet

Ce projet a pour objectif de démontrer une **stratégie réaliste et maintenable de tests automatisés** autour de la fonctionnalité **de prise de rendez-vous** de l’application CURA Healthcare, en utilisant **Playwright**.

L’objectif n’est pas uniquement de faire “passer des tests”, mais de :

* couvrir les **parcours utilisateurs critiques**
* sécuriser la **non-régression fonctionnelle**
* maintenir une suite de tests **lisible, expliquable et industrialisable**

Ce projet est conçu comme un **exemple de stratégie QA junior / début mid**, orientée lisibilité, maintenabilité et raisonnement produit.

---

## 🌐 Application testée

Ce projet s’appuie sur l’application de démonstration publique **CURA Healthcare Service**, utilisée à des fins pédagogiques et d’illustration.

🔗 https://katalon-demo-cura.herokuapp.com/

Cette application permet de tester des scénarios réalistes de réservation de rendez-vous, incluant :

* authentification
* formulaires avec validation
* confirmations de parcours utilisateur

---

## 🧠 Principes clés de la stratégie QA

### 1️⃣ Séparation des responsabilités

* Les **Page Objects** centralisent :
  * les sélecteurs
  * les actions utilisateur
  * la logique technique commune
* Les **tests** portent exclusivement :
  * l’intention métier
  * les assertions
  * le niveau de réalisme attendu

Aucune assertion n’est utilisée dans les Page Objects.

---

### 2️⃣ Niveaux de tests complémentaires

#### 🟢 Tests E2E utilisateur réel (`@e2e @user`)

Objectif :

* vérifier que les **parcours utilisateurs critiques fonctionnent réellement**
* détecter toute régression UX bloquante

Caractéristiques :

* interactions proches du comportement réel
* peu nombreux
* plus sensibles aux changements UI
* rôle de **tests sentinelles**

---

#### 🔵 Tests de régression technique (`@regression @tech`)

Objectif :

* sécuriser la **logique fonctionnelle**
* accélérer la détection de régressions

Caractéristiques :

* interactions techniques contrôlées
* plus rapides et plus stables
* adaptés à une exécution fréquente en CI

Ces tests ne remplacent pas les tests utilisateur, ils les complètent.

---

#### 🟠 Tests exploratoires (`@exploratory`)

Objectif :

* explorer le comportement du système
* détecter des effets de bord ou incohérences

Caractéristiques :

* périmètre volontairement ciblé
* assertions limitées
* rôle de **canaris** plutôt que de couverture exhaustive

---

### 3️⃣ Distinction volontaire des modes de soumission

La stratégie distingue volontairement :

* la soumission **utilisateur réelle** (respect de la validation UI)
* la soumission **technique** (contournement contrôlé de l’UI)

Cette approche permet :

* de ne pas masquer des régressions UX
* tout en conservant une suite de tests fiable et rapide

Certaines implémentations tiennent compte de **spécificités du site CURA** afin d’éviter des faux positifs ou des tests artificiellement stables.

---

## 📁 Organisation du projet

pages/ → Page Objects (logique métier et interactions UI)
tests/
├─ e2e/ → Tests utilisateur réels (parcours critiques)
├─ regression/ → Tests de non-régression fonctionnelle
├─ exploratory/ → Tests exploratoires / canaris
├─ fixtures/ → Fixtures Playwright (contexte de test, authentification)
└─ helpers/ → Données et helpers spécifiques aux tests

Cette organisation privilégie l’intention de test et la séparation des responsabilités
plutôt que la technologie ou le framework.

---

## 🏷️ Tags utilisés

| Tag            | Description                |
|----------------|----------------------------|
| `@user`        | Tests orientés utilisateur |
| `@e2e`         | Parcours critiques         |
| `@regression`  | Non-régression rapide      |
| `@tech`        | Tests techniques           |
| `@exploratory` | Tests exploratoires        |

---

## 🔄 Intégration continue (CI)

Le projet est intégré à **GitHub Actions** avec une stratégie volontairement simple et lisible :

* **Pull Request** : exécution des tests de régression rapide
* **Branche principale (`main`)** : exécution de la suite complète

Cette approche permet de concilier :

* rapidité de feedback
* couverture fonctionnelle
* simplicité de maintenance

---

## ▶️ Lancer les tests localement

```bash
# Tests utilisateur
npx playwright test --grep @user

# Tests de régression
npx playwright test --grep @regression

# Suite complète
npx playwright test
