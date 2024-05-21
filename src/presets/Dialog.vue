<script lang="ts" setup>
import { ref, toRefs } from "vue"
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
	DialogTitle,
} from "@headlessui/vue"

const switchProps = withDefaults(
	defineProps<{
		disabled?: boolean
		close?: () => void
		open?: () => void
	}>(),
	{
		disabled: false,
		close: () => {},
		open: () => {},
	}
)
const { disabled } = toRefs(switchProps)

const isOpen = ref(false)

function closeModal() {
	isOpen.value = false
	switchProps.close()
}
function openModal() {
	isOpen.value = true
	switchProps.open()
}
</script>

<template>
	<button
		type="button"
		:disabled="disabled"
		@click="openModal"
		class="btn-modified"
	>
		<slot name="btn"></slot>
	</button>
	<TransitionRoot appear :show="isOpen && !disabled" as="div">
		<Dialog as="div" @close="isOpen = false" class="relative z-10">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-300 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 rounded-md bg-black/25 dark:bg-white/10" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div
					class="flex items-center justify-center min-h-full p-4 text-center"
				>
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95 -rotate-3"
						enter-to="opacity-100 scale-100"
						leave="duration-300 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95 rotate-3"
					>
						<DialogPanel
							class="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all duration-300 ease-in-out transform bg-gray-100 shadow-xl text-slate-600 dark:text-slate-200 dark:bg-gray-800 rounded-2xl"
						>
							<DialogTitle as="h3" class="text-lg font-bold leading-6">
								<slot name="title"></slot>
							</DialogTitle>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									<slot name="content"></slot>
								</p>
							</div>

							<div class="mt-4">
								<button
									type="button"
									class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
									@click="closeModal"
								>
									<slot name="confirm"></slot>
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<style lang="postcss" scoped>
.btn-modified {
	@apply inline-flex items-center justify-center px-3 py-1
  border-2 rounded border-slate-400 dark:border-slate-500
  hover:bg-slate-200 dark:hover:bg-slate-600
  bg-green-50 dark:bg-green-900 hover:border-green-400 dark:hover:border-green-500
  transition-all ease-in-out duration-300 outline-none select-none whitespace-nowrap;
}
</style>
