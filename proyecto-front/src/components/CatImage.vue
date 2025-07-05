<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    imageUrl:{
        type: String,
        required: true
    },
    altText:{
        type: String,
        default: 'Imagen de un gato'
    }
});

const emit = defineEmits(['favorite-clicked']);

const handleFavoriteClick = () => {
    emit('favorite-clicked', props.imageUrl);
};
</script>

<template>
    <div class="cat-image-container">
        <img :src="props.imageUrl" alt="props.altText" class="cat-image" />
        <button @click="handleFavoriteClick" class="favorite-button">⭐ Marcar como Favorito</button>
    </div>
</template>