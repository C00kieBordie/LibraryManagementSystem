<script setup lang="ts">
import {ref, onMounted} from 'vue';
import BookCard from 'components/BookCard.vue';

const myBooks = ref([
  { id:null, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price:"13.99"},
  { id:null, title: '1984', author: 'George Orwell', price:"15.25"},
  { id:null, title: 'The Hobbit', author: 'J.R.R. Tolkien', price:"21.33"},
]);
const fetchCover = async()=>{
  for(const book of myBooks.value){
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}`
      )
      const data = await response.json()
      
      // If a match is found, grab the first result's cover ID
      if (data.docs && data.docs.length > 0) {
        book.id = data.docs[0].cover_i
      }
    } catch (error) {
      console.error("Error fetching cover for:", book.title, error)
    }
  }
}
onMounted(async () => {
  await fetchCover();
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <BookCard
        v-for="books in myBooks"
          :key="books.title"
          :id="books.id"
          :title="books.title"
          :author="books.author"
          :price="books.price"
      />
    </div>
  </q-page>
</template>
