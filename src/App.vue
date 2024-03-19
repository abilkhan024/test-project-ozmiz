<script setup lang="ts">
import { Layout, LayoutContent, LayoutHeader, Button } from "ant-design-vue";
import NotesList from "./components/NotesList.vue";
</script>

<template>
  <Layout class="oz-app">
    <LayoutHeader> <h1>Notes app</h1> </LayoutHeader>
    <LayoutContent>
      <NotesList />
    </LayoutContent>
  </Layout>
</template>
