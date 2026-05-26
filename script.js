const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const visual = document.querySelector(".hero-visual");
const cards = document.querySelectorAll(".float-card");

visual?.addEventListener("pointermove", (event) => {
  const rect = visual.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  cards.forEach((card, index) => {
    const depth = (index + 1) * 8;
    card.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});

visual?.addEventListener("pointerleave", () => {
  cards.forEach((card) => {
    card.style.transform = "";
  });
});
