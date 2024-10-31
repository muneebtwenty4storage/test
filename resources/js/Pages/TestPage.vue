<script setup>
import { onMounted, ref } from 'vue';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/Components/ui/tooltip'
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '@/Components/ui/avatar';
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarFooter,
    SidebarRail,
    SidebarInset,
    SidebarTrigger,
    SidebarMenuAction
} from '@/Components/ui/sidebar';
import { Separator } from '@/Components/ui/separator'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup
} from '@/Components/ui/dropdown-menu';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/Components/ui/collapsible';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from '@/Components/ui/breadcrumb';
import { ChevronRight, LayoutDashboard, Settings, ShieldCheck, ChevronsUpDown, MoreHorizontal, Plus, Sparkles, LogOut, Trash2, BadgeCheck, Bell, CreditCard, Folder, Forward } from 'lucide-vue-next';

const teams = ref([
    { name: 'Team Alpha', logo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', plan: 'Pro' },
    { name: 'Team Beta', logo: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', plan: 'Standard' },
    { name: 'Team Gamma', logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', plan: 'Basic' },
]);

const activeTeam = ref({});
onMounted(() => {
    if (teams.value.length > 0) {
        activeTeam.value = teams.value[0]; // Select the first team
    }
});

const setActiveTeam = (team) => {
    activeTeam.value = team;
};

const navMain = ref([
    {
        title: 'Dashboard',
        isActive: true,
        icon: 'LayoutDashboard',
        items: [
            { title: 'Overview', url: '/dashboard/overview' },
            { title: 'Analytics', url: '/dashboard/analytics' },
        ],
    },
    {
        title: 'Projects',
        isActive: false,
        icon: 'ShieldCheck',
        items: [
            { title: 'All Projects', url: '/projects/all' },
            { title: 'My Projects', url: '/projects/mine' },
        ],
    },
    {
        title: 'Settings',
        isActive: false,
        icon: 'Settings',
        items: [
            { title: 'General', url: '/settings/general' },
            { title: 'Profile', url: '/settings/profile' },
        ],
    },
]);
const iconMap = {
    LayoutDashboard: LayoutDashboard, // Assuming these components are imported
    ShieldCheck: ShieldCheck,
    Settings: Settings,
};
const projects = ref([
    { name: 'Description of Project', url: '/projects/a', icon: 'project-icon-component-1' },
    { name: 'About Project', url: '/projects/b', icon: 'project-icon-component-2' },
    { name: 'Details of Project', url: '/projects/c', icon: 'project-icon-component-3' },
]);

const user = ref({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
});


</script>

<template>
    <SidebarProvider>
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg"
                                    :class="{ 'data-[state=open]:bg-sidebar-accent': true, 'data-[state=open]:text-sidebar-accent-foreground': true }">
                                    <div
                                        class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <Avatar class="h-[24px] w-[24px] rounded-sm border">
                                            <AvatarImage v-if="activeTeam.logo" :src="activeTeam.logo"
                                                alt="@radix-vue" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{{ activeTeam.name }}</span>
                                        <span class="truncate text-xs">{{ activeTeam.plan }}</span>
                                    </div>
                                    <ChevronsUpDown class="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                align="start" side="bottom" :sideOffset=4>
                                <DropdownMenuLabel class="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
                                <DropdownMenuItem v-for="(team, index) in teams" :key="team.name"
                                    @click="setActiveTeam(team)" class="gap-2 p-2">
                                    <div class="flex size-6 items-center justify-center rounded-sm border">
                                        <Avatar class="h-[24px] w-[24px] rounded-sm border">
                                            <AvatarImage :src="team.logo" alt="@radix-vue" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    {{ team.name }}
                                    <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem class="gap-2 p-2">
                                    <div
                                        class="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <Plus class="size-4" />
                                    </div>
                                    <div class="font-medium text-muted-foreground">Add team</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Administration</SidebarGroupLabel>
                    <SidebarMenu>
                        <Collapsible v-for="item in navMain" :key="item.title" :defaultOpen="item.isActive"
                            class="group/collapsible">
                            <SidebarMenuItem>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    <component :is="iconMap[item.icon]" />

                                                    <span>{{ item.title }}</span>
                                                    <ChevronRight
                                                        class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {{ item.title }}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                                            <SidebarMenuSubButton asChild>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <a :href="subItem.url">
                                                                <span>{{ subItem.title }}</span>
                                                            </a>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {{ subItem.title }}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup class="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in projects" :key="item.name">
                            <SidebarMenuButton asChild>
                                <a :href="item.url">
                                    <component :is="item.icon" />
                                    <span>{{ item.name }}</span>
                                </a>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                        <MoreHorizontal />
                                        <span class="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="w-48 rounded-lg" side="bottom" align="end">
                                    <DropdownMenuItem>
                                        <Folder class="text-muted-foreground" />
                                        <span>View Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Forward class="text-muted-foreground" />
                                        <span>Share Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Trash2 class="text-muted-foreground" />
                                        <span>Delete Project</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton class="text-sidebar-foreground/70">
                                <MoreHorizontal class="text-sidebar-foreground/70" />
                                <span>More</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg"
                                    :class="{ 'data-[state=open]:bg-sidebar-accent': true, 'data-[state=open]:text-sidebar-accent-foreground': true }">
                                    <Avatar class="h-8 w-8 rounded-lg">
                                        <AvatarImage :src="user.avatar" :alt="user.name" />
                                        <AvatarFallback class="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{{ user.name }}</span>
                                        <span class="truncate text-xs">{{ user.email }}</span>
                                    </div>
                                    <ChevronsUpDown class="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom" align="end" :sideOffset=4>
                                <DropdownMenuLabel class="p-0 font-normal">
                                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar class="h-8 w-8 rounded-lg">
                                            <AvatarImage :src="user.avatar" :alt="user.name" />
                                            <AvatarFallback class="rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                        <div class="grid flex-1 text-left text-sm leading-tight">
                                            <span class="truncate font-semibold">{{ user.name }}</span>
                                            <span class="truncate text-xs">{{ user.email }}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
        <SidebarInset>
            <header
                class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div class="flex items-center gap-2 px-4">
                    <SidebarTrigger class="-ml-1" />
                    <Separator orientation="vertical" class="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem class="hidden md:block">
                                <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator class="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div class="aspect-video rounded-xl bg-muted/50" />
                    <div class="aspect-video rounded-xl bg-muted/50" />
                    <div class="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50" />
            </div>
        </SidebarInset>
    </SidebarProvider>
</template>
