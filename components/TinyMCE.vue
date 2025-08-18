<template>
  <editor
    ref="editor"
    v-model="content"
    api-key="eyuz91tplckkd5h1nt0pl0se6v27jed5r325526sq41v6mov"
    :init="{
      height: 500,
      menubar: true,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount',
        'codesample',
        'blockquote',
        'image',
        'link',
        'table',
        'lists',
        'charmap',
        'preview',
        'anchor',
        'searchreplace',
        'visualblocks',
        'fullscreen',
        'insertdatetime',
        'media',
        'paste',
        'help',
        'wordcount',
        'emoticons',
        'hr',
        'pagebreak',
        'nonbreaking',
        'directionality',
        'visualchars',
        'template',
        'paste',
        'textcolor',
        'colorpicker',
        'textpattern',
        'noneditable',
        'charmap',
        'emoticons',
        'hr',
        'pagebreak',
        'nonbreaking',
        'directionality',
        'visualchars',
        'template',
        'paste',
        'textcolor',
        'colorpicker',
        'textpattern',
        'noneditable',
      ],
      codesample_languages: [
        { text: 'JavaScript', value: 'javascript' },
        { text: 'HTML/XML', value: 'markup' },
        { text: 'CSS', value: 'css' },
        { text: 'PHP', value: 'php' },
        { text: 'Python', value: 'python' },
        { text: 'Java', value: 'java' },
        { text: 'C', value: 'c' },
        { text: 'C++', value: 'cpp' },
        { text: 'C#', value: 'csharp' },
        { text: 'Ruby', value: 'ruby' },
        { text: 'Go', value: 'go' },
        { text: 'Rust', value: 'rust' },
        { text: 'Swift', value: 'swift' },
        { text: 'Kotlin', value: 'kotlin' },
        { text: 'TypeScript', value: 'typescript' },
        { text: 'SQL', value: 'sql' },
        { text: 'JSON', value: 'json' },
        { text: 'YAML', value: 'yaml' },
        { text: 'Markdown', value: 'markdown' },
        { text: 'Bash', value: 'bash' },
        { text: 'PowerShell', value: 'powershell' },
      ],
      toolbar: [
        'undo redo | formatselect fontselect fontsizeselect | bold italic underline strikethrough | forecolor backcolor | removeformat',
        'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | blockquote | link image media table | codesample code | charmap emoticons hr pagebreak nonbreaking | searchreplace | visualblocks visualchars | fullscreen | help | wordcount | subscript superscript | ltr rtl',
      ],
      menubar: 'file edit view insert format tools table help',
      menu: {
        file: {
          title: 'File',
          items:
            'newdocument restoredraft | preview | export print | deleteallconversations',
        },
        edit: {
          title: 'Edit',
          items:
            'undo redo | cut copy paste pastetext | selectall | searchreplace',
        },
        view: {
          title: 'View',
          items:
            'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments',
        },
        insert: {
          title: 'Insert',
          items:
            'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor | insertdatetime',
        },
        format: {
          title: 'Format',
          items:
            'bold italic underline strikethrough | superscript subscript | codesample | ltr rtl',
        },
        tools: {
          title: 'Tools',
          items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount',
        },
        table: {
          title: 'Table',
          items:
            'inserttable | cell row column | advtablesort | tableprops deletetable',
        },
        help: { title: 'Help', items: 'help' },
      },
      image_title: true,
      automatic_uploads: true,
      file_picker_types: 'image',
      image_advtab: true,
      image_caption: true,
      image_dimensions: true,
      image_class_list: [
        { title: 'Responsive', value: 'img-fluid' },
        { title: 'Thumbnail', value: 'img-thumbnail' },
        { title: 'Rounded', value: 'rounded' },
        { title: 'Circle', value: 'rounded-circle' },
      ],
      link_class_list: [
        { title: 'Button', value: 'btn btn-primary' },
        { title: 'Button Secondary', value: 'btn btn-secondary' },
        { title: 'Button Success', value: 'btn btn-success' },
        { title: 'Button Danger', value: 'btn btn-danger' },
      ],
      table_class_list: [
        { title: 'Table', value: 'table' },
        { title: 'Table Striped', value: 'table table-striped' },
        { title: 'Table Bordered', value: 'table table-bordered' },
        { title: 'Table Hover', value: 'table table-hover' },
      ],
      content_style: `
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; }
        .mce-content-body { max-width: 100%; }
        .img-fluid { max-width: 100%; height: auto; }
        .btn { display: inline-block; padding: 6px 12px; margin-bottom: 0; font-size: 14px; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; vertical-align: middle; cursor: pointer; border: 1px solid transparent; border-radius: 4px; text-decoration: none; }
        .btn-primary { color: #fff; background-color: #337ab7; border-color: #2e6da4; }
        .btn-secondary { color: #fff; background-color: #6c757d; border-color: #545b62; }
        .btn-success { color: #fff; background-color: #5cb85c; border-color: #4cae4c; }
        .btn-danger { color: #fff; background-color: #d9534f; border-color: #d43d3a; }
        .table { width: 100%; margin-bottom: 1rem; color: #212529; border-collapse: collapse; }
        .table-striped tbody tr:nth-of-type(odd) { background-color: rgba(0,0,0,.05); }
        .table-bordered { border: 1px solid #dee2e6; }
        .table-hover tbody tr:hover { background-color: rgba(0,0,0,.075); }
      `,
      setup: (editor) => {
        editor.on('Change', () => {
          this.$emit('update:modelValue', editor.getContent());
        });

        // Thêm custom button cho các chức năng đặc biệt
        editor.ui.registry.addButton('customSave', {
          text: 'Lưu',
          tooltip: 'Lưu nội dung',
          onAction: () => {
            this.$emit('save', editor.getContent());
          },
        });

        editor.ui.registry.addButton('customPreview', {
          text: 'Xem trước',
          tooltip: 'Xem trước nội dung',
          onAction: () => {
            this.$emit('preview', editor.getContent());
          },
        });
      },
      file_picker_callback: filePickerCallback,
    }"
  />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    editor: Editor,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      content: this.modelValue,
    };
  },
  watch: {
    modelValue(newVal) {
      if (newVal !== this.content) {
        this.content = newVal;
      }
    },
    content(newVal) {
      if (newVal !== this.modelValue) {
        this.$emit("update:modelValue", newVal);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$refs.editor || !this.$refs.editor.editorUpload) {
        console.error("Editor is not initialized yet.");
      }
    });
  },
  methods: {
    filePickerCallback(cb, value, meta) {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");

      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          const id = "blobid" + new Date().getTime();
          const blobCache = this.$refs.editor.editor.editorUpload.blobCache;
          const base64 = reader.result.split(",")[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          cb(blobInfo.blobUri(), { title: file.name });
        });

        reader.readAsDataURL(file);
      });

      input.click();
    },
  },
};
</script>
