<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Your Dashboard</h1>
    
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-blue-600 text-3xl font-bold mb-2">2</div>
        <div class="text-gray-600">CVs Submitted</div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-green-600 text-3xl font-bold mb-2">1</div>
        <div class="text-gray-600">Reviews Received</div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-yellow-500 text-3xl font-bold mb-2">★ 4.2</div>
        <div class="text-gray-600">Average Rating</div>
      </div>
    </div>
    
    <!-- CV List -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-bold mb-4">Your CV Submissions</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full min-w-max table-auto">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-3 px-4 text-left">CV Name</th>
              <th class="py-3 px-4 text-left">Submitted</th>
              <th class="py-3 px-4 text-left">Status</th>
              <th class="py-3 px-4 text-left">Rating</th>
              <th class="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200">
              <td class="py-3 px-4">Professional-CV-2024.pdf</td>
              <td class="py-3 px-4">Mar 15, 2024</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Reviewed</span>
              </td>
              <td class="py-3 px-4 text-yellow-500">★★★★☆</td>
              <td class="py-3 px-4">
                <button class="text-blue-600 hover:underline mr-2">View</button>
                <button class="text-blue-600 hover:underline">Download</button>
              </td>
            </tr>
            <tr>
              <td class="py-3 px-4">Technical-Resume-Updated.pdf</td>
              <td class="py-3 px-4">Mar 20, 2024</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
              </td>
              <td class="py-3 px-4">-</td>
              <td class="py-3 px-4">
                <button class="text-blue-600 hover:underline mr-2">View</button>
                <button class="text-blue-600 hover:underline">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Latest Feedback -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">Latest Feedback</h2>
      
      <div class="mb-4">
        <h3 class="font-semibold">Professional-CV-2024.pdf</h3>
        <div class="text-yellow-500 mb-2">★★★★☆</div>
        <div class="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50">
          <p class="text-gray-700">Your CV has a clean structure and good content, but could use some improvement in quantifying achievements and optimizing for ATS systems.</p>
        </div>
        
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-700">Strengths:</h4>
            <ul class="list-disc list-inside text-gray-600 ml-4">
              <li>Clean, professional layout</li>
              <li>Good organization of experience</li>
              <li>Clear contact information</li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-medium text-gray-700">Areas to Improve:</h4>
            <ul class="list-disc list-inside text-gray-600 ml-4">
              <li>Add more quantifiable achievements</li>
              <li>Include more industry-specific keywords</li>
              <li>Make sure formatting is consistent throughout</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end">
        <button class="text-blue-600 hover:underline">View Full Review</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Dashboard page logic will go here
</script> 