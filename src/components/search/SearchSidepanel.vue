<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import {
  SfAccordionItem,
  SfButton,
  SfChip,
  SfCheckbox,
  SfCounter,
  SfIconChevronLeft,
  SfIconCheck,
  SfIconClose,
  SfListItem,
  SfRadio,
  SfRating,
  SfSelect,
  SfThumbnail,
} from '@storefront-ui/vue';
import { RouterLink, useRouter } from 'vue-router';
import { routes } from '@/router';
import axios from 'axios';
import { apiRoutes } from '@/utils/apiRoutes';
import type { Category } from '@/types/category';

defineEmits(['close']);

const router = useRouter();
const route = router.currentRoute.value;
const { categ, price, sort } = route.query as Record<string, string>;

type FilterDetail = {
  id: string;
  label: string;
  value: string;
  counter?: number;
  link?: string;
};

type Node = {
  id: string;
  summary: string;
  type: string;
  details: FilterDetail[] | Category[];
};

const filtersData = reactive<Node[]>([
  {
    id: 'acc2',
    summary: 'Catégorie',
    type: 'category',
    details: [],
  },
  {
    id: 'acc5',
    summary: 'Prix',
    type: 'radio',
    details: [
      { id: 'pr1', label: 'Moins de 25€', value: '0-25' },
      { id: 'pr2', label: '25€ - 50€', value: '25-50' },
      { id: 'pr3', label: '50€ - 100€', value: '50-100' },
      { id: 'pr4', label: '100€ - 200€', value: '100-200' },
      { id: 'pr5', label: '200€ et plus', value: '200-99999' },
    ],
  },
]);
const sortOptions = ref([
  { id: 'sort1', label: 'Pertinence', value: 'relevance' },
  { id: 'sort2', label: 'Prix : Ascendant', value: 'lth' },
  { id: 'sort3', label: 'Prix : Déscendant', value: 'htl' },
  { id: 'sort4', label: 'Nouveaux produits', value: 'new' },
]);

// eslint-disable-next-line no-nested-ternary
const selectedFilters = ref<string[]>(categ ? (Array.isArray(categ) ? categ : [categ]) : []);
const opened = ref<boolean[]>(filtersData.map(() => true));
const priceModel = ref(price || '');
const /** @deprecated */ ratingsModel = ref('');
const sortModel = ref(sort || 'relevance');
const selectedCategory = ref(route.query.categ || '');

const isItemActive = (selectedValue: string) => {
  return selectedFilters.value?.includes(selectedValue);
};
const handleClearFilters = () => {
  selectedFilters.value = [];
  priceModel.value = '';
  ratingsModel.value = '';
  selectedCategory.value = '';
};

async function fetchCategories() {
  axios({
    method: 'GET',
    url: apiRoutes.categories.all,
  }).then(({ data }) => {
    filtersData[0].details = data;
  });
}

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <aside class="w-full md:max-w-[25%]">
    <div class="flex justify-between mb-4">
      <button
        type="button"
        class="sm:hidden text-red-500"
        aria-label="Fermer le panneau de filtres"
        @click="$emit('close')"
      >
        <SfIconClose />
      </button>
    </div>
    <h5
      class="py-2 px-4 mb-6 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md"
    >
      Trier par
    </h5>
    <div class="px-2">
      <SfSelect v-model="sortModel" aria-label="Trier par">
        <option v-for="{ id, label, value } in sortOptions" :key="id" :value="value">{{ label }}</option>
      </SfSelect>
    </div>
    <h5
      class="py-2 px-4 mt-6 mb-4 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md"
    >
      Filtre
    </h5>
    <ul>
      <li v-for="({ id: filterDataId, type, summary, details }, index) in filtersData" :key="filterDataId">
        <SfAccordionItem v-model="opened[index]">
          <template #summary>
            <div class="flex justify-between p-2 mb-2">
              <p class="p-2 font-medium typography-headline-5">{{ summary }}</p>
              <SfIconChevronLeft :class="opened[index] ? 'rotate-90' : '-rotate-90'" />
            </div>
          </template>
          <ul v-if="type === 'size'" class="grid grid-cols-5 gap-2">
            <li v-for="{ id, value, counter, label } in details as FilterDetail[]" :key="id">
              <SfChip v-model="selectedFilters" class="w-full" size="sm" :input-props="{ value, disabled: !counter }">
                {{ label }}
              </SfChip>
            </li>
          </ul>
          <template v-if="type === 'category'">
            <ul class="mt-2 mb-6">
              <li v-for="{ id, slug, name, Products } in details as Category[]" :key="id">
                <RouterLink
                  :to="
                    $router.resolve({
                      name: routes.search.name,
                      query: { categ: slug, price: priceModel, sort: sortModel, q: route.query.q },
                    }).fullPath
                  "
                >
                  <SfListItem
                    size="sm"
                    :class="[
                      'first-of-type:mt-2 rounded-md active:bg-primary-100',
                      {
                        'bg-primary-100 hover:bg-primary-100 active:bg-primary-100 font-medium':
                          slug === selectedCategory,
                      },
                    ]"
                  >
                    <template #suffix>
                      <SfIconCheck v-if="slug === selectedCategory" size="xs" class="text-primary-700" />
                    </template>
                    <span class="flex items-center">
                      {{ name }}
                      <SfCounter class="ml-2 typography-text-sm">{{ Products?.length }}</SfCounter>
                    </span>
                  </SfListItem>
                </RouterLink>
              </li>
            </ul>
          </template>
          <template v-if="type === 'color'">
            <SfListItem
              v-for="{ id, value, label, counter } in details as FilterDetail[]"
              :key="id"
              size="sm"
              tag="label"
              :class="['px-1.5 bg-transparent hover:bg-transparent', { 'font-medium': isItemActive(value) }]"
              :selected="isItemActive(value)"
            >
              <template #prefix>
                <input v-model="selectedFilters" :value="value" :id="id" class="appearance-none peer" type="checkbox" />
                <span
                  class="inline-flex items-center justify-center p-1 transition duration-300 rounded-full cursor-pointer ring-1 ring-neutral-200 ring-inset outline-offset-2 outline-secondary-600 peer-checked:ring-2 peer-checked:ring-primary-700 peer-hover:bg-primary-100 peer-[&:not(:checked):hover]:ring-primary-200 peer-active:bg-primary-200 peer-active:ring-primary-300 peer-disabled:cursor-not-allowed peer-disabled:bg-disabled-100 peer-disabled:opacity-50 peer-disabled:ring-1 peer-disabled:ring-disabled-200 peer-disabled:hover:ring-disabled-200 peer-checked:hover:ring-primary-700 peer-checked:active:ring-primary-700 peer-focus-visible:outline"
                >
                  <SfThumbnail size="sm" :class="value" />
                </span>
              </template>
              <label :for="id" class="cursor-pointer">
                <span class="mr-2 typography-text-sm">{{ label }}</span>
                <SfCounter size="sm">{{ counter }}</SfCounter>
              </label>
            </SfListItem>
          </template>
          <template v-if="type === 'checkbox'">
            <SfListItem
              v-for="{ id, value, label, counter } in details as FilterDetail[]"
              :key="id"
              tag="label"
              size="sm"
              :disabled="counter === 0"
              :class="['px-1.5 bg-transparent hover:bg-transparent', { 'font-medium': isItemActive(value) }]"
            >
              <template #prefix>
                <SfCheckbox
                  v-model="selectedFilters"
                  class="flex items-center"
                  :disabled="counter === 0"
                  :value="value"
                />
              </template>
              <p>
                <span class="mr-2 text-sm">{{ label }}</span>
                <SfCounter size="sm">{{ counter }}</SfCounter>
              </p>
            </SfListItem>
          </template>
          <template v-if="type === 'radio'">
            <fieldset id="radio-price">
              <SfListItem
                v-for="{ id, value, label } in details as FilterDetail[]"
                :key="id"
                tag="label"
                size="sm"
                class="px-1.5 bg-transparent hover:bg-transparent"
              >
                <template #prefix>
                  <SfRadio
                    v-model="priceModel"
                    class="flex items-center"
                    name="radio-price"
                    :value="value"
                    @click="priceModel = priceModel === value ? '' : value"
                  />
                </template>
                <p>
                  <span :class="['text-sm mr-2', { 'font-medium': priceModel === value }]">{{ label }}</span>
                  <!-- <SfCounter size="sm">{{ counter }}</SfCounter> -->
                </p>
              </SfListItem>
            </fieldset>
          </template>
          <template v-if="type === 'rating'">
            <fieldset id="radio-ratings">
              <SfListItem
                v-for="{ id, value, label, counter } in details as FilterDetail[]"
                :key="id"
                tag="label"
                size="sm"
                class="!items-center py-4 md:py-1 px-1.5 bg-transparent hover:bg-transparent"
              >
                <template #prefix>
                  <SfRadio
                    v-model="ratingsModel"
                    name="radio-ratings"
                    class="flex items-end"
                    :value="value"
                    @click="ratingsModel = ratingsModel === value ? '' : value"
                  />
                </template>
                <!-- TODO: Adjust the styling and remove block elements when/if span wrapper removed from ListItem -->
                <div class="flex flex-wrap items-center">
                  <SfRating class="-mt-px" :value="Number(value)" :max="5" size="sm" />
                  <span :class="['mx-2 text-base md:text-sm', { 'font-medium': ratingsModel === value }]">
                    {{ label }}
                  </span>
                  <SfCounter size="sm">{{ counter }}</SfCounter>
                </div>
              </SfListItem>
            </fieldset>
          </template>
        </SfAccordionItem>
        <hr class="my-4" />
      </li>
    </ul>
    <div class="flex justify-between">
      <SfButton variant="secondary" class="w-full mr-3" @click="handleClearFilters()">
        Supprimer tout les filtres
      </SfButton>
      <RouterLink
        class="inline-flex text-center items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-disabled-500 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed py-2 leading-6 px-4 gap-2 text-primary-700 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 ring-1 ring-inset ring-primary-700 shadow hover:shadow-md active:shadow hover:ring-primary-800 active:ring-primary-900disabled:ring-disabled-300 disabled:bg-white/50 w-full mr-3"
        :to="
          $router.resolve({
            name: routes.search.name,
            query: {
              categ: selectedFilters,
              price: priceModel,
              sort: sortModel,
              q: route.query.q,
            },
          }).fullPath
        "
      >
        Rechercher avec les filtres
      </RouterLink>
    </div>
  </aside>
</template>
