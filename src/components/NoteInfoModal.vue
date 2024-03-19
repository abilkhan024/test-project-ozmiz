<script lang="ts" setup>
import { Modal } from "ant-design-vue";
import { Note } from "../services/notes/model";
import { computed } from "vue";
const props = defineProps<{ note: Note | null; visible: boolean }>();
const emit = defineEmits<{ (e: "update:visible", val: boolean): void }>();
const visible = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});
</script>

<template>
  <Modal title="Note info" v-model:open="visible" :footer="null">
    <h4>Title</h4>
    <p>{{ note?.title }}</p>
    <h4>Body</h4>
    <p>{{ note?.body }}</p>
  </Modal>
</template>
