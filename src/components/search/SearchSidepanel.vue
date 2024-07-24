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
  // {
  //   id: 'acc1',
  //   summary: 'Size',
  //   type: 'size',
  //   details: [
  //     { id: 's1', label: '6', value: '6' },
  //     { id: 's2', label: '6.5', value: '6.5' },
  //     { id: 's3', label: '7', value: '7.5' },
  //     { id: 's4', label: '8', value: '8' },
  //     { id: 's5', label: '8.5', value: '8.5' },
  //     { id: 's6', label: '9', value: '9' },
  //     { id: 's7', label: '9.5', value: '9.5' },
  //     { id: 's8', label: '10', value: '10' },
  //     { id: 's9', label: '10.5', value: '10.5' },
  //     { id: 's10', label: '11', value: '11' },
  //     { id: 's11', label: '11.5', value: '11.5' },
  //     { id: 's12', label: '12', value: '12' },
  //   ],
  // },
  {
    id: 'acc2',
    summary: 'Category',
    type: 'category',
    details: [],
  },
  // {
  //   id: 'acc3',
  //   summary: 'Color',
  //   type: 'color',
  //   details: [
  //     {
  //       id: 'c1',
  //       label: 'Primary',
  //       value: 'bg-primary-500',
  //       counter: 10,
  //     },
  //     {
  //       id: 'c2',
  //       label: 'Black and gray',
  //       value: 'bg-[linear-gradient(-45deg,#000_50%,#d1d5db_50%)]',
  //       counter: 5,
  //     },
  //     {
  //       id: 'c3',
  //       label: 'Violet',
  //       value: 'bg-violet-500',
  //       counter: 0,
  //     },
  //     {
  //       id: 'c4',
  //       label: 'Red',
  //       value: 'bg-red-500',
  //       counter: 2,
  //     },
  //     {
  //       id: 'c5',
  //       label: 'Yellow',
  //       value: 'bg-yellow-500',
  //       counter: 100,
  //     },
  //     {
  //       id: 'c6',
  //       label: 'Avocado',
  //       value: 'bg-gradient-to-tr from-yellow-300 to-primary-500',
  //       counter: 14,
  //     },
  //   ],
  // },
  {
    id: 'acc5',
    summary: 'Price',
    type: 'radio',
    details: [
      { id: 'pr1', label: 'Under €24.99', value: 'en-dessous' },
      { id: 'pr2', label: '€25.00 - €49.99', value: '25-49' },
      { id: 'pr3', label: '€50.00 - €99.99', value: '50-99' },
      { id: 'pr4', label: '€100.00 - €199.99', value: '100-199' },
      { id: 'pr5', label: '€200.00 et au-delà', value: 'above' },
    ],
  },
]);
const sortOptions = ref([
  { id: 'sort1', label: 'Pertinence', value: 'pertinence' },
  { id: 'sort2', label: 'Prix : Du plus bas au plus haut', value: 'lth' },
  { id: 'sort3', label: 'Prix : du plus haut au plus bas', value: 'htl' },
  { id: 'sort4', label: 'Nouveaux arrivages', value: 'news' },
]);

// eslint-disable-next-line no-nested-ternary
const selectedFilters = ref<string[]>(categ ? (Array.isArray(categ) ? categ : [categ]) : []);
const opened = ref<boolean[]>(filtersData.map(() => true));
const priceModel = ref(price || '');
const /** @deprecated */ ratingsModel = ref('');
const sortModel = ref(sort || 'pertinence');
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
      <h4 class="px-2 font-bold typography-headline-4">Paramètre de la liste</h4>
      <button type="button" class="sm:hidden text-red-500" aria-label="Fermer le panneau de filtres" @click="$emit('close')">
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
      <SfButton variant="secondary" class="w-full mr-3" @click="handleClearFilters()"> Supprimer tout les filtres </SfButton>
      <RouterLink
        class="inline-flex items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-disabled-500 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed py-2 leading-6 px-4 gap-2 text-primary-700 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 ring-1 ring-inset ring-primary-700 shadow hover:shadow-md active:shadow hover:ring-primary-800 active:ring-primary-900disabled:ring-disabled-300 disabled:bg-white/50 w-full mr-3"
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
        Afficher le produit
      </RouterLink>
    </div>
  </aside>
</template>
