<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">
        {{ volunteer.id ? 'Edit Volunteer' : 'Add Volunteer' }}
      </h2>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Name Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            v-model="localVolunteer.name"
            type="text"
            placeholder="Enter volunteer name"
            :class="[
              'w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.name ? 'border-red-500' : 'border-gray-300'
            ]"
            @input="clearError('name')"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            v-model="localVolunteer.email"
            type="email"
            placeholder="Enter email address"
            :class="[
              'w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.email ? 'border-red-500' : 'border-gray-300'
            ]"
            @input="clearError('email')"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Status Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            v-model="localVolunteer.status"
            :class="[
              'w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.status ? 'border-red-500' : 'border-gray-300'
            ]"
            @change="clearError('status')"
          >
            <option disabled value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <p v-if="errors.status" class="text-red-500 text-sm mt-1">
            {{ errors.status }}
          </p>
        </div>

        <!-- Tasks Completed Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Tasks Completed
          </label>
          <input
            v-model.number="localVolunteer.tasksCompleted"
            type="number"
            min="0"
            placeholder="Number of tasks completed"
            :class="[
              'w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.tasksCompleted ? 'border-red-500' : 'border-gray-300'
            ]"
            @input="clearError('tasksCompleted')"
          />
          <p v-if="errors.tasksCompleted" class="text-red-500 text-sm mt-1">
            {{ errors.tasksCompleted }}
          </p>
        </div>

        <!-- Events Attended Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Events Attended
          </label>
          <input
            v-model.number="localVolunteer.eventsAttended"
            type="number"
            min="0"
            placeholder="Number of events attended"
            :class="[
              'w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.eventsAttended ? 'border-red-500' : 'border-gray-300'
            ]"
            @input="clearError('eventsAttended')"
          />
          <p v-if="errors.eventsAttended" class="text-red-500 text-sm mt-1">
            {{ errors.eventsAttended }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between pt-4">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{ isSubmitting ? 'Saving...' : (volunteer.id ? 'Update' : 'Save') }}
          </button>
          <button
            type="button"
            @click="$emit('cancel')"
            class="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from 'vue'

const props = defineProps({
  volunteer: {
    type: Object,
    default: () => ({
      id: null,
      name: '',
      email: '',
      status: '',
      tasksCompleted: '',
      eventsAttended: ''
    })
  }
})

const emit = defineEmits(['submit', 'cancel'])

const isSubmitting = ref(false)

const localVolunteer = reactive({
  id: null,
  name: '',
  email: '',
  status: '',
  tasksCompleted: 0,
  eventsAttended: 0
})

const errors = reactive({
  name: '',
  email: '',
  status: '',
  tasksCompleted: '',
  eventsAttended: ''
})

// Sync when props.volunteer changes
watch(
  () => props.volunteer,
  (newVal) => {
    if (newVal) {
      Object.keys(localVolunteer).forEach(key => {
        localVolunteer[key] = newVal[key] || (key === 'tasksCompleted' || key === 'eventsAttended' ? 0 : '')
      })
      clearAllErrors()
    }
  },
  { immediate: true, deep: true }
)

function clearError(field) {
  errors[field] = ''
}

function clearAllErrors() {
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}

function validateForm() {
  let isValid = true
  clearAllErrors()
  
  // Validate name
  if (!localVolunteer.name || localVolunteer.name.trim() === '') {
    errors.name = 'Name is required'
    isValid = false
  } else if (localVolunteer.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
    isValid = false
  } else if (localVolunteer.name.trim().length > 50) {
    errors.name = 'Name cannot exceed 50 characters'
    isValid = false
  }
  
  // Validate email
  if (!localVolunteer.email || localVolunteer.email.trim() === '') {
    errors.email = 'Email is required'
    isValid = false
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(localVolunteer.email.trim())) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }
  }
  
  // Validate status
  if (!localVolunteer.status) {
    errors.status = 'Status is required'
    isValid = false
  }
  
  // Validate tasks completed
  if (localVolunteer.tasksCompleted < 0) {
    errors.tasksCompleted = 'Tasks completed cannot be negative'
    isValid = false
  } else if (localVolunteer.tasksCompleted > 1000) {
    errors.tasksCompleted = 'Tasks completed cannot exceed 1000'
    isValid = false
  }
  
  // Validate events attended
  if (localVolunteer.eventsAttended < 0) {
    errors.eventsAttended = 'Events attended cannot be negative'
    isValid = false
  } else if (localVolunteer.eventsAttended > 100) {
    errors.eventsAttended = 'Events attended cannot exceed 100'
    isValid = false
  }
  
  return isValid
}

async function onSubmit() {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Format the data before emitting
    const formattedData = {
      id: localVolunteer.id,
      name: localVolunteer.name.trim(),
      email: localVolunteer.email.trim().toLowerCase(),
      status: localVolunteer.status,
      tasksCompleted: Number(localVolunteer.tasksCompleted) || 0,
      eventsAttended: Number(localVolunteer.eventsAttended) || 0
    }
    
    emit('submit', formattedData)
  } finally {
    isSubmitting.value = false
  }
}
</script>

