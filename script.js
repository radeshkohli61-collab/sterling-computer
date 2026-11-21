
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_11_uDyl-R7wUXcb8oLNuh-VxDfOL66KtQYEj2WBaeHiBWzZgVv6nOqWPdBB0jA73/exec";

// 1. Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// 2. Auto-select course when clicking "Book Free Demo Class" or "Enroll in ..."
const courseTriggers = document.querySelectorAll("[data-course]");
const courseSelect = document.getElementById("courseSelect");

courseTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const selectedCourse = trigger.getAttribute("data-course");
    if (selectedCourse) {
      courseSelect.value = selectedCourse;
    }
  });
});

// 3. Submit Form Data to Google Sheets
const registerForm = document.getElementById("registerForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById("studentName").value.trim(),
    phone: document.getElementById("studentPhone").value.trim(),
    course: courseSelect.value
  };

  // Disable button while sending
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  formMessage.textContent = "";
  formMessage.className = "form-message";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    formMessage.classList.add("success");
    formMessage.textContent = `✅ Thank you, ${payload.name}! Your registration for "${payload.course}" is saved. We will contact you soon.`;
    registerForm.reset();
  } catch (error) {
    formMessage.classList.add("error");
    formMessage.textContent = "❌ Something went wrong. Please try again or call +91 98765 43210.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Registration";
  }
});