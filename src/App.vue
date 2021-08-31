<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

html,
body {
  position: relative;
  min-height: 100%;
  font-size: 16px;
  font-family: $fontBase;
  overflow-x: hidden;
}

body {
  background-color: $white;
  color: $black;
}
</style>
