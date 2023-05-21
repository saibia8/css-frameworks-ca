import * as postMethods from "../../posts/index.mjs";
import { renderPostTemplates } from "../../../templates/index.mjs";
import * as listeners from "../../../handlers/index.mjs";
import { isLoggedIn, getName } from "../../../helpers/storage.mjs";
import { load } from "../../../storage/index.mjs";

export default function buildPosts(pathname) {
  const menuLi = document.querySelector("#forlogout");
  const btnLogout = document.createElement("button");
  if (isLoggedIn()) {
    const name = getName();

    btnLogout.classList.add("btn", "btn-secondary", "ms-2", "ms-0", "ms-md-3");
    btnLogout.id = "logout";
    btnLogout.innerText = `Log out ${name}`;
    menuLi.appendChild(btnLogout);

    listeners.setLogoutListener();

    async function postTemplates() {
      const posts = await postMethods.getPosts();
      const container = document.querySelector("#allPosts");
      renderPostTemplates(posts, container);
    }

    async function postTemplatesUser() {
      const profile = await load("profile");

      const aboutUserContainer = document.querySelector("#aboutUser");
      const userImgContainer = document.createElement("div");
      userImgContainer.classList.add("col-md-5");
      const userImg = document.createElement("img");
      userImg.classList.add("img-fluid", "rounded-3", "justify-content-start");

      if (!profile.avatar) {
        userImg.src = "../../../../../img/no-image.jpg";
        userImg.alt = `No image available`;
      } else {
        userImg.src = profile.avatar;
        userImg.alt = "Your profile image";
      }

      const userInfoContainer = document.createElement("div");
      userInfoContainer.classList.add(
        "col-md-4",
        "text-center",
        "text-md-start"
      );
      const userUsername = document.createElement("h1");
      userUsername.classList.add("text-dark");
      userUsername.innerText = profile.name;
      const userEmail = document.createElement("h2");
      userEmail.classList.add("text-muted", "mb-4");
      userEmail.innerText = profile.email;
      const editProfileBtn = document.createElement("a");
      editProfileBtn.classList.add(
        "btn",
        "btn-primary",
        "text-white",
        "fw-bold",
        "text-uppercase",
        "w-75",
        "mb-2"
      );
      editProfileBtn.href = "../../profile/edit/index.html";
      editProfileBtn.innerText = "Edit account";

      userImgContainer.appendChild(userImg);
      userInfoContainer.appendChild(userUsername);
      userInfoContainer.appendChild(userEmail);
      userInfoContainer.appendChild(editProfileBtn);
      aboutUserContainer.appendChild(userImgContainer);
      aboutUserContainer.appendChild(userInfoContainer);

      const posts = await postMethods.getPostsUser();
      const container = document.querySelector("#userPostCard");
      renderPostTemplates(posts, container);
    }

    async function postTemplatesOne() {
      const url = new URL(location.href);
      const id = url.searchParams.get("id");
      const post = await postMethods.getPost(id);
      console.log(post);
      const onePostContainer = document.querySelector("#onePost");
      const h3Title = document.createElement("h3");
      h3Title.innerText = post.title;
      const imgMedia = document.createElement("img");

      const pBody = document.createElement("p");
      pBody.innerText = post.body;

      if (!post.media) {
        imgMedia.src = "../../../../../img/no-image.jpg";
      } else {
        imgMedia.src = post.media;
      }

      onePostContainer.appendChild(h3Title);
      onePostContainer.appendChild(imgMedia);
      onePostContainer.appendChild(pBody);
    }

    if (
      window.location.pathname === "/posts/" ||
      window.location.pathname === "/posts/index.html"
    ) {
      postTemplates();
    }

    if (
      window.location.pathname === "/post/edit/" ||
      window.location.pathname === "/post/edit/index.html"
    ) {
      postTemplatesUser();
    }

    if (window.location.pathname === "/post/singlepost.html") {
      postTemplatesOne();
    }
  }
}
