<template>
  <div class="filter-chip-dropdown-container">
    <div class="filter-chip">
      <slot></slot>
    </div>
    <div class="chip-dropdown">
      <div class="chip-dropdown-header">
        <div class="chip-dropdown-header-title">Main</div>
        <div class="chip-dropdown-header-close material-icons">close</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-chip-dropdown-container {
  position: relative;
}

.filter-chip {
  margin: 0.5rem;
  padding: 0.375rem 0.8125rem;
  border-radius: 2.25rem;
  border: 1px solid #c4c7c5;
  background: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  font-family: 'Noto Sans Mono';
  color: #474747;
  cursor: pointer;
}

.filter-chip:hover {
  background: #d6e2fb;
}

.chip-dropdown {
  position: absolute;
  top: 2.5rem;
  left: 0.5rem;
  width: 22.5rem;
  padding: 1rem;
  background-color: #1a73e8;
  color: #ffffff;
  font-family: 'Noto Sans Mono';
  font-size: 1rem;
  font-weight: 700;
}

.chip-dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>