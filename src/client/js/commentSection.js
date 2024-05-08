const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (e) => {
  const textarea = form.querySelector("textarea");
  e.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text) {
    textarea.value = "";
    return fetch(`/api/videos/${videoId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  }
};
if (form) {
  form.addEventListener("submit", handleSubmit);
}
