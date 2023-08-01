<template>
    <div class="weather">
        <p class="weather__name">{{ weather.name }}, {{ weather.sys.country }}</p>
        <img class="weather__image" src="../assets/sunny.svg" alt="weather">
        <p class="weather__temp"> {{ getTemp(weather.main.temp) }} C</p>
        <p class="weather__feels"> Feels like {{ getTemp(weather.main.feels_like) }} C. {{ capitalizeStr(weather.weather[0].description) }}. Wind speed {{ weather.wind.speed }}.</p>
        <p class="weather__visibility"> Visibility: {{ Math.round(weather.visibility / 1000) }}km.</p>
        <p class="weather__humidity"> Humidity: {{ weather.main.humidity }}%.</p>
    </div>
</template>
<script lang="ts" setup>
    import { getTemp, capitalizeStr } from '@/const/const';
    defineProps<{
        weather: WEATHER.IWeather
    }>();
</script>
<style lang="scss" scoped>
    .weather {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(5, max-content);
        column-gap: 10px;
        margin: 10px 5px 20px;
        &__name {
            grid-area: 1 / 1 / 3 / 2;
        }
        &__image {
            grid-area: 3 / 1 / 4 / 2;
        }
        &__temp {
            grid-area: 3 / 2 / 4 / 3;
        }
        &__feels {
            grid-area: 4 / 1 / 5 / 3;
        }
        &__visibility {
            grid-area: 5 / 1 / 6 / 2;
        }
        &__humidity {
            grid-area: 5 / 2 / 6 / 3;
        }
    }
</style>
