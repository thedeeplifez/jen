<template>
	<div class="flex min-h-screen">
		<SideBar />
		<div class="flex flex-col grow overflow-x-hidden">
			<div class="grow max-w-full">
				<slot />
				<BottomBar />
			</div>
		</div>
		<Toast />
		<NuxtLink :to="localePath('/')" v-if="route.path != '/'" class="!hidden md:!inline-block btn primary !fixed top-[1.5rem] right-[1.5rem] !rounded-full text-center" style="width:210px;">{{$t('new_expense')}}</NuxtLink>
		<NuxtLink :to="localePath('/')" v-if="route.path != '/'" class="flex items-center shadow-md justify-center md:hidden fixed bottom-[4.5rem] right-[1.5rem] rounded-[50%] bg-main text-white" style="width:42px;height:42px;">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
			</svg>
		</NuxtLink>
	</div>
</template>

<script setup>

const route = useRoute()
</script>