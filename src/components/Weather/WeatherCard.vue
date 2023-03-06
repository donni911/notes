<template>
  <div
    class="rounded-2xl flex flex-col bg-white dark:bg-dark-text relative p-6"
  >
    <div class="absolute top-0 right-0 w-[200px] h-[200px] flex-shrink-0 z-0">
      <transition name="fade" mode="out-in">
        <div :key="computedImage">
          <img
            :src="'../../src/assets/' + computedImage"
            :alt="computedImage"
          />
        </div>
      </transition>
    </div>
    <div class="z-10">
      <div class="mb-4">
        <h4 class="font-bold mb-2">Weather {{ "in " + weather.name }}</h4>
        <p class="text-sm">What's the weather</p>
      </div>
    </div>
    <div class="mb-6 z-10">
      <div class="flex mb-2">
        <h3 class="text-5xl mr-4">
          {{ Math.round(weather.main.temp) + " °C" }}
        </h3>
        <div
          class="bg-white px-2 py-1 h-fit rounded-xl flex items-center justify-center"
        >
          <span> {{ Math.round(weather.main.feels_like) + " °C" }} </span>
        </div>
      </div>
      <span>{{ weather.weather[0].main }}</span>
    </div>

    <div class="flex gap-4 lg:justify-between z-10">
      <card-sm :title="'Pressure'" class="primary" :description="'800mb'" />
      <card-sm :title="'Pressure'" class="muted" :description="'800mb'" />
      <card-sm :title="'Pressure'" class="secondary" :description="'800mb'" />
    </div>
    <pre></pre>
  </div>
</template>

<script>
import CardSm from "./components/CardSm.vue";

export default {
  components: {
    CardSm,
  },

  props: ["weather"],

  computed: {
    computedImage() {
      switch (this.weather.weather[0].main) {
        case "Clouds":
          return "cloud.png";
        case "Clear":
          return "clear.png";
        case "Snow":
          return "snow.png";
        case "Rain":
          return "rain.png";
        case "Drizzle":
          return "rain.png";
        case "Thunderstorm":
          return "thunderstorm.png";
        default:
          return "cloud.png";
      }
    },
  },

  mounted() {
    console.log("ok");
  },
};
</script>
