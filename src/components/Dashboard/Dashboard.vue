<template>
  <div>
    <h1>Dashboard</h1>
    <v-layout>
      <programhead></programhead>
    </v-layout>
  </div>
</template>

<script>
import ProgramHead from './ProgramHead'
export default {
  name: 'Dashboard',
  components: {
    'programhead': ProgramHead
  }
}
</script>
