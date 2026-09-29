const fs = require("fs");
const path = require("path");

const { hubs, details } = require("./data/services");
const { team } = require("./data/site");
const pages = require("./pages");

const OUT = path.join(__dirname, "..", "site");

function write(relPath, html) {
  const full = path.join(OUT, relPath, "index.html");
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, "utf8");
  console.log("wrote", relPath || "/");
}

// Home
write("", pages.homePage());

// About
write("about", pages.aboutPage());

// Dentistry hub
write("dentistry", pages.hubPage(hubs.dentistry, [{ label: "Home", href: "/" }, { label: "Dentistry" }]));

// Dentistry category hubs
["general-preventative", "restorative", "cosmetic", "orthodontic"].forEach((key) => {
  const hub = hubs[key];
  write(
    `dentistry/${key}`,
    pages.hubPage(hub, [{ label: "Home", href: "/" }, { label: "Dentistry", href: "/dentistry/" }, { label: hub.title }])
  );
});

// Aesthetics hub
write("aesthetics", pages.hubPage(hubs.aesthetics, [{ label: "Home", href: "/" }, { label: "Aesthetics" }]));

// Detail pages
const hubBase = {
  "general-preventative": "/dentistry/general-preventative/",
  restorative: "/dentistry/restorative/",
  cosmetic: "/dentistry/cosmetic/",
  orthodontic: "/dentistry/orthodontic/",
  aesthetics: "/aesthetics/",
};
const hubLabel = {
  "general-preventative": "General & Preventative",
  restorative: "Restorative Dentistry",
  cosmetic: "Cosmetic Dentistry",
  orthodontic: "Orthodontic Dentistry",
  aesthetics: "Aesthetics",
};

Object.entries(details).forEach(([slug, d]) => {
  const base = hubBase[d.hub];
  const urlPath = base + slug + "/";
  const breadcrumbs = [{ label: "Home", href: "/" }];
  if (d.hub === "aesthetics") {
    breadcrumbs.push({ label: "Aesthetics", href: "/aesthetics/" });
  } else {
    breadcrumbs.push({ label: "Dentistry", href: "/dentistry/" });
    breadcrumbs.push({ label: hubLabel[d.hub], href: base });
  }
  breadcrumbs.push({ label: d.title });
  write(urlPath.slice(1, -1), pages.detailPage(slug, d, urlPath, breadcrumbs));
});

// Fees + Membership
write("fees", pages.feesPage());
write("fees/membership-plan", pages.membershipPage());

// Referrals + Contact
write("referrals", pages.referralsPage());
write("contact", pages.contactPage());

// Team
team.forEach((p) => write(`team/${p.slug}`, pages.teamPage(p)));

console.log(`\nDone. ${1 + 1 + 1 + 4 + 1 + Object.keys(details).length + 2 + 2 + team.length} pages generated.`);
