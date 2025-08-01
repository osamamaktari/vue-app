<template>
  <div class="space-y-6">
    <!-- Header and Controls -->
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <!-- Search -->
        <div class="flex-1 max-w-md">
          <input
            v-model="search"
            type="text"
            placeholder="Search by donor name..."
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <!-- Filters -->
        <div class="flex flex-col sm:flex-row gap-3">
          <select 
            v-model="filterStatus" 
            class="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          
          <select 
            v-model="filterMethod" 
            class="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Methods</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Mobile Payment">Mobile Payment</option>
            <option value="Check">Check</option>
          </select>
          
          <button
            @click="$emit('new')"
            class="bg-blue-600 text-white px-6  rounded-full hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
          
            <span>Add Donation</span>
          </button>
        </div>
      </div>
      
      <!-- Summary Stats -->
      <div class="p-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-green-50 p-3 rounded-lg">
          <div class="text-sm text-green-600">Total Donations</div>
          <div class="text-xl font-bold text-green-800">{{ filteredDonations.length }}</div>
        </div>
        <div class="bg-blue-50 p-3 rounded-lg">
          <div class="text-sm text-blue-600">Total Amount</div>
          <div class="text-xl font-bold text-blue-800">{{ totalAmount.toLocaleString() }} YER</div>
        </div>
        <div class="bg-yellow-50 p-3 rounded-lg">
          <div class="text-sm text-yellow-600">Pending</div>
          <div class="text-xl font-bold text-yellow-800">{{ pendingCount }}</div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donor
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="donation in paginatedDonations"
              :key="donation.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ donation.donor }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 font-semibold">{{ donation.amount.toLocaleString() }} YER</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ donation.method }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(donation.date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  donation.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                ]">
                  {{ donation.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="$emit('edit', donation)"
                  class="text-blue-600 hover:text-blue-900 transition-colors"
                >
                  Edit
                </button>
                <button
                  @click="$emit('delete', donation.id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredDonations.length === 0" class="text-center py-12">
        <div class="text-gray-500 text-lg">No donations found</div>
        <div class="text-gray-400 text-sm mt-2">
          {{ search || filterStatus || filterMethod ? 'Try adjusting your filters' : 'Add your first donation to get started' }}
        </div>
      </div>
      
      <!-- Pagination -->
      <div v-if="filteredDonations.length > itemsPerPage" class="bg-gray-50 px-6 py-3 border-t">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredDonations.length) }} of {{ filteredDonations.length }} results
          </div>
          <div class="flex space-x-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage >= totalPages"
              class="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  donations: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['edit', 'new', 'delete'])

const search = ref('')
const filterStatus = ref('')
const filterMethod = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const filteredDonations = computed(() => {
  return props.donations.filter(donation => {
    const matchesSearch = donation.donor.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = filterStatus.value ? donation.status === filterStatus.value : true
    const matchesMethod = filterMethod.value ? donation.method === filterMethod.value : true
    
    return matchesSearch && matchesStatus && matchesMethod
  })
})

const paginatedDonations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredDonations.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredDonations.value.length / itemsPerPage.value)
})

const totalAmount = computed(() => {
  return filteredDonations.value.reduce((sum, donation) => sum + (donation.amount || 0), 0)
})

const pendingCount = computed(() => {
  return filteredDonations.value.filter(donation => donation.status === 'Pending').length
})

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

// Reset pagination when filters change
computed(() => {
  currentPage.value = 1
  return [search.value, filterStatus.value, filterMethod.value]
})
</script>

