<template>
  <div
    class="rounded-2xl flex flex-col bg-white dark:bg-dark-text relative p-4 md:p-6 overflow-hidden"
  >
    <transition name="fade-scale" mode="out-in">
      <div
        :key="computedImage"
        class="absolute top-0 right-0 w-[200px] h-[200px] flex-shrink-0 z-0"
      >
        <img :src="'../../src/assets/' + computedImage" :alt="computedImage" />
      </div>
    </transition>
    <div class="z-10">
      <div class="mb-4">
        <transition name="fade" mode="out-in">
          <h4 class="font-bold mb-2" :key="weather.name">
            Weather {{ "in " + weather.name }}
          </h4>
        </transition>
        <p class="text-sm">What's the weather</p>
      </div>
    </div>
    <div class="mb-6 z-10">
      <div class="flex mb-2">
        <transition name="fade" mode="out-in">
          <h3 class="text-5xl mr-4" :key="weather.main.temp">
            {{ Math.round(weather.main.temp) + "°C" }}
          </h3>
        </transition>
        <div
          class="bg-[#ffffff75] px-2 py-1 h-fit rounded-xl flex items-center justify-center"
        >
          <transition name="fade" mode="out-in">
            <span :key="weather.main.feels_like">
              {{ Math.round(weather.main.feels_like) + "°C" }}
            </span>
          </transition>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <span :key="weather.weather[0].main">{{
          weather.weather[0].main
        }}</span></transition
      >
    </div>

    <div class="flex gap-4 -sm:justify-between z-10">
      <card-sm
        :title="'Pressure'"
        class="primary"
        :description="weather.main.pressure"
      />
      <card-sm
        :title="'Visibility'"
        class="muted"
        :description="weather.visibility"
      />
      <card-sm
        :title="'Humidity'"
        class="secondary"
        :description="weather.main.humidity"
      />
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

<style>
.fade-scale-enter-active,
.fade-scale-leave-active {
  @apply transition;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  @apply opacity-0 scale-0;
}
</style>
