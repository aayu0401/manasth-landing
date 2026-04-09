const siteHeader = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");

const syncHeaderState = () => {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const setupForm = (formId, feedbackId, successMessage) => {
  const form = document.getElementById(formId);
  const feedback = document.getElementById(feedbackId);
  
  if (form && feedback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      button.disabled = true;
      button.textContent = "Sending...";
      feedback.textContent = "";
      
      setTimeout(() => {
        button.textContent = "Done!";
        feedback.textContent = successMessage;
        form.reset();
        
        setTimeout(() => {
          button.disabled = false;
          button.textContent = originalText;
        }, 4000);
      }, 900);
    });
  }
};

setupForm("waitlist-form", "waitlist-feedback", "Thanks! You're on the waitlist.");
setupForm("contact-form", "contact-feedback", "Message sent successfully! We'll be in touch.");
