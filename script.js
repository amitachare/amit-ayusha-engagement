(() => {
  const cfg = window.INVITATION || {};
  const $ = (id) => document.getElementById(id);
  const one = cfg.personOne || "Amit";
  const two = cfg.personTwo || "Ayusha";
  const couple = `${one} & ${two}`;
  $("personOne").textContent = one;
  $("personTwo").textContent = two;
  $("signatureNames").textContent = couple;
  $("eventDate").textContent = cfg.dateDisplay || "Date to be announced";
  $("eventDateShort").textContent = cfg.eventDateISO
    ? new Date(`${cfg.eventDateISO}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()
    : "DATE TO BE ANNOUNCED";
  $("eventTime").textContent = cfg.eventTimeDisplay || "Time to be announced";
  $("venueName").textContent = cfg.venueName || "Venue to be announced";
  $("venueAddress").textContent = cfg.venueAddress || "Venue address will be shared soon.";
  $("familyMessage").textContent = cfg.familyMessage || "Together with our families, we look forward to celebrating with you.";

  const toast = (message) => {
    const el = $("toast"); el.textContent = message; el.classList.add("show");
    window.clearTimeout(toast.timer); toast.timer = window.setTimeout(() => el.classList.remove("show"), 2800);
  };
  $("openInvite").addEventListener("click", () => {
    $("details").scrollIntoView({ behavior: "smooth" });
  });

  const target = cfg.eventDateISO ? new Date(`${cfg.eventDateISO}T${cfg.eventTime24 || "18:00"}:00`) : null;
  function updateCountdown() {
    if (!target || Number.isNaN(target.getTime())) {
      ["days", "hours", "minutes", "seconds"].forEach(id => $(id).textContent = "—");
      $("countdown").setAttribute("aria-label", "Countdown will appear after the event date is added in config.js");
      return;
    }
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      ["days", "hours", "minutes", "seconds"].forEach(id => $(id).textContent = "0");
      return;
    }
    const units = { days: 86400000, hours: 3600000, minutes: 60000, seconds: 1000 };
    let remaining = diff;
    Object.entries(units).forEach(([id, size]) => {
      $(id).textContent = String(Math.floor(remaining / size)).padStart(2, "0");
      remaining %= size;
    });
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  $("mapButton").addEventListener("click", (event) => {
    if (!cfg.mapQuery) {
      event.preventDefault();
      toast("Add the venue name or address in config.js to enable directions.");
    }
  });
  if (cfg.mapQuery) $("mapButton").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.mapQuery)}`;
  else $("mapButton").href = "#";

  $("calendarButton").addEventListener("click", () => {
    if (!cfg.eventDateISO) { toast("Add the engagement date in config.js to enable calendar saving."); return; }
    const start = new Date(`${cfg.eventDateISO}T${cfg.eventTime24 || "18:00"}:00`);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const stamp = d => d.getFullYear().toString() + String(d.getMonth()+1).padStart(2,"0") + String(d.getDate()).padStart(2,"0") + "T" + String(d.getHours()).padStart(2,"0") + String(d.getMinutes()).padStart(2,"0") + "00";
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Amit and Ayusha//Engagement//EN",
      "BEGIN:VEVENT", `UID:${Date.now()}@amit-ayusha-invite`, `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`, `SUMMARY:${couple} - Engagement`,
      `LOCATION:${(cfg.venueName || "")}${cfg.venueAddress ? ", " + cfg.venueAddress : ""}`,
      "DESCRIPTION:We look forward to celebrating with you.", "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "amit-ayusha-engagement.ics"; a.click(); URL.revokeObjectURL(url);
    toast("Calendar invitation downloaded.");
  });

  $("shareButton").addEventListener("click", async () => {
    const text = `${couple} invite you to celebrate their engagement!\n${cfg.dateDisplay || "Date to be announced"}\n${cfg.eventTimeDisplay || ""}\n${cfg.venueName || "Venue to be announced"}\n${cfg.venueAddress || ""}\n\nWe look forward to celebrating with you!`;
    if (navigator.share) {
      try { await navigator.share({ title: `${couple} — Engagement Invitation`, text, url: location.href }); }
      catch (e) { if (e.name !== "AbortError") toast("Sharing was unavailable on this device."); }
    } else {
      const wa = `https://wa.me/?text=${encodeURIComponent(text + "\n" + location.href)}`;
      window.open(wa, "_blank", "noopener");
    }
  });

  const musicButton = $("musicToggle");
  let audio = null;
  musicButton.addEventListener("click", async () => {
    if (!cfg.musicUrl) { toast("To add music, put a direct audio URL in config.js."); return; }
    if (!audio) audio = new Audio(cfg.musicUrl);
    if (audio.paused) {
      try { await audio.play(); musicButton.setAttribute("aria-pressed", "true"); musicButton.innerHTML = "♫ <span>Pause</span>"; }
      catch { toast("Tap again to allow music playback."); }
    } else {
      audio.pause(); musicButton.setAttribute("aria-pressed", "false"); musicButton.innerHTML = "♫ <span>Music</span>";
    }
  });

  const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll(".reveal").forEach(el => observer ? observer.observe(el) : el.classList.add("visible"));
})();
