<template >
    <div 
        class="city"
        :draggable="true"
        @dragstart="dragStartHandler"
        @dragenter.stop="dropHandler"
    >
        <img class="city__menu" src="../assets/menu.svg" alt="menu">
        <p class="city__name"> {{ item.name }} {{ item.sys.country }}</p>
        <img class="city__delete" src="../assets/delete.svg" alt="delete" @click="$emit('delete', item)">
    </div>
</template>
<script lang="ts" setup>
    import store from '@/store/store';
    const props = defineProps<{item: WEATHER.IWeather}>();
    const dragStartHandler = () => {
        store.currentDragCity = props.item;
    }

    const dropHandler = () => {
        if(store.currentDragCity?.id === props.item.id) return;
        store.weatherList = store.weatherList.map(weather => {
            if (store.currentDragCity && weather.id === props.item.id) {
                const currentOrder = store.currentDragCity.order;
                store.currentDragCity = {...store.currentDragCity, order: weather.order};
                return { ...weather, order: currentOrder };
            }
            if (store.currentDragCity && weather.id === store.currentDragCity.id) {
                return { ...weather, order: props.item.order };
            }
            return weather;
        });
    }
</script>
<style lang="scss" scoped>
    .city {
        display: grid;
        grid-template-columns: min-content 1fr min-content;
        align-items: center;
        column-gap: 5px;
        background: lightgray;
        margin-bottom: 5px;
        padding: 0 5px;
        &__menu {
            max-width: 20px;
            cursor: pointer;
        }
        &__delete {
            max-width: 20px;
            cursor: grab;
        }
    }
</style>
