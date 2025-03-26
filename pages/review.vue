<template>
  <div>
    <div class="flex flex-col md:flex-row gap-6">
      <!-- CV Preview Section -->
      <div class="w-full md:w-1/2">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">CV Preview</h2>
          <div class="border border-gray-300 rounded-lg p-4 h-[600px] overflow-auto">
            <img src="/placeholder-cv.png" alt="CV Preview" class="w-full" />
            <!-- CV preview will be shown here -->
          </div>
        </div>
      </div>

      <!-- Review Form Section -->
      <div class="w-full md:w-1/2">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">Feedback</h2>
          <form>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Overall Rating</label>
              <div class="flex gap-2">
                <button type="button" class="p-2 rounded-full bg-gray-200 text-yellow-500">★</button>
                <button type="button" class="p-2 rounded-full bg-gray-200 text-yellow-500">★</button>
                <button type="button" class="p-2 rounded-full bg-gray-200 text-yellow-500">★</button>
                <button type="button" class="p-2 rounded-full bg-gray-200 text-gray-400">★</button>
                <button type="button" class="p-2 rounded-full bg-gray-200 text-gray-400">★</button>
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Content Quality</label>
              <select class="w-full p-2 border border-gray-300 rounded">
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Below Average</option>
                <option>Poor</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Format & Layout</label>
              <select class="w-full p-2 border border-gray-300 rounded">
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Below Average</option>
                <option>Poor</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Detailed Feedback</label>
              <textarea rows="6" class="w-full p-2 border border-gray-300 rounded" placeholder="Provide detailed feedback and suggestions for improvement"></textarea>
            </div>
            
            <div class="mb-4">
              <h3 class="font-semibold mb-2">Improvement Areas</h3>
              <div class="space-y-2">
                <div>
                  <input type="checkbox" id="formatting" class="mr-2">
                  <label for="formatting">Formatting & Structure</label>
                </div>
                <div>
                  <input type="checkbox" id="content" class="mr-2">
                  <label for="content">Content & Description</label>
                </div>
                <div>
                  <input type="checkbox" id="grammar" class="mr-2">
                  <label for="grammar">Grammar & Spelling</label>
                </div>
                <div>
                  <input type="checkbox" id="achievements" class="mr-2">
                  <label for="achievements">Achievements & Impact</label>
                </div>
                <div>
                  <input type="checkbox" id="keywords" class="mr-2">
                  <label for="keywords">Keywords & ATS Optimization</label>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Review page logic will go here
</script> 