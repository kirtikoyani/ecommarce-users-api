<template>
  <v-container class="fill-height">
    hallow , {{ data }}
    <v-btn @click="fetchJokes">click me</v-btn>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const data=ref(null)
 async function fetchJokes() {
  try {
    const response = await fetch('https://e-commerce-users-api.onrender.com/users',{
      method: 'GET',
      mode: 'no-cors'
    });
    data.value = await response.json();
  } catch (error) {
    console.error(error);
  }
}
</script>
