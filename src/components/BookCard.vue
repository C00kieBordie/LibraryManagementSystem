<script setup lang="ts">
    import {computed} from 'vue';
    const props = defineProps(['id', 'title', "author", 'price']);
    const coverUrl = computed(() => {
  // If imgId is still null, show a placeholder
    if (!props.id)
        return 'https://placehold.co/400x600?text=No+Cover';
    else
        return `https://covers.openlibrary.org/b/id/${props.id}-L.jpg`;
    });
</script>
<template>
    <q-card class="w-64 bg-white shadow-md hover:shadow-xl transition-shadow">
        <q-img :src="coverUrl" height="200px" />

        <q-card-section>
            <div class="text-h6 text-[#30364F] font-bold truncate">{{ title }}</div>
            <div class="text-subtitle2 text-grey-7">By {{ author }}</div>
        </q-card-section>
    </q-card>
</template>