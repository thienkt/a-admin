<script setup lang="ts">
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useToast } from 'vuestic-ui';
import { validators } from '@/utils';

const auth = useFirebaseAuth()!;

definePageMeta({
  layout: 'auth',
});

const { validate } = useForm('form');
const { push } = useRouter();
const { init } = useToast();
const route = useRoute();

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
});

const submit = () => {
  if (validate()) {
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        init({ message: "You've successfully logged in", color: 'success' });
        push({ name: 'dashboard' });
      })
      .catch(() => {
        init({
          message: 'Login failed. Please check your credentials and try again.',
          color: 'error',
        });
      });
  }
};

const loginWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then(() => {
      init({ message: "You've successfully logged in", color: 'success' });
      push({ name: route.query.redirect || 'dashboard' });
    })
    .catch(() => {
      init({
        message: 'Login failed. Please check your credentials and try again.',
        color: 'error',
      });
    });
};
</script>

<template>
  <VaForm ref="form" class="mb-10" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Log in</h1>

    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="Email"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Password"
        @click-append-inner.stop="
          isPasswordVisible.value = !isPasswordVisible.value
        "
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div
      class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between"
    >
      <VaCheckbox
        v-model="formData.keepLoggedIn"
        class="mb-2 sm:mb-0"
        label="Keep me signed in on this device"
      />
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> Login</VaButton>
    </div>
    <div class="flex justify-center mt-2">
      <VaButton class="w-full" color="secondary" @click="loginWithGoogle">
        Login with Google
      </VaButton>
    </div>
  </VaForm>
</template>
