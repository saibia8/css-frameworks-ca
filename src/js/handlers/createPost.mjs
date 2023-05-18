import { createPost } from "../api/posts/index.mjs";

export function setCreatePostListener() {
  const form = document.querySelector("#createPost");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.target;
      console.log(form);
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());
      console.log(post);

      //Send it to the API
      createPost(post);
    });
  }
}