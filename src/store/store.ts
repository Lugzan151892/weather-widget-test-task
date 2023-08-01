import { reactive } from "vue";
import { APILINK, APIKEY } from "@/const/const";

const store = reactive({
    weatherList: [] as Array<WEATHER.IWeather>,
    cityList: [] as Array<string>,
    currentModalError: '',
    newCityValue: '',
    currentDragCity: null as WEATHER.IWeather | null,

    async getAllCitys() {
        const localStorageData = localStorage.getItem('cityList');
        if (localStorageData) this.cityList = JSON.parse(localStorageData).cityList;
        if (!this.cityList.length) {
            return;
        }
        const allPromises = [] as Array<Promise<any>>;
        await Promise.allSettled(this.cityList.map(city => fetch(`${APILINK}?q=${city}&appid=${APIKEY}`)))
            .then(results => { // (*)
                results.forEach((result) => {
                    if (result.status == "fulfilled" && result.value.status === 200) {
                        allPromises.push(result.value.json());
                    } else {
                        result.status === 'rejected' ? console.log(result.reason) : console.log(result.value.statusText);
                    }
                });
            });
        const finalData = await Promise.all(allPromises);
        this.weatherList = finalData.map((weather, index) => {
            return {...weather, order: index + 1}
        });
    },

    async getNewCity(city: string) {
        if (!city) {
            store.currentModalError = 'Enter city name';
            return;
        }
        try {
            const data = await fetch(`${APILINK}?q=${city}&appid=${APIKEY}`);
            const result = await data.json();
            if (result.cod !== "404") {
                if (this.weatherList.some(weather => weather.id === result.id)) {
                    console.log('Город уже добавлен', result);
                    this.currentModalError = 'City already added';
                    return;
                }
                this.currentModalError = '';
                this.weatherList.push({...result, order: this.cityList.length + 1});
                this.cityList.push(result.name);
                this.newCityValue = '';
                this.addCityListInStorage();
                console.log(this.weatherList);
            } else {
                this.currentModalError = 'City not found';
                console.log('Город не найден', result);
            }
        } 
        catch (err) {
            console.error(err);
        }
    },

    deleteCity(city: WEATHER.IWeather) {
        this.weatherList = this.weatherList.filter(weather => weather.id !== city.id);
        this.cityList = this.cityList.filter(currentCity => currentCity !== city.name);
        this.addCityListInStorage();
    },

    addCityListInStorage(): void {
        const localStorageData = {cityList: this.cityList};
        localStorage.setItem('cityList', JSON.stringify(localStorageData));
    }
});

export default store;
