# 💸 Expense Tracker - Suivi de Dépenses Perso

Une petite application web pour gérer tes dépenses facilement. Ajoute des transactions, vois où va ton argent, et affiche des graphiques simples pour mieux comprendre tes habitudes.

---

## ✨ Fonctions principales

- Ajouter une dépense (montant, catégorie, date, note)
- Afficher une liste des dépenses
- Afficher le total par mois ou par catégorie
- Graphiques (pie chart, bar chart)
- Sauvegarde automatique dans `localStorage`

---

## 🛠️ Technologies utilisées

- HTML5 / CSS3
- JavaScript (Vanilla JS)
- Chart.js (pour les graphiques)
- `localStorage` (pour la persistance des données)

---

## 📁 Structure du projet

Lancer tailwind css : npx @tailwindcss/cli -i ./src/style.css -o ./src/output.css --watch


1.	Parcours tous les éléments de ta liste de transactions (data).
2.	Prépare deux variables distinctes pour cumuler séparément :
	•	les montants des revenus
	•	les montants des dépenses
3.	Dans la boucle :
	•	Si c’est un revenu, ajoute à la variable des revenus.
	•	Si c’est une dépense, ajoute à la variable des dépenses.
4.	Une fois que tu as les deux totaux, fais la différence entre les deux.
5.	Affecte cette valeur à innerHTML de ta balise dans .SoldeTotal p.

⸻

✅ Ce que tu vérifies :
	•	Que tu initialises bien les deux totaux à zéro.
	•	Que tu fais la différence après avoir fini la boucle.
	•	Que tu gères bien les types numériques (éviter les strings).
	•	Que le format final affiché est propre (ex. : 2 décimales si tu veux un style monétaire).