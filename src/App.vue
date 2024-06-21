<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <div id="app">
    <header style="border-bottom: 1px solid black;padding: 0;">
      <div class="container">
        <div style="display: flex; flex-direction: row; align-items: center;">
          <img class="img1" src="../src/img/fb7f99fa-d06b-45ef-a97c-d3b5f9e1e773.jpg" style="border-radius: 30px;">
          <h3 style="margin-left: 1em; color: #FE828C;">ONLY CANS</h3>
        </div>
        <div class="search-bar">
          <p>S</p>
          <input type="search" placeholder="Recherche de produit" />
        </div>
        <nav>
          <ul>
            <li><a href="#" class="headerlink">Produits</a></li>
            <li><a href="#" class="headerlink">A propos</a></li>
            <li class="headerlink"><RouterLink to="/about">Politique de confidentialité</RouterLink></li>
            <li><a href="#" class="headerlink">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <aside class="filter-panel">
        <div class="filter-header">
          <h4>Filters</h4>
          <button class="clear-filter">Clear Filter</button>
        </div>
        <div class="filter-section">
          <h5>Catégorie</h5>
          <ul>
            <li>Soda <span>15</span></li>
            <li>Eau gazeuze <span>45</span></li>
            <li>Édition limitée <span>1</span></li>
            <li>Énergétique <span>4</span></li>
            <li>Exotique <span>6</span></li>
          </ul>
        </div>
        <div class="filter-section">
          <h5>Price</h5>
          <ul>
            <li>0.00€ - 3.00€ <span>19</span></li>
            <li>3.00€ - 7.00€ <span>21</span></li>
            <li>7.00€ - 12.00€ <span>9</span></li>
            <li>12.00€ - 24.00€ <span>6</span></li>
            <li>24.00€ + <span>3</span></li>
          </ul>
        </div>
        <button class="apply-filters">Apply Filters (2)</button>
      </aside>
      <section class="content">
        <!-- Contenu principal -->
      </section>
    </main>

    <footer>
      <div class="container">
        <p>&copy; 2024 E-Shop. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>


<style>
.headerlink {
  color: #FE828C;
}
.search-bar {
  background-color: #FE828C;
  color: white;
  border-radius: 3em;
  border: none;
}
.img1 {
  width: 4em;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
}

header {
  background-color: #333;
  color: white;
  padding: 20px 0;
  width: 100%;
}

header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}

header nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

header nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

header nav a:hover {
  text-decoration: underline;
}

header .search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 300px;
}

header .search-bar i {
  position: absolute;
  left: 10px;
  color: #fff;
}

header .search-bar input {
  padding: 5px 10px 5px 30px;
  font-size: 16px;
  width: 100%;
  background: none;
  border: none;
  color: white;
}

main {
  display: flex;
  flex: 1;
  width: 100%;
}

aside.filter-panel {
  background-color: #333;
  color: #FE828C;
  padding: 20px;
  width: 250px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-header h4 {
  margin: 0;
}

.clear-filter {
  background: none;
  border: 1px solid #FE828C;
  color: #FE828C;
  padding: 5px 10px;
  cursor: pointer;
}

.clear-filter:hover {
  background-color: #FE828C;
  color: white;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h5 {
  margin: 10px 0;
}

.filter-section ul {
  list-style: none;
  padding: 0;
}

.filter-section ul li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  cursor: pointer;
}

.filter-section ul li span {
  color: #FE828C;
}

.apply-filters {
  background-color: #FE828C;
  color: white;
  border: none;
  padding: 10px 20px;
  width: 100%;
  cursor: pointer;
}

.apply-filters:hover {
  background-color: #ff5f6d;
}

section.content {
  flex: 1;
  padding: 20px;
}

footer {
  background-color: #333;
  color: white;
  padding: 20px 0;
  text-align: center;
  width: 100%;
}

footer .container {
  width: 100%;
  padding: 0 20px;
}

::placeholder {
  color: white!important;
}
</style>
