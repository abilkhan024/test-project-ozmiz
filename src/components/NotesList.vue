<script lang="ts" setup>
import NoteUpsertModal from "./NoteUpsertModal.vue";
import NoteInfoModal from "./NoteInfoModal.vue";
import { Table, Popconfirm, Button } from "ant-design-vue";
import dayjs from "dayjs";
import { useAsyncData } from "../hooks/use-async-data";
import { noteService } from "../services/notes";
import { Note } from "../services/notes/model";
import { ref } from "vue";

type Column = {
  title: string;
  dataIndex: string;
  key: string;
};
const columns: Column[] = [
  { title: "Title", dataIndex: "title", key: "title" },
  { title: "Created at", dataIndex: "createdAt", key: "createdAt" },
  { title: "Actions", dataIndex: "actions", key: "actions" },
];
const { pending, data, refresh } = useAsyncData(noteService.getList);

const selectedNote = ref<Note | null>(null);
const upsertModalVisible = ref(false);
const infoModalVisible = ref(false);
const selectNote = (note: Note) => {
  upsertModalVisible.value = true;
  selectedNote.value = note;
};
const viewInfo = (note: Note) => {
  infoModalVisible.value = true;
  selectedNote.value = note;
};
const createNote = () => {
  selectedNote.value = null;
  upsertModalVisible.value = true;
};
const deleteById = (id: number) => {
  noteService.deleteById(id);
  refresh();
};
</script>

<template>
  <NoteInfoModal v-model:visible="infoModalVisible" :note="selectedNote" />
  <NoteUpsertModal
    @finish="refresh"
    :note="selectedNote"
    v-model:visible="upsertModalVisible"
  />
  <div class="oz-flex">
    <h2>Your notes</h2>
    <Button @click="createNote" type="primary">Create</Button>
  </div>
  <Table :loading="pending" :data-source="data" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'actions'">
        <Popconfirm title="Sure to delete?" @confirm="deleteById(record.id)">
          <Button danger> Delete</Button>
        </Popconfirm>
        <Button style="margin-left: 12px" @click="selectNote(record as Note)">
          Edit
        </Button>
        <Button
          type="primary"
          style="margin-left: 12px"
          @click="viewInfo(record as Note)"
        >
          View info
        </Button>
      </template>
      <template v-else-if="column.dataIndex === 'createdAt'">{{
        dayjs(text).format("DD.MM.YYYY")
      }}</template>
    </template>
  </Table>
</template>
