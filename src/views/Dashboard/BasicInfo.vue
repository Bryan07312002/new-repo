<template>
  <div class="basic_info-container">
    <div class="basic_info">
      <div class="text-popout">{{ inspected_wheels }}</div>
      <br />Rodas inspecionadas
    </div>
    <div class="basic_info">
      <div class="text-popout">{{ reproved_wheels_number }}</div>
      <br />Rodas Reprovadas
    </div>
    <div class="basic_info">
      <div class="text-popout">{{ reproved_wheels_percentage }} %</div>
      <br />Rodas Reprovadas
    </div>
    <div class="basic_info">
      <div class="text-popout">{{ medium_time }} min</div>
      <br />Tempo Médio entre Reprovações
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  inspected_wheels: { type: Number, default: 0 },
  reproved_wheels_number: {},
  reproved_wheels_percentage: {},
  medium_time: {},
});
</script>

<style scoped>
.basic_info-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  min-height: 10vh;
}

.basic_info {
  text-align: center;
  color: var(--gray);
  font-size: var(--font-medium);
  line-height: 80%;
}

.text-popout {
  color: var(--very-dark-blue);
  font-weight: bold;
  font-size: var(--font-big);
}

.basic_info {
  text-align: center;
  color: var(--gray);
  font-size: var(--font-medium);
  line-height: 80%;
}

.text-popout {
  color: var(--very-dark-blue);
  font-weight: bold;
  font-size: var(--font-big);
}
</style>


