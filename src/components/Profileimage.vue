<template>
  <div class="grid grid-cols-8 pt-4">
    <!-- 頭貼 -->
    <div class="col-start-2 col-end-8 flex justify-center items-center">
      <div
        class="
          w-40
          h-40
          rounded-full
          border-2 border-green-700
          flex
          justify-center
          items-center
          overflow-hidden
        "
      >
        <img
          :src="user.profileImageURL"
          v-if="user.profileImageURL"
          class="max-w-xs w-60"
        />
        <img :src="newURL" v-else-if="newURL" class="max-w-xs" />
        <img src="@/assets/user.svg" v-else class="object-cover" />
      </div>
    </div>
    <!-- 確認取消按鈕 -->
    <form class="col-start-2 col-end-8 py-4 text-center">
      <label
        class="
          mx-auto
          border border-green-700
          rounded-md
          p-2
          text-center
          hover:text-gray-100 hover:bg-green-700
        "
      >
        選擇照片
        <input type="file" @change="upload" accept="image/jpeg" class="w-0" />
      </label>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { storage } from "../includes/firebase";

const storageRef = storage.ref();
export default {
  name: "AppProfileimage",
  emits: ["updateData"],
  props: {
    user: Object,
  },
  setup(props, { emit }) {
    const newURL = ref("");
    // upload
    const upload = async (event) => {
      const file = event.target.files[0];
      const userProfileImageRef = storageRef.child(
        `userProfileImage/${file.name}`
      );
      const { task } = await userProfileImageRef.put(file);
      const url = await task.snapshot.ref.getDownloadURL();
      try {
        await emit("updateData", { profileImageURL: url, fileName: file.name });
      } catch (error) {
        console.log(error);
        return;
      }
      newURL.value = url;
    };
    return {
      upload,
      newURL,
    };
  },
};
</script>
