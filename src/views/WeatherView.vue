<template>
    <div class="weather">
        <div class="weather__settings">
            <img src="../assets/settings.svg" v-if="!modal" alt="Settings" class="weather__settings-image" @click="handleModal">
            <ModalSettings v-if="modal" @close="handleModal" class="weather__settings-modal"/>
        </div>
        <div class="weather__container">
            <div v-if="weatherList.length" class="weather__list">
                <WeatherComponent v-for="weather in weatherList" :weather="weather"/>
            </div>
            <div class="weather__text" v-else>
                You didnt pick city.
                Press settings button to set up your weather widget!
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, ref, computed } from 'vue';
    import store from '@/store/store';
    import ModalSettings from '@/components/ModalSettings.vue';
    import WeatherComponent from '@/components/WeatherComponent.vue';

    const modal = ref(false);

    const handleModal = () => {
        modal.value = !modal.value;
        store.currentModalError = '';
    }

    onMounted(() => {
        store.getAllCitys();
    });

    const weatherList = computed(() => {
        return store.weatherList.sort((a, b) => a.order > b.order ? 1 : -1);
    })
</script>
<style lang="scss" scoped>
    .weather {
        max-width: 300px;
        &__settings {
            position: relative;
            &-image {
                position: absolute;
                top: 10px;
                right: 10px;
                max-width: 30px;
                max-height: 30px;
                cursor: pointer;
            }
            &-modal {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        &__container {
            border: 1px solid black;
            padding: 10px;
            height: 400px;
        }
        &__list {
            overflow-y: auto;
            max-height: 100%;
        }
        &__list::-webkit-scrollbar {
            width: 5px;
            background-color: #ebf3ff;
        }
        &__list::-webkit-scrollbar-thumb {
            background-color:#2680FB;
            border-radius: 10px;
        }
        &__text {
            margin: 30px 5px;
        }
    }
</style>
