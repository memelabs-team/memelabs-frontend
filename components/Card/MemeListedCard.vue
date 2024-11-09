<template>
  <div
    class="meme-vote-card p-4 bg-white rounded-lg shadow-md relative flex items-center gap-4 cursor-pointer"
    @click="memeListed(memeDetail)"
  >
    <!-- Mascot Image and Content -->
    <div
      class="flex-shrink-0 w-24 sm:w-36 h-24 sm:h-36 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
    >
      <img
        :src="memeDetail.logo || 'https://via.placeholder.com/160'"
        alt="Mascot"
        class="w-full h-auto object-cover"
        @error="
          (event) => (event.target.src = 'https://via.placeholder.com/160')
        "
      />
      <button
        class="absolute bottom-4 text-white text-xs font-semibold bg-green-500 rounded-full px-4 py-1 -translate-y-2/4 transform"
      >
        10%
      </button>
    </div>

    <!-- Card Text Content -->
    <div class="flex-1">
      <h3 class="text-xl font-semibold text-gray-800">{{ memeDetail.name }}</h3>
      <p class="text-gray-600 text-sm mt-2 line-clamp-2">
        {{ memeDetail.memeStory }}
      </p>

      <!-- Market Cap Info -->
      <div class="flex justify-between text-sm font-medium text-gray-700 mt-4">
        <span class="text-gray-800 font-semibold">Market Cap 10k</span>
      </div>
      <!-- Progress Bar -->
      <div class="progress-bar w-full h-2 bg-gray-200 rounded-full mt-2">
        <div
          class="progress h-full bg-black rounded-full"
          :style="{ width: 10 + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  memeDetail: { type: Object, required: true },
});

const memeListed = (memeDetail) => {
  router.push({
    path: `/detail/raising-detail[${memeDetail.id}]`,
    query: { memeDetail: JSON.stringify({ ...memeDetail }) },
  });
};
</script>

<style scoped>
.meme-vote-card {
  border-radius: 10px;
  border: 1px solid #dfdfdf;
  background: #fff;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Limits the text to 2 lines */
  line-clamp: 2; /* Standard property for compatibility */
}
</style>
