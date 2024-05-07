const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (e) => {
  const textarea = form.querySelector("textarea");
  e.preventDefault();
  const text = textarea.value;
  const video = videoContainer.dataset.id;
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
