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
            placeholder="Search by name or email..."
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <!-- Filters and Actions -->
        <div class="flex flex-col sm:flex-row gap-3">
          <select 
            v-model="filterStatus" 
            class="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <select 
            v-model="viewMode" 
            class="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active Volunteers</option>
            <option value="deleted">Deleted Volunteers</option>
            <option value="all">All Volunteers</option>
          </select>
          
          <button
            @click="$emit('new')"
            class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
           
            <span>Add Volunteer</span>
          </button>
          
          <button
            @click="$emit('send campaign')"
            class="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
        
            <span>Send Campaign</span>
          </button>
        </div>
      </div>
      
      <!-- Summary Stats -->
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div class="bg-blue-50 p-3 rounded-lg">
          <div class="text-sm text-blue-600">Total Volunteers</div>
          <div class="text-xl font-bold text-blue-800">{{ filteredVolunteers.length }}</div>
        </div>
        <div class="bg-green-50 p-3 rounded-lg">
          <div class="text-sm text-green-600">Active</div>
          <div class="text-xl font-bold text-green-800">{{ activeCount }}</div>
        </div>
        <div class="bg-yellow-50 p-3 rounded-lg">
          <div class="text-sm text-yellow-600">Total Tasks</div>
          <div class="text-xl font-bold text-yellow-800">{{ totalTasks }}</div>
        </div>
        <div class="bg-purple-50 p-3 rounded-lg">
          <div class="text-sm text-purple-600">Total Events</div>
          <div class="text-xl font-bold text-purple-800">{{ totalEvents }}</div>
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
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tasks
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Events
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="volunteer in paginatedVolunteers"
              :key="volunteer.id"
              :class="[
                'hover:bg-gray-50 transition-colors',
                volunteer.isDeleted ? 'bg-red-50 opacity-75' : ''
              ]"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm font-medium text-gray-900">
                    {{ volunteer.name }}
                    <span v-if="volunteer.isDeleted" class="ml-2 text-xs text-red-500">(Deleted)</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ volunteer.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  volunteer.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                ]">
                  {{ volunteer.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ volunteer.tasksCompleted }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ volunteer.eventsAttended }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <template v-if="!volunteer.isDeleted">
                  <button
                    @click="$emit('edit', volunteer)"
                    class="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    @click="$emit('delete', volunteer.id)"
                    class="text-red-600 hover:text-red-900 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    @click="$emit('send-email', volunteer)"
                    class="text-green-600 hover:text-green-900 transition-colors"
                  >
                    Email
                  </button>
                </template>
                <template v-else>
                  <button
                    @click="$emit('restore', volunteer.id)"
                    class="text-green-600 hover:text-green-900 transition-colors"
                  >
                    Restore
                  </button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredVolunteers.length === 0" class="text-center py-12">
        <div class="text-gray-500 text-lg">
          {{ viewMode === 'deleted' ? 'No deleted volunteers found' : 'No volunteers found' }}
        </div>
        <div class="text-gray-400 text-sm mt-2">
          {{ search || filterStatus ? 'Try adjusting your filters' : 'Add your first volunteer to get started' }}
        </div>
      </div>
      
      <!-- Pagination -->
      <div v-if="filteredVolunteers.length > itemsPerPage" class="bg-gray-50 px-6 py-3 border-t">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredVolunteers.length) }} of {{ filteredVolunteers.length }} results
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
import { ref, computed, watch } from 'vue'

const props = defineProps({
  volunteers: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['edit', 'new', 'delete', 'restore', 'send-email', 'send-campaign'])

const search = ref('')
const filterStatus = ref('')
const viewMode = ref('active') 
const currentPage = ref(1)
const itemsPerPage = ref(10)

const filteredVolunteers = computed(() => {
  let filtered = props.volunteers

  // Filter by view mode
  if (viewMode.value === 'active') {
    filtered = filtered.filter(v => !v.isDeleted)
  } else if (viewMode.value === 'deleted') {
    filtered = filtered.filter(v => v.isDeleted)
  }
  // 'all' shows everything

  // Filter by search
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    filtered = filtered.filter(volunteer => 
      volunteer.name.toLowerCase().includes(searchLower) ||
      volunteer.email.toLowerCase().includes(searchLower)
    )
  }

  // Filter by status
  if (filterStatus.value) {
    filtered = filtered.filter(volunteer => volunteer.status === filterStatus.value)
  }

  return filtered
})

const paginatedVolunteers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredVolunteers.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredVolunteers.value.length / itemsPerPage.value)
})

const activeCount = computed(() => {
  return filteredVolunteers.value.filter(v => v.status === 'active' && !v.isDeleted).length
})

const totalTasks = computed(() => {
  return filteredVolunteers.value.reduce((sum, v) => sum + (v.tasksCompleted || 0), 0)
})

const totalEvents = computed(() => {
  return filteredVolunteers.value.reduce((sum, v) => sum + (v.eventsAttended || 0), 0)
})

// Reset pagination when filters change
watch([search, filterStatus, viewMode], () => {
  currentPage.value = 1
})
</script>

