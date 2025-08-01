<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- <h1 class="text-3xl font-bold text-gray-900 mb-6">Donations Management</h1> -->
      
      <ToastMessage :show="toast.show" :message="toast.message" :type="toast.type" />

      <DonationTable
        :donations="donations"
        @edit="editDonation"
        @new="openForm"
        @delete="deleteDonation"
      />

      <DonationForm
        v-if="showForm"
        :form="form"
        @submit="handleSubmit"
        @cancel="cancelForm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import DonationTable from './DonationTable.vue'
import DonationForm from './DonationForm.vue'
import ToastMessage from './ToastMessage.vue'

const donations = ref([])
const showForm = ref(false)
const toast = ref({ show: false, message: '', type: 'success' })

const form = ref({
  id: null,
  donor: '',
  amount: '',
  method: '',
  date: '',
  status: ''
})

// Load donations from localStorage on component mount
onMounted(() => {
  loadDonations()
})

// Watch donations array and save to localStorage whenever it changes
watch(donations, (newDonations) => {
  saveDonations(newDonations)
}, { deep: true })

function loadDonations() {
  try {
    const saved = localStorage.getItem('donations')
    if (saved) {
      const parsedDonations = JSON.parse(saved)
      // Ensure each donation has a valid structure
      donations.value = parsedDonations.filter(donation => 
        donation && 
        typeof donation === 'object' && 
        donation.id !== undefined
      )
    } else {
      donations.value = []
    }
  } catch (error) {
    console.error('Error loading donations from localStorage:', error)
    donations.value = []
    showToast('Error loading saved donations', 'error')
  }
}

function saveDonations(donationsData) {
  try {
    localStorage.setItem('donations', JSON.stringify(donationsData))
  } catch (error) {
    console.error('Error saving donations to localStorage:', error)
    showToast('Error saving donations', 'error')
  }
}

function openForm() {
  resetForm()
  showForm.value = true
}

function editDonation(donation) {
  form.value = { ...donation }
  showForm.value = true
}

function deleteDonation(donationId) {
  if (confirm('Are you sure you want to delete this donation?')) {
    const index = donations.value.findIndex(d => d.id === donationId)
    if (index !== -1) {
      donations.value.splice(index, 1)
      showToast('Donation deleted successfully', 'success')
    }
  }
}

function cancelForm() {
  resetForm()
  showToast('Operation cancelled', 'info')
}

function showToast(message, type = 'success') {
  toast.value = {
    message,
    type,
    show: true
  }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

function resetForm() {
  form.value = {
    id: null,
    donor: '',
    amount: '',
    method: '',
    date: '',
    status: ''
  }
  showForm.value = false
}

function handleSubmit(formData) {
  try {
    if (formData.id) {
      // Update existing donation
      const index = donations.value.findIndex(d => d.id === formData.id)
      if (index !== -1) {
        donations.value[index] = { ...formData }
        showToast('Donation updated successfully', 'success')
      } else {
        showToast('Error: Donation not found', 'error')
        return
      }
    } else {
      // Add new donation
      const newDonation = {
        ...formData,
        id: Date.now() + Math.random() // Ensure unique ID
      }
      donations.value.push(newDonation)
      showToast('Donation added successfully', 'success')
    }
    
    resetForm()
  } catch (error) {
    console.error('Error handling form submission:', error)
    showToast('Error saving donation', 'error')
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>

