<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CatImage from '../components/CatImage.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY;
const catImageUrl = ref('');
const loading = ref(true);
const error = ref(null);
const catImagesHistory = ref([]);
const favoriteCatImages = ref([]);
const breeds = ref([]);
const selectedBreedId = ref('');

const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': CAT_API_KEY
      }
    });
    breeds.value = response.data;
  } catch (err) {
    console.error('Error al obtener la lista de razas:', err);
  }
};

const fetchCatImage = async () => {
  loading.value = true;
  error.value = null;
  try {
    let apiUrl = 'https://api.thecatapi.com/v1/images/search';
    
    if (selectedBreedId.value) {
      apiUrl += `?breed_ids=${selectedBreedId.value}`;
    }

    const response = await axios.get(apiUrl, {
      headers: {
        'x-api-key': CAT_API_KEY
      }
    });

    const newImageUrl = response.data[0].url;
    catImageUrl.value = newImageUrl;

    catImagesHistory.value.push({ url: newImageUrl, timestamp: Date.now() });
    localStorage.setItem('catImagesHistory', JSON.stringify(catImagesHistory.value));

  } catch (err) {
    console.error('Error al obtener la imagen del gato:', err);
    error.value = 'No se pudo cargar la imagen del gato. Inténtalo de nuevo más tarde.';
  } finally {
    loading.value = false;
  }
};

const handleFavoriteClick = (imageUrl) =>{
    if (!favoriteCatImages.value.some(fav => fav.url === imageUrl)) {
        favoriteCatImages.value.push({ url: imageUrl, timestamp: Date.now() });
        localStorage.setItem('favoriteCatImages', JSON.stringify(favoriteCatImages.value));
        console.log('Imagen añadida a favoritos: ', imageUrl);
    } else {
        console.log('Esta imagen ya está en favoritos: ', imageUrl);
    }
};

const goToHistory = () => {
  router.push('/history');
};
const loadInitialHistory = () => {
  try {
    const storedHistory = localStorage.getItem('catImagesHistory');
    if (storedHistory) {
      catImagesHistory.value = JSON.parse(storedHistory);
    }
  } catch (e) {
    console.error('Error al cargar el historial inicial desde localStorage:', e);
  }
};

onMounted(() => {
  loadInitialHistory();
  fetchBreeds();
  fetchCatImage();
});
</script>

<template>
  <div class="cat-app">
    <h1>¡Bienvenido al generador de gatos!</h1>
    <h2>Por favor elija una raza</h2>

    <div class="breed-selector-group">
      <label for="breedSelect">Selecciona una raza:</label>
      <select id="breedSelect" v-model="selectedBreedId" :disabled="loading">
        <option value="">Aleatorio</option> <option v-for="breed in breeds" :key="breed.id" :value="breed.id">
          {{ breed.name }}
        </option>
      </select>
    </div>

    <button @click="fetchCatImage" :disabled="loading">
      {{ loading ? 'Cargando...' : 'Generar gatos' }}
    </button>

    <button @click="goToHistory">
    Ver historial
    </button>

    <div v-if="loading" class="message">Cargando imagen de gato...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <CatImage v-else-if="catImageUrl" :imageUrl="catImageUrl" altText="Una linda imagen de gato" @favorite-clicked="handleFavoriteClick"/>
    
    <div v-else class="message">Haz clic en el botón para ver un gato.</div>

     <div v-if="favoriteCatImages.length > 0" class="favorites-info">
        Tienes {{ favoriteCatImages.length }} gato(s) favorito(s).
      </div>
  </div>
</template>