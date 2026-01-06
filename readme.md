# 🧪 QA Automation Strategy — CURA Healthcare

## 🎯 Objectif du projet

Ce projet a pour but de démontrer une **stratégie de tests automatisés réaliste et maintenable** autour de la feature **“Prise de rendez-vous”** de l’application CURA Healthcare, en utilisant **Playwright**.

L’objectif n’est pas uniquement de faire “passer des tests”, mais de :

* représenter fidèlement les **risques utilisateur**
* garantir une **non-régression rapide et fiable**
* maintenir une suite **lisible, explicable et industrialisable**

---

## 🧠 Principes clés de la stratégie

### 1️⃣ Séparation claire des responsabilités

* Les **Page Objects** encapsulent :

  * les sélecteurs
  * les actions utilisateur
  * la synchronisation technique
* Les **tests** définissent :

  * l’intention métier
  * les assertions
  * le niveau de réalisme attendu

👉 Aucun `expect` n’est utilisé dans les Page Objects.

---

### 2️⃣ Deux niveaux de tests complémentaires

#### 🟢 Tests E2E utilisateur réel (`@e2e @user`)

Objectif :

* vérifier que **l’utilisateur final peut réellement utiliser la fonctionnalité**
* détecter toute régression UX critique

Caractéristiques :

* interactions réelles (clics, validations navigateur)
* peu nombreux
* plus lents et plus fragiles
* mais **irremplaçables**

Ces tests utilisent une **soumission avec validation utilisateur réelle**.

---

#### 🔵 Tests de régression technique (`@regression @tech`)

Objectif :

* garantir que la **logique métier fonctionne toujours**
* accélérer la détection de régressions

Caractéristiques :

* soumission technique (bypass de la validation UI)
* rapides et stables
* forte couverture fonctionnelle
* adaptés à la CI

Ces tests **ne remplacent pas** les tests utilisateur : ils les complètent.

---

### 3️⃣ Distinction volontaire entre soumission utilisateur et technique

La stratégie distingue volontairement :

* la **soumission utilisateur réelle** (clic + validation HTML/JS)
* la **soumission technique** (envoi direct du formulaire)

Cette séparation permet :

* d’éviter les faux positifs
* de ne pas masquer des régressions UX
* tout en conservant une suite rapide et fiable

---

### 4️⃣ Gestion des composants UI complexes

Certains composants (ex. datepicker) :

* affichent un format utilisateur
* mais attendent un format technique différent
* ou nécessitent des gestes utilisateur réels

La stratégie accepte que :

* les tests utilisateur soient plus exigeants
* les tests techniques contournent volontairement l’UI lorsque l’objectif est la logique métier

---

## 📁 Organisation du projet

```
pages/          → Page Objects (logique partagée)
tests/
 ├─ e2e/        → tests utilisateur réels (sentinelles UX)
 ├─ regression/ → non-régression rapide et stable
 └─ exploratory/→ tests exploratoires / canaris
```

Cette organisation privilégie **l’intention de test** plutôt que la technologie.

---

## 🏷️ Tags utilisés

| Tag            | Rôle                      |
| -------------- | ------------------------- |
| `@user`        | Tests centrés utilisateur |
| `@e2e`         | Scénarios critiques       |
| `@regression`  | Non-régression rapide     |
| `@tech`        | Tests techniques          |
| `@exploratory` | Couverture large          |

---

## ▶️ Lancer les tests

```bash
# Tests utilisateur critiques
npx playwright test --grep @user

# Régression rapide
npx playwright test --grep @regression

# Suite complète
npx playwright test
```

---

## 🧩 Philosophie générale

Cette suite de tests repose sur un principe simple :

> **Tous les tests ne doivent pas avoir le même niveau de réalisme.**
> La qualité vient de la combinaison intelligente de tests réalistes et de tests robustes.

Cette approche permet :

* une meilleure détection des risques réels
* une maintenance plus simple
* une meilleure lisibilité en équipe
* une intégration CI efficace

---

## 📌 Conclusion

Ce projet illustre une approche **pragmatique et professionnelle** de l’automatisation QA :

* orientée produit
* consciente des limites de l’UI automation
* adaptée aux contraintes réelles des équipes


