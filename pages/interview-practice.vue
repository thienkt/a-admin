<script setup lang="ts">
import { ref } from 'vue';

interface Question {
  id: number;
  question: string;
  category: string;
}

interface Evaluation {
  score: number;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

interface AnswerItem {
  question: Question;
  answer: string;
  evaluation: Evaluation | null;
}

const languageOptions = [
  { value: 'en', text: 'English' },
  { value: 'vi', text: 'Tiếng Việt' },
  { value: 'zh', text: '中文' },
  { value: 'ja', text: '日本語' },
  { value: 'ko', text: '한국어' },
];

const loading = ref(false);
const jdInputMethod = ref('text');
const jdText = ref('');
const pdfContent = ref('');
const file = ref<File[]>([]);
const showPdfPreview = ref(false);
const language = ref(
  languageOptions.length > 0
    ? languageOptions[0]
    : { value: 'en', text: 'English' },
);
const questions = ref<Question[]>([]);

// New refs to store answers for all questions
const answers = ref<Record<number, string>>({});
const codeLanguages = ref<Record<number, string>>({});
const evaluations = ref<Record<number, Evaluation | null>>({});

// Track whether we're in answering or evaluation mode
const isAnsweringPhase = ref(true);

const error = ref('');
const success = ref('');
const interviewHistory = ref<AnswerItem[]>([]);

const generateQuestions = async () => {
  try {
    loading.value = true;
    error.value = '';
    success.value = '';

    if (jdInputMethod.value === 'file' && file.value.length > 0) {
      // Upload file
      const formData = new FormData();
      formData.append('file', file.value[0]);
      formData.append('language', language.value.text);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Store questions and PDF content
      questions.value = result.questions;
      if (result.pdfContent) {
        pdfContent.value = result.pdfContent;
      }
    } else if (jdInputMethod.value === 'text' && jdText.value) {
      // Send text directly
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jdText: jdText.value,
          language: language.value.text,
        }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      questions.value = result.questions;
      // For text input, we use the provided text
      pdfContent.value = jdText.value;
    } else {
      throw new Error(
        'Please enter a Job Description or Curriculum Vitae or upload a PDF file',
      );
    }

    // Initialize empty answers and code languages for each question
    questions.value.forEach((q) => {
      answers.value[q.id] = '';
      codeLanguages.value[q.id] = 'text';
    });

    isAnsweringPhase.value = true;

    // Show success message
    if (questions.value.length > 0) {
      const source =
        jdInputMethod.value === 'file'
          ? 'PDF'
          : 'Job Description or Curriculum Vitae';
      success.value = `Successfully generated ${questions.value.length} questions from ${source}. Please answer all questions before submitting.`;
    }
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : 'Failed to generate questions';
    success.value = '';
  } finally {
    loading.value = false;
  }
};

const evaluateAnswers = async () => {
  if (Object.values(answers.value).some((answer) => !answer.trim())) {
    error.value = 'Please answer all questions before submitting';
    return;
  }

  try {
    loading.value = true;
    error.value = '';

    // Use pdfContent if available, otherwise fallback to jdText
    const jobDescContent = pdfContent.value || jdText.value;

    // Send all questions and answers in a single request
    const response = await fetch('/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questions: questions.value,
        answers: answers.value,
        jdText: jobDescContent,
        language: language.value.text,
      }),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    // Store all evaluations from the bulk response
    evaluations.value = result.evaluations;

    // Switch to evaluation phase
    isAnsweringPhase.value = false;

    // Update interview history with all QA pairs
    interviewHistory.value = questions.value.map((question) => ({
      question,
      answer: answers.value[question.id],
      evaluation: evaluations.value[question.id],
    }));

    success.value = 'All answers have been evaluated successfully!';
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : 'Failed to evaluate answers';
  } finally {
    loading.value = false;
  }
};

// Reset the interview
const resetInterview = () => {
  jdText.value = '';
  pdfContent.value = '';
  file.value = [];
  questions.value = [];
  answers.value = {};
  codeLanguages.value = {};
  evaluations.value = {};
  isAnsweringPhase.value = true;
  interviewHistory.value = [];
  error.value = '';
  success.value = '';
};

const startNewInterview = () => {
  // Keep JD/CV data but reset answers and questions
  questions.value = [];
  answers.value = {};
  codeLanguages.value = {};
  evaluations.value = {};
  isAnsweringPhase.value = true;
  interviewHistory.value = [];
  error.value = '';
  success.value = '';
};
</script>

<template>
  <h1
    class="page-title text-[32px] md:text-5xl font-bold leading-9 md:leading-[56px] max-sm:mt-6 mb-6 md:mb-4"
  >
    Interview Practice
  </h1>

  <!-- Error display -->
  <VaAlert v-if="error" class="mb-4" color="danger" closeable>
    {{ error }}
  </VaAlert>

  <!-- Success message -->
  <VaAlert v-if="success" class="mb-4" color="success" closeable>
    {{ success }}
  </VaAlert>

  <section class="flex flex-col gap-4">
    <!-- JD Input Section -->
    <VaCard v-if="questions.length === 0" class="w-full">
      <VaCardTitle>
        <h2 class="card-title text-secondary font-bold uppercase text-xl">
          Enter Job Description or Curriculum Vitae
        </h2>
      </VaCardTitle>
      <VaCardContent>
        <div class="mb-4">
          <VaRadio
            v-model="jdInputMethod"
            option="text"
            label="Enter Job Description or Curriculum Vitae text"
            class="mb-2"
          />
          <VaRadio
            v-model="jdInputMethod"
            option="file"
            label="Upload PDF file"
          />
        </div>

        <div v-if="jdInputMethod === 'text'" class="mb-4">
          <VaTextarea
            v-model="jdText"
            placeholder="Paste your Job Description or Curriculum Vitae here..."
            rows="8"
            class="w-full"
            autosize
          />
        </div>

        <div v-else class="mb-4">
          <VaFileUpload v-model="file" file-types="pdf" class="py-2" dropzone />

          <!-- Preview Button -->
          <div v-if="file.length > 0" class="mt-2 flex items-center">
            <VaButton
              preset="secondary"
              size="small"
              icon="visibility"
              class="mr-2"
              @click="showPdfPreview = !showPdfPreview"
            >
              Preview PDF
            </VaButton>
            <span class="text-sm text-gray-600">{{ file[0]?.name }}</span>
          </div>
        </div>

        <div class="mb-4">
          <VaSelect
            v-model="language"
            :options="languageOptions"
            label="Interview Language"
            label-by="text"
            track-by="value"
            class="w-full md:w-1/2"
          />
        </div>
      </VaCardContent>
      <VaCardActions>
        <VaButton
          :loading="loading"
          preset="primary"
          @click="generateQuestions"
        >
          Generate Interview Questions
        </VaButton>
      </VaCardActions>
    </VaCard>

    <!-- Questions & Answers Phase -->
    <div v-else-if="isAnsweringPhase" class="w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title text-secondary font-bold uppercase text-xl">
          Answer all questions below
        </h2>
        <VaButton
          :loading="loading"
          preset="primary"
          :disabled="Object.values(answers).some((answer) => !answer.trim())"
          @click="evaluateAnswers"
        >
          Submit All Answers
        </VaButton>
      </div>

      <!-- Questions List -->
      <div class="flex flex-col gap-4">
        <VaCard v-for="question in questions" :key="question.id" class="w-full">
          <VaCardContent>
            <!-- Question Header -->
            <div class="flex justify-between mb-4">
              <VaBadge color="primary">{{ question.category }}</VaBadge>
              <VaBadge color="info">Question {{ question.id }}</VaBadge>
            </div>

            <!-- Question -->
            <h3 class="text-xl font-medium mb-4">{{ question.question }}</h3>

            <!-- Answer Input -->
            <div class="mt-4">
              <div class="flex justify-between items-center w-full mb-2">
                <h4 class="font-medium">Your Answer</h4>
              </div>
              <VaTextarea
                v-model="answers[question.id]"
                :min-rows="6"
                placeholder="Type your answer here..."
                class="w-full font-mono"
                autosize
              />
            </div>
          </VaCardContent>
        </VaCard>
      </div>

      <div class="flex justify-center mt-6">
        <VaButton
          :loading="loading"
          preset="primary"
          :disabled="Object.values(answers).some((answer) => !answer.trim())"
          @click="evaluateAnswers"
        >
          Submit All Answers
        </VaButton>
      </div>
    </div>

    <!-- Evaluation Results Phase -->
    <div v-else class="w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title text-secondary font-bold uppercase text-xl">
          Evaluation Results
        </h2>
        <VaButton color="secondary" @click="startNewInterview">
          Start New Questions
        </VaButton>
      </div>

      <!-- Results List -->
      <div class="flex flex-col gap-4">
        <VaCard v-for="question in questions" :key="question.id" class="w-full">
          <VaCardTitle>
            <div class="flex justify-between w-full">
              <h3 class="font-medium">
                Question {{ question.id }}: {{ question.category }}
              </h3>
              <VaBadge
                :color="
                  evaluations[question.id]?.score >= 7
                    ? 'success'
                    : evaluations[question.id]?.score >= 5
                      ? 'warning'
                      : 'danger'
                "
                class="ml-2"
              >
                {{ evaluations[question.id]?.score }}/10
              </VaBadge>
            </div>
          </VaCardTitle>
          <VaCardContent>
            <p class="font-medium mb-2">{{ question.question }}</p>

            <!-- Answer -->
            <VaCard class="mb-4 bg-gray-100" flat>
              <VaCardContent>
                <h4 class="font-medium mb-1">Your Answer:</h4>
                <pre class="whitespace-pre-wrap">{{
                  answers[question.id]
                }}</pre>
              </VaCardContent>
            </VaCard>

            <!-- Evaluation details -->
            <div v-if="evaluations[question.id]" class="mt-4">
              <div class="flex items-center mb-4">
                <VaProgressCircle
                  :model-value="evaluations[question.id].score * 10"
                  :color="
                    evaluations[question.id].score >= 7
                      ? 'success'
                      : evaluations[question.id].score >= 5
                        ? 'warning'
                        : 'danger'
                  "
                  class="mr-4"
                >
                  <template #default>
                    <span class="text-2xl font-bold"
                      >{{ evaluations[question.id].score }}/10</span
                    >
                  </template>
                </VaProgressCircle>
                <div class="ml-4 flex-1">
                  <p class="mb-2">{{ evaluations[question.id].feedback }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <VaCard bordered>
                  <VaCardTitle>
                    <h4 class="font-medium text-success">Strengths</h4>
                  </VaCardTitle>
                  <VaCardContent>
                    <VaList>
                      <VaListItem
                        v-for="(strength, index) in evaluations[question.id]
                          .strengths"
                        :key="`strength-${index}`"
                      >
                        <VaListItemLabel>
                          <VaIcon
                            name="check_circle"
                            color="success"
                            class="mr-2"
                          />
                          {{ strength }}
                        </VaListItemLabel>
                      </VaListItem>
                    </VaList>
                  </VaCardContent>
                </VaCard>
                <VaCard bordered>
                  <VaCardTitle>
                    <h4 class="font-medium text-danger">
                      Areas for Improvement
                    </h4>
                  </VaCardTitle>
                  <VaCardContent>
                    <VaList>
                      <VaListItem
                        v-for="(weakness, index) in evaluations[question.id]
                          .weaknesses"
                        :key="`weakness-${index}`"
                      >
                        <VaListItemLabel>
                          <VaIcon name="warning" color="danger" class="mr-2" />
                          {{ weakness }}
                        </VaListItemLabel>
                      </VaListItem>
                    </VaList>
                  </VaCardContent>
                </VaCard>
              </div>

              <VaCard bordered>
                <VaCardTitle>
                  <h4 class="font-medium">Recommendation</h4>
                </VaCardTitle>
                <VaCardContent>
                  <p>{{ evaluations[question.id].recommendation }}</p>
                </VaCardContent>
              </VaCard>
            </div>
          </VaCardContent>
        </VaCard>
      </div>

      <!-- Reset Button -->
      <div class="mt-6 flex justify-between">
        <VaButton color="danger" @click="resetInterview">
          Start Completely New Interview
        </VaButton>
        <VaButton color="secondary" @click="startNewInterview">
          Generate New Questions with Same JD/CV
        </VaButton>
      </div>
    </div>
  </section>
</template>
