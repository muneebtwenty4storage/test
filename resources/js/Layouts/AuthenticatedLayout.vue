<script setup lang="ts">
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';
import { UserPen, LogOut, ChevronDown } from 'lucide-vue-next';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"

const iconMap = {
    UserPen,
    LogOut,
};
type IconKeys = keyof typeof iconMap;

const showingNavigationDropdown = ref(false);

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from '@/Components/ui/menubar'

const components: { title: string; as?: string; icon: IconKeys; size: number; method?: Method; href: string; description: string }[] = [
    {
        title: 'Edit Profile',
        icon: 'UserPen',
        size: 28,
        href: route('profile.edit'),
        description: 'Easily update your profile information to keep your account current and personalized.',
    },
    {
        title: 'Logout',
        icon: 'LogOut',
        size: 24,
        href: route('logout'),
        description: 'Securely sign out of your account to protect your personal information.',
        method: 'post',
        as: 'button',
    },
];

</script>

<template>
    <SidebarProvider>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    <div>
        <div class="min-h-screen bg-gray-100">
            <nav class="border-b border-gray-100 bg-white">
                <!-- Primary Navigation Menu -->
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 justify-between">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="flex shrink-0 items-center">
                                <Link :href="route('dashboard')">
                                <ApplicationLogo class="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink :href="route('dashboard')" :active="route().current('dashboard')">
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>
                        <div class="hidden sm:ms-6 sm:flex sm:items-center">
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger>
                                        <Avatar class="h-[20px] w-[20px] mx-2">
                                            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar> {{ $page.props.auth.user.name }}&nbsp;
                                        <ChevronDown :size="16" />
                                    </MenubarTrigger>
                                    <MenubarContent>
                                        <template v-for="component in components" :key="component.title">
                                            <MenubarItem :inset="true">
                                                <Link :href="component.href" :method="component.method"
                                                    :as="component.as"
                                                    class="flex items-center space-x-3 text-left rounded-md">
                                                <component :is="iconMap[component.icon]" :size="component.size"
                                                    class="text-gray-600" />
                                                <div>
                                                    <div class="text-sm font-medium leading-none text-gray-900">{{
                                                        component.title }}</div>
                                                    <p class="hidden lg:block text-sm leading-snug text-gray-500">{{
                                                        component.description }}</p>
                                                </div>
                                                </Link>
                                            </MenubarItem>
                                            <MenubarSeparator v-if="component !== components[components.length - 1]" />
                                        </template>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </div>

                        <!-- Hamburger -->
                        <div class="-me-2 flex items-center sm:hidden">
                            <button @click="
                                showingNavigationDropdown =
                                !showingNavigationDropdown
                                "
                                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none">
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path :class="{
                                        hidden: showingNavigationDropdown,
                                        'inline-flex':
                                            !showingNavigationDropdown,
                                    }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                    <path :class="{
                                        hidden: !showingNavigationDropdown,
                                        'inline-flex':
                                            showingNavigationDropdown,
                                    }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{
                    block: showingNavigationDropdown,
                    hidden: !showingNavigationDropdown,
                }" class="sm:hidden">
                    <div class="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink :href="route('dashboard')" :active="route().current('dashboard')">
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="border-t border-gray-200 pb-1 pt-4">
                        <div class="px-4">
                            <div class="text-base font-medium text-gray-800">
                                {{ $page.props.auth.user.name }}
                            </div>
                            <div class="text-sm font-medium text-gray-500">
                                {{ $page.props.auth.user.email }}
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="route('profile.edit')">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header class="bg-white shadow" v-if="$slots.header">
                <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
