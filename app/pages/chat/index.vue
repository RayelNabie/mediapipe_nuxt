<template>
  <div class="chat">
    <Card>
      <template #content>
        <ScrollPanel style="height: 400px;" class="chat__scroll">
          <div
            v-for="(msg, index) in messages" :key="index"
            :class="['chat__message', msg.sender === 'user' ? 'chat__message--user' : 'chat__message--bot']"
          >
            <Chip :label="msg.text" :class="msg.sender === 'user' ? 'chat__chip--user' : 'chat__chip--bot'" />
          </div>
        </ScrollPanel>

        <div class="p-inputgroup chat__inputgroup">
          <InputText
            v-model="input" placeholder="Typ je bericht..."
            class="chat__input"
            @keyup.enter="sendMessage"
          />
          <Button icon="pi pi-send" :disabled="loading || !input" @click="sendMessage" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Card, Chip, Button, InputText, ScrollPanel } from 'primevue';

const input = ref('');
const messages = ref([]);
const loading = ref(false);

async function sendMessage() {
  if (!input.value.trim()) return;

  messages.value.push({ sender: 'user', text: input.value });
  loading.value = true;
  console.log('Verzonden query:', input.value);

  try {
    const response = await fetch('http://localhost:8080/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: input.value }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const responseData = await response.json();
    const botText = responseData?.data?.output ?? 'Geen antwoord ontvangen.';
    messages.value.push({ sender: 'bot', text: botText });
  }
  catch (error) {
    console.error(error);
    messages.value.push({ sender: 'bot', text: 'Er is iets fout gegaan.' });
  }

  input.value = '';
  loading.value = false;
}
</script>

<style scoped lang="scss">
.chat {
  max-width: 48rem;
  margin: 0 auto;
  padding: 1rem;

  &__scroll {
    margin-bottom: 1rem;
  }

  &__message {
    display: flex;
    margin-bottom: 0.5rem;

    &--user {
      justify-content: flex-end;
    }

    &--bot {
      justify-content: flex-start;
    }
  }

  &__chip--user {
    background-color: var(--primary-color);
    color: #fff;
  }

  &__chip--bot {
    background-color: #e5e7eb;
    color: #111827;
  }

  &__inputgroup {
    display: flex;
    gap: 0.5rem;
  }

  &__input {
    flex: 1;
  }
}
</style>
