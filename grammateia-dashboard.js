// ΕΝΟΤΗΤΑ 1 – Αλλαγή Ενότητας (Sidebar)
function showSection(id) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.classList.add('d-none'));

  document.getElementById('default-message').classList.add('d-none');
  document.getElementById(id).classList.remove('d-none');
}

// ΕΝΟΤΗΤΑ 2 – Προβολή Διπλωματικών
const diplomatikes = [
  {
    id: 1,
    title: "Ανάπτυξη Web Πλατφόρμας",
    description: "Σύστημα ανάθεσης & παρακολούθησης διπλωματικών.",
    status: "Ενεργή",
    student: "Μ. Παπαδοπούλου",
    committee: ["Δρ. Α", "Δρ. Β", "Δρ. Γ"],
    assignedDate: "2025-01-10"
  },
  {
    id: 2,
    title: "Σύστημα Αξιολόγησης με AI",
    description: "Αυτόματη αξιολόγηση φοιτητών με ιστορικά δεδομένα.",
    status: "Υπό Εξέταση",
    student: "Ν. Κωνσταντίνου",
    committee: ["Δρ. Δ", "Δρ. Ε", "Δρ. Ζ"],
    assignedDate: "2024-11-12"
  },
    {
    id: 3,
    title: "Οπτικοποίηση Στατιστικών Δεδομένων",
    description: "Δημιουργία dashboard με χρήση Chart.js για διπλωματικές εργασίες.",
    status: "Ενεργή",
    student: "Γιώργος Βασιλείου",
    committee: ["Δρ. Μ. Πέτρου", "Δρ. Ν. Αντωνίου", "Δρ. Χ. Σπυρόπουλος"],
    assignedDate: "2025-03-10"
  }
];

const statusFilter = document.getElementById("statusFilter");
const listElement = document.getElementById("diplomatikesList");
const detailSection = document.getElementById("detailsSection");

function renderList(status = "all") {
  if (!listElement || !detailSection) return;
  listElement.innerHTML = "";

  const filtered = status === "all"
    ? diplomatikes
    : diplomatikes.filter(d => d.status === status);

  if (filtered.length === 0) {
    listElement.innerHTML = `<li class="list-group-item text-muted">Καμία διπλωματική.</li>`;
    detailSection.innerHTML = `<p>Δεν υπάρχουν εγγραφές.</p>`;
    return;
  }

  filtered.forEach(dipl => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = `${dipl.title} (${dipl.status})`;
    li.addEventListener("click", () => showDetails(dipl));
    listElement.appendChild(li);
  });

  showDetails(filtered[0]);
}

function showDetails(dipl) {
  const days = Math.floor((new Date() - new Date(dipl.assignedDate)) / (1000 * 60 * 60 * 24));
  detailSection.innerHTML = `
    <h5>${dipl.title}</h5>
    <p><strong>Κατάσταση:</strong> ${dipl.status}</p>
    <p><strong>Περιγραφή:</strong> ${dipl.description}</p>
    <p><strong>Φοιτητής:</strong> ${dipl.student}</p>
    <p><strong>Τριμελής:</strong> ${dipl.committee.join(", ")}</p>
    <p><strong>Ημέρες από ανάθεση:</strong> ${days}</p>
  `;
}

if (statusFilter) {
  statusFilter.addEventListener("change", () => {
    renderList(statusFilter.value);
  });
  renderList();
}

// ΕΝΟΤΗΤΑ 3 – Εισαγωγή JSON
const jsonInput = document.getElementById("jsonInput");
const previewSection = document.getElementById("previewSection");
const previewBox = document.getElementById("jsonPreview");

if (jsonInput) {
  jsonInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const json = JSON.parse(e.target.result);
        previewBox.textContent = JSON.stringify(json, null, 2);
        previewSection.classList.remove("d-none");
      } catch {
        previewBox.textContent = "❌ Μη έγκυρο JSON.";
        previewSection.classList.remove("d-none");
      }
    };
    reader.readAsText(file);
  });
}

// ΕΝΟΤΗΤΑ 4 – Διαχείριση Καταστάσεων
const diplomas = diplomatikes; // ίδια mock δεδομένα
const diplomaList = document.getElementById("diplomaList");
const diplomaDetails = document.getElementById("diplomaDetails");

function renderDiacheirisi() {
  if (!diplomaList || !diplomaDetails) return;

  diplomaList.innerHTML = "";
  diplomas.forEach(dipl => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = `${dipl.title} (${dipl.status})`;
    li.addEventListener("click", () => showDiacheirisiDetails(dipl));
    diplomaList.appendChild(li);
  });
}

function showDiacheirisiDetails(dipl) {
  if (dipl.status === "Ενεργή") {
    diplomaDetails.innerHTML = `
      <h5>${dipl.title}</h5>
      <p><strong>Φοιτητής:</strong> ${dipl.student}</p>
      <p><strong>Κατάσταση:</strong> ${dipl.status}</p>

      <div class="mb-3">
        <label class="form-label">Αρ. Πρακτικού Ανάθεσης (ΓΣ):</label>
        <input class="form-control" placeholder="π.χ. 123/2025">
        <button class="btn btn-primary mt-2">Καταχώρηση Πρακτικού</button>
      </div>

      <hr>

     <!-- Ακύρωση Ανάθεσης -->
     <h6 class="mb-3 text-danger">🛑 Ακύρωση Ανάθεσης Θέματος</h6>
      <div class="mb-3">
        <label class="form-label">Αρ. Πρακτικού Ακύρωσης (ΓΣ):</label>
        <input class="form-control" placeholder="π.χ. 456/2025">
      </div>
      <div class="mb-3">
        <label class="form-label">Αιτιολογία:</label>
        <textarea class="form-control" rows="2" placeholder="π.χ. Κατόπιν αίτησης φοιτητή"></textarea>
      </div>
      <button class="btn btn-danger">Ακύρωση Ανάθεσης</button>
    `;
  } else if (dipl.status === "Υπό Εξέταση") {
    diplomaDetails.innerHTML = `
      <h5>${dipl.title}</h5>
      <p><strong>Φοιτητής:</strong> ${dipl.student}</p>
      <p><strong>Κατάσταση:</strong> ${dipl.status}</p>

      <p>✔️ Όλοι οι βαθμοί έχουν καταχωρηθεί.</p>
      <p>📎 Σύνδεσμος Νημερτής: <a href="#">link</a></p>
      <button class="btn btn-success">Ολοκλήρωση - Περατωμένη</button>
    `;
  }
}

renderDiacheirisi();
