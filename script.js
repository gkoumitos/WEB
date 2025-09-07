//AXRHSTO

//didaskon-diplomatikesmou.html
document.addEventListener("DOMContentLoaded", () => {
  const roleFilter = document.getElementById('roleFilter');
  const statusFilter = document.getElementById('statusFilter');
  const rows = document.querySelectorAll('#diplomatikesTable tbody tr');

  function applyFilters() {
    const role = roleFilter.value;
    const status = statusFilter.value;

    rows.forEach(row => {
      const rowRole = row.getAttribute('data-role');
      const rowStatus = row.getAttribute('data-status');

      const roleMatch = (role === 'all' || rowRole === role);
      const statusMatch = (status === 'all' || rowStatus === status);

      row.style.display = (roleMatch && statusMatch) ? '' : 'none';
    });
  }

  roleFilter.addEventListener('change', applyFilters);
  statusFilter.addEventListener('change', applyFilters);
});

//didaskon-proskliseis.html
document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll('.clickable-row');
  const actionBox = document.getElementById('actionBox');
  const studentName = document.getElementById('studentName');
  const topicTitle = document.getElementById('topicTitle');
  const invitationDate = document.getElementById('invitationDate');
  let selectedRow = null;

  rows.forEach(row => {
    row.addEventListener('click', () => {
      selectedRow = row;
      studentName.textContent = row.dataset.student;
      topicTitle.textContent = row.dataset.title;
      invitationDate.textContent = row.dataset.date;
      actionBox.classList.remove('d-none');
      actionBox.scrollIntoView({ behavior: "smooth" });
    });
  });

  window.handleAction = function(action) {
    if (!selectedRow) return;
    const name = selectedRow.dataset.student;

    if (action === 'accepted') {
      alert(`Αποδεχθήκατε την πρόσκληση για τη διπλωματική της ${name}.`);
    } else {
      alert(`Απορρίψατε την πρόσκληση για τη διπλωματική της ${name}.`);
    }

    selectedRow.remove();
    actionBox.classList.add('d-none');
    selectedRow = null;
  }
});

//didaskon-diaxeirish.html
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("statusSelect");
  if (select) {
    const sections = {
      "ypo-anathesi": document.getElementById("section-ypo-anathesi"),
      "energi": document.getElementById("section-energi"),
      "ypo-exetasi": document.getElementById("section-ypo-exetasi"),
      "peratomeni": document.getElementById("section-peratomeni")
    };

    select.addEventListener("change", () => {
      Object.values(sections).forEach(sec => sec.classList.add("d-none"));
      const selected = select.value;
      if (sections[selected]) {
        sections[selected].classList.remove("d-none");
      }
    });
  }
});

//grammateia-diplomatikes.html (axrhsto giati exei mpei mesa sto grammateia-dashboard.js) - ΣΤΑΤΙΚΑ ΔΕΔΟΜΕΝΑ ΔΙΠΛΩΜΑΤΙΚΩΝ
const diplomatikes = [
  {
    id: 1,
    title: "Ανάπτυξη Πλατφόρμας για Διπλωματικές",
    description: "Μια web εφαρμογή που υποστηρίζει τη διαδικασία ανάθεσης και αξιολόγησης διπλωματικών.",
    status: "Ενεργή",
    student: "Μαρία Παπαδοπούλου",
    committee: ["Δρ. Α. Παπαδόπουλος", "Δρ. Κ. Ζήσης", "Δρ. Λ. Γεωργίου"],
    assignedDate: "2025-01-12"
  },
  {
    id: 2,
    title: "Σύστημα Αξιολόγησης Φοιτητών με AI",
    description: "Μηχανική μάθηση για προσαρμοστική αξιολόγηση φοιτητών με βάση ιστορικά δεδομένα.",
    status: "Υπό Εξέταση",
    student: "Νίκος Κωνσταντίνου",
    committee: ["Δρ. Σ. Δημητρίου", "Δρ. Ε. Ράπτης", "Δρ. Θ. Μαυρίδης"],
    assignedDate: "2024-11-20"
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

const listElement = document.getElementById("diplomatikesList");
const detailSection = document.getElementById("detailsSection");
const filterSelect = document.getElementById("statusFilter");

function renderList(status = "all") {
  listElement.innerHTML = ""; // καθάρισμα

  // Φιλτράρισμα
  const filtered = status === "all"
    ? diplomatikes
    : diplomatikes.filter(d => d.status === status);

  // Αν δεν υπάρχει καμία
  if (filtered.length === 0) {
    listElement.innerHTML = `<li class="list-group-item text-muted">Καμία διπλωματική.</li>`;
    detailSection.innerHTML = `<p>Δεν υπάρχουν διαθέσιμες εγγραφές για αυτή την κατάσταση.</p>`;
    return;
  }

  // Δημιουργία λίστας
  filtered.forEach(dipl => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = `${dipl.title} (${dipl.status})`;
    li.addEventListener("click", () => showDetails(dipl));
    listElement.appendChild(li);
  });

  // Αν έχει τουλάχιστον μία, δείξε την πρώτη by default
  showDetails(filtered[0]);
}

function showDetails(dipl) {
  const daysSinceAssigned = Math.floor(
    (new Date() - new Date(dipl.assignedDate)) / (1000 * 60 * 60 * 24)
  );

  detailSection.innerHTML = `
    <h5>${dipl.title}</h5>
    <p><strong>Κατάσταση:</strong> ${dipl.status}</p>
    <p><strong>Περιγραφή:</strong> ${dipl.description}</p>
    <p><strong>Φοιτητής:</strong> ${dipl.student}</p>
    <p><strong>Τριμελής Επιτροπή:</strong> ${dipl.committee.join(", ")}</p>
    <p><strong>Ημέρες από ανάθεση:</strong> ${daysSinceAssigned}</p>
  `;
}

// Συνάρτηση όταν αλλάζει το dropdown
filterSelect.addEventListener("change", () => {
  renderList(filterSelect.value);
});

// Αρχική εμφάνιση
renderList();
