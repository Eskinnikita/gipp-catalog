<template>
  <div class="cover-snippet">
    <img class="cover-snippet__image"
         src="https://mk0leobooksiim6pt1a5.kinstacdn.com/wp-content/uploads/2021/03/Smeshariky_cover_04_2021.jpg"
         alt="">
    <div class="cover-snippet__info">
      <h5 class="cover-snippet__title">Название выпуска, lfdlfdfdf fd fdf</h5>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.cover-snippet {
  cursor: pointer;
  transition: transform 0.3s;
  max-width: 150px;
  &__image {
    height: 200px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 3px;
    border-radius: 4px;
  }

  &__info {
    color: #409EFF;
  }

  &__title {
    font-size: 14px;
    font-weight: normal;
  }

  &:hover {
    transform: scale(1.03);
  }
}
</style>
