<template>
 <div class= " bg-purple-900 border-b border-gray-200 px-4 py-2 flex items-center justify-between w-full shadow-sm sticky top-0 z-50 ">
  <!-- Left: Notification Icon -->
  <div class="flex items-center text-white hover:text-gray-200">
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </button>
  </div>

  <!-- Middle: Search input -->
  <div class="flex-1 max-w-md mx-4">
    <div class="relative">
      <input type="text" placeholder="Search..."
        class="placeholder-gray-300 w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-gray-300 focus:outline-none" />
      <div class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5a7.5 7.5 0 010 14.15z" />
        </svg>
      </div>
    </div>
  </div>

  <!-- Right: Icon with text under -->


  <div class="flex flex-row  gap-5 "
  >

  <!-- darkmode icon-->
    <div class=" items-center text-white hover:text-gray-200">
    <button>
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>
    </button>

  </div>
<!-- Admin icon -->
     <div class=" flex flex-col text-white hover:text-gray-200"> 
    <button>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

    </button> 
  </div> 
  </div>
</div>

</template>


