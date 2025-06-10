const form = document.querySelector("form");
const allInput = document.querySelectorAll("input, select");
// const ctx = document.getElementById("myPieChart").getContext("2d");
const btnAll = document.querySelectorAll("input[type='button']");
const ChoixDepenseOrRevenu = document.getElementById("ChoixDepenseOrRevenu");
let contenuListe = document.querySelector("ul");
let revenuDom = document.querySelector(".Revenu p");
let depenseDom = document.querySelector(".Depense p");

let resultBtn = "";
let isAlreadyCreated = false;
const valueRevenu = ["Investissement", "Caf", "APL", "Salaire"];
const valueDepense = ["Choisissez une option", "E", "A", "C"];

const DataSendBudget = [];


function GetChangeSelectRevenuOrDepense(dataAllForm) {
  dataAllForm.forEach((ele) => {
    ele.addEventListener("click", function () {
      // Récupérer le conteneur
      const container = document.querySelector(".DataFormSelect");
      
      // 1. Vider complètement le conteneur
      container.innerHTML = "";
      
      // 2. Créer le label et l'ajouter en premier
      const label = document.createElement("label");
      label.innerHTML = "Catégorie: ";
      label.setAttribute("for", "ChoixDepenseOrRevenu"); // Pour l'accessibilité
      container.appendChild(label);
      
      // 3. Créer le select et l'ajouter après le label
      const select = document.createElement("select");
      select.id = "ChoixDepenseOrRevenu";
      select.name = "choix";
      select.required = true;
      container.appendChild(select);
      
      // Rendre visible le conteneur
      container.style.display = "block";
      
      // 4. Ajouter l'option par défaut
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.innerText = "Choisissez une option";
      select.appendChild(defaultOption);
      
      // 5. Ajouter les options selon le type
      if (this.value === "revenu") {
        isAlreadyCreated = true;
        resultBtn = this.value;
        
        // Ajouter les options de revenu
        valueRevenu.forEach(value => {
          const option = document.createElement("option");
          option.value = value;
          option.innerText = value;
          select.appendChild(option);
        });
      } else if (this.value === "depense") {
        resultBtn = this.value;
        
        // Ajouter les options de dépense
        valueDepense.forEach(value => {
          const option = document.createElement("option");
          option.value = value;
          option.innerText = value;
          select.appendChild(option);
        });
      }
    });
  });
}

function GestionDesDonnéeApresEnvoieForm() {
  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = "type";
  hiddenInput.value = resultBtn; // La valeur stockée du bouton cliqué
  form.appendChild(hiddenInput);

  // Maintenant collecte les données avec le champ ajouté
  const formData = new FormData(form);
  const formDataValues = Object.fromEntries(formData);

  console.log(formDataValues); // Inclura maintenant 'type' avec la valeur du bouton
  DataSendBudget.push(formDataValues);
  dataTableauTraitement(DataSendBudget);

  // Retire le champ caché après utilisation
  form.removeChild(hiddenInput);
  form.reset();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  GestionDesDonnéeApresEnvoieForm();
});

function dataTableauTraitement(data) {
  const listElement = document.getElementById("listOpt");
  listElement.innerHTML = "";
  let valuePrecedentRevenu = 0;
  let valuePrecedentDepense = 0;

  data.forEach((item) => {
    // Crée un nouvel élément li
    const li = document.createElement("li");

    if (item.type === "revenu") {
      valuePrecedentRevenu += parseFloat(item.montant);
      revenuDom.innerHTML = "+" + valuePrecedentRevenu.toFixed(2) + "€";
    } else {
      valuePrecedentDepense += parseFloat(item.montant);
      depenseDom.innerHTML = valuePrecedentDepense.toFixed(2) + "€";
      //le mettre dans depense et non dans revenu car c'est le solde total
    }

    const typeText =
      item.type === "revenu"
        ? `<span style="color: green;">+${parseFloat(item.montant).toFixed(2)}€</span>`
        : `<span style="color: red;">-${parseFloat(item.montant).toFixed(2)}€</span>`;

    // Crée le contenu HTML de l'élément li
    li.innerHTML = `
      <div class="transaction">
        <div class="transaction-info">
          <p><strong>${item.description || "Sans description"}</strong></p>
          <p>${item.choix || ""}</p>
          <small>${item.date || "Date non spécifiée"}</small>
        </div>
        <div class="transaction-amount">
          ${typeText}
        </div>
      </div>
    `;

    // Ajoute des styles à l'élément li
    li.style.padding = "10px";
    li.style.borderBottom = "1px solid #eee";
    li.style.marginBottom = "8px";

    // Ajoute l'élément li à la liste
    listElement.appendChild(li);
  });

  //l'ordre en programmation ultra important traitement du formulaire pour transmettre les depenses et revenu afin de les soustraires
  const solde = valuePrecedentRevenu - valuePrecedentDepense;
  document.querySelector(".SoldeTotal p").innerHTML = solde.toFixed(2) + "€";
  console.log(solde);
}

GetChangeSelectRevenuOrDepense(btnAll);
