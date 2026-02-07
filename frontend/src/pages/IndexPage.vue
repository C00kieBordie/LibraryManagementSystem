<script setup lang="ts">
import {ref, onMounted} from 'vue';
import BookCard from 'components/BookCard.vue';

interface Book {
  ID: string;
  imgSrc: string;
  title: string;
  author: string;
  status: string;
  qty: number;
}
const myBooks = ref<Book[]>([]);

  const fetchBooks = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/getBooks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if(data.ok){
          console.log(data.books);
          myBooks.value = data.books.result;
        }else{
          alert('Failed to fetch books.')
        }
      }
      catch (error) {
        console.error("Database connection failed", error);
      }
    }
    onMounted(async () => {
      await fetchBooks();
    });
</script>

<template>
  <q-page class="row items-center justify-evenly pt-10">
    <div class="
      bg-[#E1D9BC]
      flex
      flex-row
      gap-5
      rounded-2xl
      p-2
      justify-center"
    >
      <BookCard
        v-for="book in myBooks"
          :key="book.ID"
          :imgSrc="book.imgSrc"
          :title="book.title"
          :author="book.author"
          :quantity="Number(book.qty)"
          :status="book.status"
      />
    </div>
  </q-page>
</template>
