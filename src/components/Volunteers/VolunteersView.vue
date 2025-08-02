<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Volunteers Management</h1>
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-600">Loading volunteers...</span>
      </div>
      
      <!-- Main Content -->
      <div v-else>
        <ToastMessage :show="toast.show" :message="toast.message" />

        <VolunteerTable
          :volunteers="volunteers"
          @edit="editVolunteer"
          @new="openForm"
          @delete="deleteVolunteer"
          @restore="restoreVolunteer"
          @send-email="sendEmail"
          @send-campaign="sendCampaign"
        />

        <VolunteerForm
          v-if="showForm"
          :volunteer="form"
          @submit="handleSubmit"
          @cancel="cancelForm"
        />

        <!-- Email Campaign Modal -->
        <div v-if="showCampaignModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Send Email Campaign</h2>
            
            <form @submit.prevent="handleCampaignSubmit" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  v-model="campaignForm.subject"
                  type="text"
                  placeholder="Enter email subject"
                  class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  v-model="campaignForm.message"
                  rows="4"
                  placeholder="Enter your message"
                  class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Recipients
                </label>
                <select
                  v-model="campaignForm.recipients"
                  class="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active Volunteers Only</option>
                  <option value="all">All Volunteers</option>
                </select>
              </div>
              
              <div class="text-sm text-gray-600">
                This will send to {{ recipientCount }} volunteers
              </div>
              
              <div class="flex justify-between pt-4">
                <button
                  type="submit"
                  :disabled="isSendingCampaign"
                  class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {{ isSendingCampaign ? 'Sending...' : 'Send Campaign' }}
                </button>
                <button
                  type="button"
                  @click="closeCampaignModal"
                  class="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import VolunteerTable from './VolunteerTable.vue'
import VolunteerForm from './VolunteerForm.vue'
import ToastMessage from '../Donations/ToastMessage.vue'  
import { 
  fetchAllVolunteers, 
  addVolunteer, 
  updateVolunteer, 
  softDeleteVolunteer, 
  
} from '../../data/mockApi'

const volunteers = ref([])
const loading = ref(false)
const showForm = ref(false)
const showCampaignModal = ref(false)
const isSendingCampaign = ref(false)
const toast = ref({ show: false, message: '' })

const form = ref({
  id: null,
  name: '',
  email: '',
  status: '',
  tasksCompleted: 0,
  eventsAttended: 0
})

const campaignForm = ref({
  subject: '',
  message: '',
  recipients: 'active'
})

// Load volunteers from localStorage and mock API
onMounted(async () => {
  await loadVolunteers()
})

const recipientCount = computed(() => {
  if (campaignForm.value.recipients === 'active') {
    return volunteers.value.filter(v => v.status === 'active' && !v.isDeleted).length
  }
  return volunteers.value.filter(v => !v.isDeleted).length
})

async function loadVolunteers() {
  loading.value = true
  try {
    // Load from localStorage first
    const saved = localStorage.getItem('volunteers')
    if (saved) {
      volunteers.value = JSON.parse(saved)
    } else {
      // If no localStorage data, load from mock API
      const apiData = await fetchAllVolunteers()
      volunteers.value = apiData
      saveToLocalStorage()
    }
  } catch (error) {
    console.error('Error loading volunteers:', error)
    showToast('Error loading volunteers')
  } finally {
    loading.value = false
  }
}

function saveToLocalStorage() {
  try {
    localStorage.setItem('volunteers', JSON.stringify(volunteers.value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    showToast('Error saving data')
  }
}

function openForm() {
  resetForm()
  showForm.value = true
}

function editVolunteer(volunteer) {
  form.value = { ...volunteer }
  showForm.value = true
}

async function deleteVolunteer(volunteerId) {
  if (confirm('Are you sure you want to delete this volunteer? This action can be undone.')) {
    try {
      const index = volunteers.value.findIndex(v => v.id === volunteerId)
      if (index !== -1) {
        volunteers.value[index].isDeleted = true
        saveToLocalStorage()
        showToast('Volunteer deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting volunteer:', error)
      showToast('Error deleting volunteer')
    }
  }
}

async function restoreVolunteer(volunteerId) {
  try {
    const index = volunteers.value.findIndex(v => v.id === volunteerId)
    if (index !== -1) {
      volunteers.value[index].isDeleted = false
      saveToLocalStorage()
      showToast('Volunteer restored successfully')
    }
  } catch (error) {
    console.error('Error restoring volunteer:', error)
    showToast('Error restoring volunteer')
  }
}

function cancelForm() {
  resetForm()
  showToast('Operation cancelled')
}

function showToast(message) {
  toast.value = {
    message,
    show: true
  }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

function resetForm() {
  form.value = {
    id: null,
    name: '',
    email: '',
    status: '',
    tasksCompleted: 0,
    eventsAttended: 0
  }
  showForm.value = false
}

async function handleSubmit(formData) {
  try {
    if (formData.id) {
      // Update existing volunteer
      const index = volunteers.value.findIndex(v => v.id === formData.id)
      if (index !== -1) {
        volunteers.value[index] = { ...volunteers.value[index], ...formData }
        saveToLocalStorage()
        showToast('Volunteer updated successfully')
      }
    } else {
      // Add new volunteer
      const newVolunteer = {
        ...formData,
        id: Date.now() + Math.random(), // Simple ID generation
        isDeleted: false
      }
      volunteers.value.push(newVolunteer)
      saveToLocalStorage()
      showToast('Volunteer added successfully')
    }
    
    resetForm()
  } catch (error) {
    console.error('Error saving volunteer:', error)
    showToast('Error saving volunteer')
  }
}

function sendEmail(volunteer) {
  // Simulate sending individual email
  showToast(`Email sent to ${volunteer.name} (${volunteer.email})`)
}

function sendCampaign() {
  campaignForm.value = {
    subject: '',
    message: '',
    recipients: 'active'
  }
  showCampaignModal.value = true
}

function closeCampaignModal() {
  showCampaignModal.value = false
  campaignForm.value = {
    subject: '',
    message: '',
    recipients: 'active'
  }
}

async function handleCampaignSubmit() {
  isSendingCampaign.value = true
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const count = recipientCount.value
    showToast(`Campaign sent successfully to ${count} volunteers`)
    closeCampaignModal()
  } catch (error) {
    console.error('Error sending campaign:', error)
    showToast('Error sending campaign')
  } finally {
    isSendingCampaign.value = false
  }
}
</script>

