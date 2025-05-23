<template>
    <div>
        <section class="relative">
            <div
                class="flex items-center justify-between absolute top-6 left-3 w-[343px]"
            >
                <NuxtImg
                    src="/images/logo.png"
                    class="w-[64px] h-[18px] transform transition-transform duration-500 ease-in-out hover:scale-[0.9] cursor-pointer"
                    alt="Buddy Logo"
                />
                <Button
                    class="cursor-pointer w-[27px] h-[27px] bg-black/30 rounded-sm p-[4px] flex items-center justify-center hover:bg-[#354c48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#425F58]/50 transition"
                    aria-label="View notifications"
                >
                    <Icon
                        name="mdi:bell-outline"
                        class="bg-white w-[16px] h-[16px]"
                    />
                </Button>
            </div>
            <NuxtImg
                src="/images/cat-hero.png"
                class="w-full max-w-lg-[343px]"
            />
        </section>
    </div>
</template>

<script setup lang="ts"></script>
