<template>
  <div>
    <section class="mb-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Upload Your CV for Review</h2>
        <p class="mb-4">Get professional feedback on your CV to improve your job prospects.</p>
        
        <UploadCV @upload="handleUpload" />
      </div>
    </section>
    
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">How It Works</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-blue-600 text-2xl font-bold mb-2">1.</div>
          <h3 class="text-xl font-semibold mb-2">Upload Your CV</h3>
          <p>Submit your CV in PDF, DOC, or DOCX format for review.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-blue-600 text-2xl font-bold mb-2">2.</div>
          <h3 class="text-xl font-semibold mb-2">Expert Review</h3>
          <p>Our team of professionals will review your CV thoroughly.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-blue-600 text-2xl font-bold mb-2">3.</div>
          <h3 class="text-xl font-semibold mb-2">Get Feedback</h3>
          <p>Receive detailed feedback and suggestions to improve your CV.</p>
        </div>
      </div>
    </section>
    
    <section>
      <h2 class="text-2xl font-bold mb-4">Why Choose Our CV Review Service</h2>
      <ul class="bg-white p-6 rounded-lg shadow-md list-disc list-inside space-y-2">
        <li>Expert reviewers with industry experience</li>
        <li>Detailed, actionable feedback</li>
        <li>Quick turnaround time</li>
        <li>Personalized recommendations</li>
        <li>Improve your chances of landing interviews</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import UploadCV from '~/components/UploadCV.vue';

const handleUpload = (file) => {
  // Here we would handle the file upload
  console.log('File to upload:', file);
  // In a real app, we would upload the file to the server and redirect to the dashboard
  // For now, we can just show an alert
  alert(`File "${file.name}" uploaded successfully! In a real app, you would be redirected to your dashboard.`);
};
</script> 