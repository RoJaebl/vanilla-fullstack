const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments ul");
const removers = videoComments.querySelectorAll("ul li >:nth-child(3)");

const videoId = videoContainer.dataset.id;

const handleRemoveComment = async (e) => {
  const comment = e.target.parentElement;
  const {
    dataset: { id },
  } = comment;
  const res = await fetch(`/api/videos/${videoId}/comment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (res.status === 201) {
    comment.remove();
  }
};

const addComment = (text, { newCommentId }) => {
  const newComment = document.createElement("li");
  newComment.dataset.id = newCommentId;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const remover = document.createElement("i");
  remover.className = "fas fa-x";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(remover);
  videoComments.prepend(newComment);
  remover.addEventListener("click", handleRemoveComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  if (!text) {
    return;
  }
  const res = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  const { id: newCommentId } = await res.json();
  if (res.status === 201) {
    addComment(text, { newCommentId });
  }
  textarea.value = "";
};
if (form) {
  form.addEventListener("submit", handleSubmit);
}

removers.forEach((remover) =>
  remover.addEventListener("click", handleRemoveComment)
);
