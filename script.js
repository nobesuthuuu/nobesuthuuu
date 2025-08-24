document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("./site.config.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Config not found");
    const config = await response.json();

    applyConfig(config);
  } catch (err) {
    // If fetching config fails, keep the defaults in HTML.
    // No console noise for end-users on GitHub Pages.
  }
});

function applyConfig(config) {
  const name = config.fullName || "Your Name";
  const intro = config.intro || "This is a short introduction.";

  const nameEl = document.getElementById("full-name");
  const introEl = document.getElementById("intro");
  const avatarEl = document.getElementById("avatar");
  const resumeLinkEl = document.getElementById("resume-link");
  const paperLinkEl = document.getElementById("paper-link");
  const githubLinkEl = document.getElementById("github-link");
  const linkedinLinkEl = document.getElementById("linkedin-link");

  if (nameEl) nameEl.textContent = name;
  if (introEl) introEl.textContent = intro;

  if (config.avatarPath && avatarEl) {
    avatarEl.src = config.avatarPath;
  }

  if (config.resumePath && resumeLinkEl) {
    resumeLinkEl.href = config.resumePath;
  }

  if (config.paperPath && paperLinkEl) {
    paperLinkEl.href = config.paperPath;
  }

  if (config.githubUrl && githubLinkEl) {
    githubLinkEl.href = config.githubUrl;
  }

  if (config.linkedinUrl && linkedinLinkEl) {
    linkedinLinkEl.href = config.linkedinUrl;
  }

  if (config.accentColor) {
    document.documentElement.style.setProperty("--accent", config.accentColor);
  }

  document.title = `${name} — Portfolio`;
}