import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "../firebase-config.js"; 

export async function ajouterBudgetDansFirestore(data) {
  const docRef = await addDoc(collection(db, "budgets"), data); // donnée le nom de la collection plus c'est info
  console.log("Données ajoutées avec ID :", docRef.id);
}


export async function getBudgetsFromFirestore() {
  try {
    // Créer une référence à la collection "budgets"
    const budgetsRef = collection(db, "budgets");
    // Créer une requête ordonnée par date (optionnel)
    const q = query(budgetsRef, orderBy("createdAt", "desc"));
    // Exécuter la requête
    const querySnapshot = await getDocs(q);
    // Tableau pour stocker les résultats
    const budgets = [];
    // Parcourir les résultats
    querySnapshot.forEach((doc) => {
      // Pour chaque document, ajouter son ID et ses données au tableau
      budgets.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log("Données récupérées:", budgets);
    return budgets;
  } catch (error) {
    console.error("Erreur lors de la récupération des budgets:", error);
    throw error;
  }
}