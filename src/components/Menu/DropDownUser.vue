<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="w-24 flex justify-center relative">
        <div class="flex items-center aspect-square overflow-hidden rounded-full bg-blue-100 w-2/5 min-w-[50px]">
          <img class="w-full" src="@/assets/img/maxion-logo.png">
        </div>
        <ChevronDownIcon class="absolute w-7 bottom-0 right-0" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
          <div @click="logout()"
            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
            Logout</div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import AuthenticationHandler from "@/api/authentication_handler";
import router from '@/router/index';
import { ref } from "vue";
import type { Ref } from "vue";

const is_loding: Ref<boolean> = ref(false)

const logout = async () => {
  is_loding.value = true;
  const auth = new AuthenticationHandler();
  const response = await auth.logout();
  router.push("/login");

}
</script>
