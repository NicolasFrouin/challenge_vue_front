<script setup lang="ts">
import { ref, onMounted, markRaw, h, render } from 'vue';
import { GridStack, type GridItemHTMLElement } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import UsersWidget from '@/components/admin/UsersWidget.vue';
import CategorieWidget from '@/components/admin/CategorieWidget.vue';
import VenteWidget from '@/components/admin/VenteWidget.vue';

const gridStackRef = ref<HTMLElement | null>(null);
const grid = ref<GridStack | null>(null);
const widgetCount = ref(0);

const widgetTypes = ['Ventes', 'Users', 'Catégorie'] as const;
type WidgetType = typeof widgetTypes[number];

const widgetComponents = {
  Ventes: markRaw(VenteWidget),
  Users: markRaw(UsersWidget),
  Catégorie: markRaw(CategorieWidget),
};

onMounted(() => {
  initializeGrid();
});

function initializeGrid() {
  if (!gridStackRef.value) return;

  grid.value = GridStack.init({
    cellHeight: 100,
    minRow: 1,
    column: 12,
    margin: 10,
    float: true,
  }, gridStackRef.value);

  const savedLayout = localStorage.getItem('dashboardLayout');
  if (savedLayout) {
    grid.value.load(JSON.parse(savedLayout));
    updateWidgetCount();
    addDeleteButtons();
  } else {
    addWidget('Ventes', 0, 0, 5, 5);
    addWidget('Users', 5, 0, 5, 5);
    addWidget('Catégorie', 0, 5, 3, 3);
  }
}

function addWidget(type: WidgetType, x: number, y: number, w: number, h: number) {
  if (!grid.value) return;

  const widgetId = `widget-${widgetCount.value}`;
  const widget = grid.value.addWidget({
    x, y, w, h,
    content: `<div class="grid-stack-item-content">
                <div class="widget-header">
                  <button class="delete-button">×</button>
                </div>
                <div class="widget-body" id="${widgetId}"></div>
              </div>`,
  });
  addDeleteButton(widget);
  mountWidgetComponent(type, widgetId);
  widgetCount.value++;
}

function mountWidgetComponent(type: WidgetType, elementId: string) {
  const component = widgetComponents[type];
  if (component) {
    const container = document.getElementById(elementId);
    if (container) {
      render(h(component), container);
    }
  }
}

function addDeleteButton(widget: GridItemHTMLElement) {
  const deleteButton = widget.querySelector('.delete-button') as HTMLButtonElement;
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    grid.value?.removeWidget(widget);
    widgetCount.value--;
  });
}

function addDeleteButtons() {
  grid.value?.getGridItems().forEach(widget => addDeleteButton(widget));
}

function saveDashboard() {
  if (!grid.value) return;

  const serializedData = grid.value.save();
  localStorage.setItem('dashboardLayout', JSON.stringify(serializedData));
  alert('Dashboard sauvegarder!');
}

function createWidget() {
  const type = prompt(`Choisie le type de widget (${widgetTypes.join(', ')}):`) as WidgetType;
  if (type && widgetTypes.includes(type) && grid.value) {
    const newWidget = {
      x: 0,
      y: 0,
      w: 5,
      h: 5,
    };
    addWidget(type, newWidget.x, newWidget.y, newWidget.w, newWidget.h);
  } else if (type) {
    alert('Type Invalide. Choisisser parmis les types suivant: ' + widgetTypes.join(', '));
  }
}

function updateWidgetCount() {
  if (grid.value) {
    widgetCount.value = grid.value.getGridItems().length;
  }
}
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <div class="button-container">
      <button @click="saveDashboard" class="action-button save-button">Sauvegarder</button>
      <button @click="createWidget" class="action-button create-button">Ajouter un Widget</button>
    </div>
    <div ref="gridStackRef" class="grid-stack"></div>
  </div>
</template>

<style scoped>
.grid-stack-item-content {
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  overflow: hidden;
}

.widget-header {
  background-color: #ddd;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.widget-body {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-button:hover {
  background-color: #ff1a1a;
}

.button-container {
  margin-bottom: 10px;
}

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
}

.save-button {
  background-color: #FE828C;
}

.save-button:hover {
  background-color: #FE828C;
}

.create-button {
  background-color: #253131;
}

.create-button:hover {
  background-color: #253131;
}
</style>
