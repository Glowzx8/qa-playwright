# 🧪 Stratégie d’automatisation QA — CURA Healthcare

## 🎯 Objectif du projet

Ce projet a pour objectif de démontrer une **stratégie réaliste et maintenable de tests automatisés** autour de la fonctionnalité **de prise de rendez-vous** de l’application CURA Healthcare, en utilisant **Playwright**.

L’objectif n’est pas uniquement de faire “passer des tests”, mais de :

* couvrir les **parcours utilisateurs critiques**
* sécuriser la **non-régression fonctionnelle**
* maintenir une suite de tests **lisible, expliquable et industrialisable**

---

## 🌐 Application testée

Ce projet s’appuie sur l’application de démonstration publique **CURA Healthcare Service**, utilisée à des fins pédagogiques et d’illustration.

🔗 [https://katalon-demo-cura.herokuapp.com/](https://katalon-demo-cura.herokuapp.com/)

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

Aucune assertion (`expect`) n’est utilisée dans les Page Objects.

---

### 2️⃣ Deux niveaux de tests complémentaires

#### 🟢 Tests E2E utilisateur réel (`@e2e @user`)

Objectif :

* vérifier que les **parcours utilisateurs critiques fonctionnent réellement**
* détecter toute régression UX bloquante

Caractéristiques :

* interactions proches du comportement réel (clics, validations navigateur)
* peu nombreux
* plus sensibles aux changements UI
* rôle de **tests sentinelles**

---

#### 🔵 Tests de régression technique (`@regression @tech`)

Objectif :

* sécuriser la **logique fonctionnelle**
* accélérer la détection de régressions

Caractéristiques :

* soumission technique du formulaire
* plus rapides et plus stables
* adaptés à une exécution fréquente en CI

Ces tests ne remplacent pas les tests utilisateur, ils les complètent.

---

### 3️⃣ Distinction volontaire des modes de soumission

La stratégie distingue volontairement :

* la soumission **utilisateur réelle** (respect de la validation UI)
* la soumission **technique** (contournement contrôlé de l’UI)

Cette approche permet :

* de ne pas masquer des régressions UX
* tout en conservant une suite de tests fiable et rapide

---

## 📁 Organisation du projet

```
pages/          → Page Objects (logique partagée)
tests/
 ├─ e2e/        → tests utilisateur réels
 ├─ regression/ → tests de non-régression
 └─ exploratory/→ tests exploratoires / canaris
```

Cette organisation privilégie l’intention de test plutôt que la technologie.

---

## 🏷️ Tags utilisés

| Tag            | Description                |
| -------------- | -------------------------- |
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
```

---

## 📌 Conclusion

Ce projet illustre une approche pragmatique de l’automatisation QA :

* orientée produit
* consciente des limites de l’automatisation UI
* adaptée à un contexte réel d’équipe

L’objectif est de démontrer une capacité à **raisonner stratégie de test**, et pas uniquement à écrire des scripts automatisés.

---
