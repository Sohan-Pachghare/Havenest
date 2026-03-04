// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// Prevent dropdown from closing when clicking inside
document.querySelector('.dropdown-menu').addEventListener('click', function(e) {
  e.stopPropagation();
});

// AI-powered description generator for new listing form
const generateDescBtn = document.getElementById("generate-desc-btn");

if (generateDescBtn) {
  generateDescBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const originalText = generateDescBtn.textContent;
    generateDescBtn.disabled = true;
    generateDescBtn.textContent = "✨ Generating...";

    try {
      const titleInput = document.querySelector('input[name="listing[title]"]');
      const locationInput = document.querySelector('input[name="listing[location]"]');
      const descriptionTextarea = document.querySelector('textarea[name="listing[description]"]');
      const categoryCheckboxes = document.querySelectorAll('input[name="listing[categories][]"]:checked');

      const title = titleInput ? titleInput.value.trim() : "";
      const location = locationInput ? locationInput.value.trim() : "";
      const categories = Array.from(categoryCheckboxes).map((cb) => cb.value);

      const response = await fetch("/listings/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ title, location, categories }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data && data.error ? data.error : "Failed to generate description.";
        alert(message);
      } else if (descriptionTextarea && data && typeof data.description === "string") {
        descriptionTextarea.value = data.description;
      }
    } catch (err) {
      console.error("Error while generating description:", err);
      alert("Something went wrong while generating the description. Please try again.");
    } finally {
      generateDescBtn.disabled = false;
      generateDescBtn.textContent = originalText;
    }
  });
}
