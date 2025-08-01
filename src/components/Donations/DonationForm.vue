<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">
        {{ localForm.id ? 'Edit Donation' : 'Add Donation' }}
      </h2>

      <form @submit.prevent="onSubmit" class="space-y-3">
        <!-- Donor Name -->
        <div>
          <input
            v-model="localForm.donor"
            type="text"
            placeholder="Donor Name"
            :class="[
              'w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.donor ? 'border-red-500' : 'border-gray-300'
            ]"
            @input="clearError('donor')"
          />
          <p v-if="errors.donor" class="text-red-500 text-sm mt-1">
            {{ errors.donor }}
          </p>
        </div>

        <!-- Amount -->
        <div>
          <input
            v-model="localForm.amount"
            type="number"
            placeholder="Amount"
            min="0.01"
            step="0.01"
            :class="[
              'w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.amount ? 'border-red-500' : 'border-gray-300'
            ]"
            @input="clearError('amount')"
          />
          <p v-if="errors.amount" class="text-red-500 text-sm mt-1">
            {{ errors.amount }}
          </p>
        </div>

        <!-- Payment Method -->
        <div>
          <select
            v-model="localForm.method"
            :class="[
              'w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.method ? 'border-red-500' : 'border-gray-300'
            ]"
            @change="clearError('method')"
          >
            <option disabled value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Mobile Payment">Mobile Payment</option>
            <option value="Check">Check</option>
          </select>
          <p v-if="errors.method" class="text-red-500 text-sm mt-1">
            {{ errors.method }}
          </p>
        </div>

        <!-- Date -->
        <div>
          <input
            v-model="localForm.date"
            type="date"
            :class="[
              'w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.date ? 'border-red-500' : 'border-gray-300'
            ]"
            @input="clearError('date')"
          />
          <p v-if="errors.date" class="text-red-500 text-sm mt-1">
            {{ errors.date }}
          </p>
        </div>

        <!-- Status -->
        <div>
          <select
            v-model="localForm.status"
            :class="[
              'w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
              errors.status ? 'border-red-500' : 'border-gray-300'
            ]"
            @change="clearError('status')"
          >
            <option disabled value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          <p v-if="errors.status" class="text-red-500 text-sm mt-1">
            {{ errors.status }}
          </p>
        </div>

        <div class="flex justify-between pt-4">
          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {{ localForm.id ? 'Update' : 'Save' }}
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
import { reactive, watch } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    default: () => ({
      id: null,
      donor: '',
      amount: '',
      method: '',
      date: '',
      status: ''
    })
  }
})

const emit = defineEmits(['submit', 'cancel'])

const localForm = reactive({
  id: null,
  donor: '',
  amount: '',
  method: '',
  date: '',
  status: ''
})

const errors = reactive({
  donor: '',
  amount: '',
  method: '',
  date: '',
  status: ''
})

// Sync when props.form changes
watch(
  () => props.form,
  (newVal) => {
    if (newVal) {
      Object.keys(localForm).forEach(key => {
        localForm[key] = newVal[key] || ''
      })
      // Clear errors when form changes
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
  
  // Validate donor name
  if (!localForm.donor || localForm.donor.trim() === '') {
    errors.donor = 'Donor name is required'
    isValid = false
  } else if (localForm.donor.trim().length < 2) {
    errors.donor = 'Donor name must be at least 2 characters'
    isValid = false
  }
  
  // Validate amount
  if (!localForm.amount) {
    errors.amount = 'Amount is required'
    isValid = false
  } else {
    const amount = parseFloat(localForm.amount)
    if (isNaN(amount) || amount <= 0) {
      errors.amount = 'Amount must be a positive number'
      isValid = false
    } else if (amount > 1000000) {
      errors.amount = 'Amount cannot exceed 1,000,000'
      isValid = false
    }
  }
  
  // Validate payment method
  if (!localForm.method) {
    errors.method = 'Payment method is required'
    isValid = false
  }
  
  // Validate date
  if (!localForm.date) {
    errors.date = 'Date is required'
    isValid = false
  } else {
    const selectedDate = new Date(localForm.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (isNaN(selectedDate.getTime())) {
      errors.date = 'Please enter a valid date'
      isValid = false
    } else if (selectedDate > today) {
      errors.date = 'Date cannot be in the future'
      isValid = false
    }
  }
  
  // Validate status
  if (!localForm.status) {
    errors.status = 'Status is required'
    isValid = false
  }
  
  return isValid
}

function onSubmit() {
  if (!validateForm()) {
    return
  }
  
  // Format the data before emitting
  const formattedData = {
    id: localForm.id,
    donor: localForm.donor.trim(),
    amount: parseFloat(localForm.amount),
    method: localForm.method,
    date: localForm.date,
    status: localForm.status
  }
  
  emit('submit', formattedData)
}
</script>

