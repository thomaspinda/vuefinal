<script setup>
import { ref, onMounted } from 'vue';
import CatImage from './CatImage.vue';

const historyImages = ref([]);

const loadHistory = () => {
    try {
        const storedHistory = localStorage.getItem('catImagesHistory');
        if (storedHistory){
            historyImages.value = JSON.parse(storedHistory);
        }
    } catch (e) {
        console.error('Error al cargar el historial desde localStorage: ', e);
    }
};
onMounted(() => {
    loadHistory();
    console.log('Historial cargado:', historyImages.value);
});
</script>
<template>
    <div class="image-history">
        <h2> Historial de gatos vistos</h2>
        <p v-if="historyImages.length === 0" class="no-history-message">
            Aún no hay imagenes en tu historial (^. .^)
        </p>
        <div v-else class="history-grid">
            <div v-for="(image, index) in historyImages" :key="index" class="history-item">
                <CatImage :imageUrl="image.url" :altText="`Gato del historial ${index + 1}`" />
                <span class="history-timestamp">{{ new Date(image.timestamp).toLocaleString() }}</span>
            </div>
        </div>
    </div>
</template>