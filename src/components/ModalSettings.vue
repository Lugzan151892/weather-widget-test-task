<template>
    <div class="modal">
        <div class="modal__header">
            <p class="modal__header-text">Settings</p>
            <img src="../assets/close.svg" alt="Settings" class="modal__header-image" @click="$emit('close')">
        </div>
        <div class="modal__citys">
            <ModalCity
                v-if="store.weatherList.length"
                v-for="weather in store.weatherList"
                :key="weather.id"
                :item="weather"
                @delete="handleDelete"
            />
            <p v-else>Input city name below to add new city.</p>
        </div>
        <div class="modal__input">
            <p class="modal__input-title">Add Location:</p>
            <input v-model="store.newCityValue" @input="handleInput" class="modal__input-input" placeholder="Enter city name" />
            <img class="modal__input-image modal__header-image" src="../assets/enter.svg" alt="enter" @click="handleAddNewCity">
        </div>
        <p class="modal__error" v-if="store.currentModalError"> {{ store.currentModalError }} </p>
    </div>
</template>
<script lang="ts" setup>
    import ModalCity from './ModalCity.vue';
    import store from '@/store/store';
    import { ref } from 'vue';

    const input = ref('');

    const handleAddNewCity = (): void => {
        store.getNewCity(store.newCityValue);
    }

    const handleInput = (): void => {
        store.currentModalError = '';
    }

    const handleDelete = (weather: WEATHER.IWeather): void => {
        store.deleteCity(weather);
    }

</script>
<style lang="scss" scoped>
    .modal {
        width: 100%;
        padding: 10px;
        background-color: white;
        border: 1px solid black;
        &__header {
            display: grid;
            grid-template-columns: 1fr min-content;
            grid-template-rows: min-content;
            align-items: center;
            &-text {
                grid-area: 1 / 1 / 2 / 2;
            }
            &-image {
                grid-area: 1 / 2 / 2 / 3;
                max-width: 30px;
                max-height: 30px;
                cursor: pointer;
            }
        }
        &__citys {
            margin-top: 10px;
        }
        &__input {
            display: grid;
            margin-top: 10px;
            grid-template-columns: max-content min-content;
            grid-template-rows: min-content min-content;
            &-title {
                grid-area: 1 / 1 / 2 / 3;
            }
            &-input {
                grid-area: 2 / 1 / 3 / 2;
            }
            &-image {
                grid-area: 2 / 2 / 3 / 3;
            }
        }
        &__error {
            color: red;
            padding: 5px 0 0;
        }
    }
</style>
