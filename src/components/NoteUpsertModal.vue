<script lang="ts" setup>
import {
  Form,
  FormItem,
  Button,
  Input,
  Modal,
  Textarea,
  notification,
} from "ant-design-vue";
import { Note, NoteCreateDTO } from "../services/notes/model";
import { computed, ref } from "vue";
import { noteService } from "../services/notes";
const props = defineProps<{ note: Note | null; visible: boolean }>();
const emit = defineEmits<{
  (e: "update:visible", val: boolean): void;
  (e: "finish"): void;
}>();
const formState = ref<NoteCreateDTO>({ title: "", body: "" });
const visible = computed({
  get: () => {
    formState.value = {
      title: props?.note?.title ?? "",
      body: props?.note?.body ?? "",
    };

    return props.visible;
  },
  set: (value) => emit("update:visible", value),
});
const isEdit = computed(() => props.note);
const onSubmit = async () => {
  if (isEdit.value) {
    noteService.updateById(props.note!.id, formState.value);
  } else {
    noteService.create(formState.value);
  }
  emit("finish");
  emit("update:visible", false);
  notification.success({
    message: "Saved successfully!",
  });
};
const title = computed(() => `${isEdit.value ? "Edit" : "Create"} note`);
</script>

<template>
  <Modal :title="title" v-model:open="visible" :footer="null">
    <Form :model="formState" layout="vertical" @finish="onSubmit">
      <FormItem required label="Title" name="title">
        <Input v-model:value="formState.title" />
      </FormItem>
      <FormItem required label="Body" name="body">
        <Textarea v-model:value="formState.body" />
      </FormItem>
      <Button html-type="submit" type="primary">Save</Button>
    </Form>
  </Modal>
</template>
