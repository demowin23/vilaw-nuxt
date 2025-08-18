<template>
  <div>
    <h2>Tạo nội dung</h2>

    <!-- Sử dụng v-model để two-way binding -->
    <TinyMCE v-model="content" @save="handleSave" @preview="handlePreview" />

    <!-- Hiển thị nội dung đã nhập -->
    <div class="preview">
      <h3>Xem trước:</h3>
      <div v-html="content"></div>
    </div>

    <!-- Nút lưu -->
    <button @click="saveToDatabase" class="btn btn-primary">
      Lưu vào Database
    </button>
  </div>
</template>

<script>
import TinyMCE from "~/components/TinyMCE.vue";

export default {
  components: {
    TinyMCE,
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    handleSave(content) {
      console.log("Nội dung đã lưu:", content);
    },

    handlePreview(content) {
      console.log("Xem trước:", content);
    },

    async saveToDatabase() {
      try {
        // Lưu this.content vào database
        const response = await $fetch("/api/content/save", {
          method: "POST",
          body: { content: this.content },
        });

        alert("Lưu thành công!");
      } catch (error) {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra!");
      }
    },
  },
};
</script>
