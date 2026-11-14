
const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");

menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});

nav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

const prices = {
  "TV & wall mounting": "From £65",
  "Flat-pack assembly": "From £35",
  "Curtain pole installation": "From £25",
  "Roller blind installation": "From £25",
  "Other blinds & fittings": "Quote after details",
  "Painting & decorating": "Free quote",
  "General repairs": "Free quote",
  "Multiple jobs / bundle": "Bundle price",
  "Other small jobs": "Free quote"
};

const job = document.getElementById("job");
const display = document.getElementById("price-display");
const note = document.getElementById("price-note");

function updatePrice() {
  const p = prices[job.value];
  display.textContent = p || "Choose a job";
  note.textContent = p && p.startsWith("From")
    ? "Draft guide price — exact fixed price confirmed before accepting."
    : "We'll review the details and confirm a price before booking.";
}

job?.addEventListener("change", updatePrice);

document.querySelectorAll("[data-job]").forEach(a => {
  a.addEventListener("click", () => {
    const val = a.dataset.job;
    const option = [...job.options].find(o => o.text === val);
    if (option) {
      job.value = val;
      updatePrice();
    }
  });
});

const date = document.getElementById("date");

if (date) {
  const today = new Date();
  date.min = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);
}

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("booking-form").addEventListener("submit", e => {
  e.preventDefault();

  const d = new FormData(e.currentTarget);

  const msg = `Hi Fox Fix & Finish, I'd like to request a booking.

Name: ${d.get("name")}
Job: ${d.get("job")}
Item / size: ${d.get("size")}
Preferred date: ${d.get("date")}
Area / postcode: ${d.get("area")}
Details: ${d.get("details") || "Not provided"}
Guide price shown: ${prices[d.get("job")] || "To be confirmed"}

Please confirm availability and the final fixed price.`;

  window.open(
    "https://wa.me/447301630675?text=" + encodeURIComponent(msg),
    "_blank"
  );
});

document.getElementById("quote-form").addEventListener("submit", e => {
  e.preventDefault();

  const d = new FormData(e.currentTarget);

  const msg = `Hi Fox Fix & Finish, I'd like a free quote.
Name: ${d.get("name")}
Job details: ${d.get("details")}
Area: ${d.get("area") || "Not provided"}`;

  window.open(
    "https://wa.me/447301630675?text=" + encodeURIComponent(msg),
    "_blank"
  );
});
