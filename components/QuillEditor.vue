<template>
  <div class="quill-editor-wrapper">
    <client-only>
      <component
        :is="QuillEditor"
        v-if="QuillEditor"
        theme="snow"
        toolbar="full"
        v-model:content="content"
        contentType="html"
        class="custom-quill-editor"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: this.modelValue,
      QuillEditor: null,
    };
  },
  async mounted() {
    if (process.client) {
      const { QuillEditor } = await import("@vueup/vue-quill");
      await import("@vueup/vue-quill/dist/vue-quill.snow.css");
      this.QuillEditor = QuillEditor;
    }
  },
  watch: {
    modelValue(newValue) {
      if (newValue !== this.content) {
        this.content = newValue;
      }
    },
    content(newValue) {
      this.$emit("update:modelValue", newValue);
    },
  },
};
</script>

<style scoped>
.quill-editor-wrapper {
  margin: 20px auto;
  padding: 12px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}
.custom-quill-editor {
  min-height: 220px;
  border-radius: 8px;
  background: #fafbfc;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 16px;
}

/* Sticky toolbar styles */
:deep(.ql-toolbar.ql-snow) {
  border: 1px solid #d1d5db;
  box-sizing: border-box;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  padding: 8px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #fff;
  border-radius: 8px 8px 0 0;
}
:deep(.ql-editor) {
  min-height: 450px;
}
.export-btn {
  display: inline-block;
  margin: 12px 0 20px 0;
  padding: 8px 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
.export-btn:hover {
  background: #0056b3;
}
.html-output {
  background: #f6f8fa;
  border-radius: 8px;
  padding: 18px 16px;
  margin-top: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}
.html-output h3 {
  margin-top: 0;
  font-size: 17px;
  color: #333;
}
.html-output pre {
  background: #23272f;
  color: #e6e6e6;
  padding: 10px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 13px;
  margin-bottom: 12px;
}
.html-preview {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 12px;
  background: #fff;
  min-height: 60px;
}
</style>
