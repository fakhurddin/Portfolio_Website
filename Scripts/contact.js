document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Reusable function to show validation error with fade-out
  function showError(inputElem, errorId, message) {
    const errorElem = document.getElementById(errorId);
    errorElem.textContent = message;
    errorElem.classList.remove('hidden', 'fade-out');
    inputElem.classList.add('border-red-500');

    setTimeout(() => {
      errorElem.classList.add('fade-out');
      setTimeout(() => {
        errorElem.classList.add('hidden');
        errorElem.classList.remove('fade-out');
      }, 600);
      inputElem.classList.remove('border-red-500');
    }, 1000);
  }

  // "Send another message" brings the form back
  const again = document.getElementById('contactAgain');
  if (again) {
    again.addEventListener('click', function () {
      document.getElementById('contactSent').hidden = true;
      form.hidden = false;
      form.querySelector('#name')?.focus();
    });
  }

  // Handle form submission and validation
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    const submitBtn = form.querySelector('button[type="submit"]');
    let isValid = true;

    // Validate Name
    if (!name.value.trim()) {
      showError(name, 'nameError', 'Please fill in this field.');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'emailError', 'Please fill in this field.');
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      showError(email, 'emailError', 'Enter a valid email address.');
      isValid = false;
    }

    // Validate Message
    if (!message.value.trim()) {
      showError(message, 'messageError', 'Please enter a message.');
      isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <i class="ri-loader-4-line ri-lg mr-2 animate-spin"></i>
      Sending...
    `;
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

    try {
      // Prepare data and submit to Web3Forms
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });

      const result = await response.json();

      if (result.success) {
        submitBtn.innerHTML = `
          <i class="ri-check-line ri-lg mr-2"></i>
          Message Sent!
        `;
        form.reset();

        // Swap the form for the in-card confirmation
        const sent = document.getElementById('contactSent');
        if (sent) {
          form.hidden = true;
          sent.hidden = false;
        }

        // Smooth scroll to redirect section if available
        const redirect = form.querySelector('[name="redirect"]')?.value;
        if (redirect) {
          document.querySelector(redirect)?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      submitBtn.innerHTML = `
        <i class="ri-close-line ri-lg mr-2"></i>
        Failed to Send
      `;
    } finally {
      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }, 3000);
    }
  });
});
