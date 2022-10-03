<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  step: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div
    class="flex flex-col"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label :for="name">{{ label }}</label>
    <input
      :name="name"
      :id="name"
      :type="type"
      :step="step"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="rounded-md border-2 border-transparent outline-none transition duration-300 ease-in-out focus:outline-none focus:ring-0 placeholder:italic"
      :class="{ 
        'bg-slate-200 focus:border-teal-500': !errorMessage,
        'bg-red-200 focus:border-red-500 text-red-700 placeholder:text-red-500': !!errorMessage, 
        // 'bg-green-200 focus:border-green-500': !!meta.valid,
      }"
      :autocomplete="autocomplete"
      :disabled="disabled"
    />

    <p v-show="errorMessage" class="text-red-500">
      {{ errorMessage }}
    </p>
    <p v-show="meta.valid" class="text-green-500">
      {{ successMessage }}
    </p>
  </div>
</template>