<template>
  <div>
    <div 
      class="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center cursor-pointer hover:bg-gray-50"
      @click="triggerFileInput"
      @dragover.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
      @drop.prevent="onDrop"
      :class="{ 'bg-blue-50 border-blue-300': dragover }"
    >
      <div class="flex flex-col items-center">
        <svg v-if="!selectedFile" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <div v-if="selectedFile" class="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="ml-2 font-medium">{{ selectedFile.name }}</span>
        </div>
        <p v-if="!selectedFile" class="text-sm text-gray-500">Drag and drop your CV file here, or click to browse</p>
        <p v-else class="text-sm text-gray-500">{{ Math.round(selectedFile.size / 1024) }} KB</p>
        <input 
          type="file" 
          ref="fileInput" 
          class="hidden" 
          accept=".pdf,.doc,.docx" 
          @change="onFileSelected"
        />
      </div>
    </div>
    
    <div v-if="selectedFile" class="mt-4 flex justify-end">
      <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2" @click="clearFile">
        Clear
      </button>
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="uploadFile">
        Upload for Review
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const selectedFile = ref(null);
const dragover = ref(false);

const triggerFileInput = () => {
  fileInput.value.click();
};

const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

const onDrop = (event) => {
  dragover.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

const clearFile = () => {
  selectedFile.value = null;
  fileInput.value.value = '';
};

const uploadFile = () => {
  // Here we would normally implement the file upload functionality
  // For now, let's just emit an event that the parent component can listen for
  emit('upload', selectedFile.value);
};

// Define emits
const emit = defineEmits(['upload']);
</script> 