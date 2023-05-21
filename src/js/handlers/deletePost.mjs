import { removePost } from "../api/posts/index.mjs";
import { displayToast } from "../api/ui/common/displayToast.mjs";

export async function setDeletePostListener(event) {
   const { id } = event.target.dataset;
   const shouldDelete = confirm("Are you sure you want to delete the post with id: " + id);

   if (shouldDelete) {
      await removePost(id);
      event.target.parent.remove();
      displayToast("Post deleted successfully");
   }

}
