<template>
  <div class="flex flex-col gap-20 pb-20">
    <section class="relative flex flex-col gap-10">
      <img src="~/assets/imgs/wating.png" alt="Wating" class="w-full h-[600px]" />
      <div class="absolute top-0 left-0 w-full h-[600px] bg-black opacity-50"></div>
      <div class="absolute top-40 left-[10%] text-white flex flex-col gap-5">
        <div class="flex flex-col gap-4 font-bold text-3xl md:text-6xl">
          <span>{{ $t('index.hero.mainText1') }}</span>
          <span>{{ $t('index.hero.mainText2') }}</span>
        </div>
        <div class="ml-5 flex flex-col gap-3 text-xl font-medium md:text-3xl">
          <span>{{ $t('index.hero.subText1') }}</span>
          <span>{{ $t('index.hero.subText2') }}</span>
        </div>
      </div>
    </section>

    <section class="w-[70%] mx-auto">
      <DefineDiscriptionTemplate #="{ icon, text }">
        <div class="w-[250px] h-[250px] bg-white rounded-lg shadow-lg flex items-center justify-center flex-col gap-2 p-2 text-center">
          <Icon :name="icon" class="text-indigo-600" size="4em" />
          <span>{{ text }}</span>
        </div>
      </DefineDiscriptionTemplate>

      <div class="flex flex-wrap justify-center gap-10">
        <ReuseDiscriptionTemplate
          icon="mdi:alarm"
          :text="$t('index.description.card1')" />
        <ReuseDiscriptionTemplate
          icon="mdi:qrcode"
          :text="$t('index.description.card2')" />
        <ReuseDiscriptionTemplate
          icon="mdi:account-multiple"
          :text="$t('index.description.card3')" />
      </div>
    </section>

    <section class="w-[70%] mx-auto flex flex-col gap-3">
      <DefineMeritTemplate #="{ icon, title, descriptions }">
        <div>
          <div class="flex items-center gap-1">
            <Icon :name="icon" class="text-indigo-600" size="2em" />
            <strong>{{ title }}</strong>
          </div>

          <ul class="ml-8">
            <li v-for="(description, index) in descriptions" :key="index" :class="{ 'mb-4': index < descriptions.length - 1 }">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-indigo-600 text-bold">{{ index + 1 }}.</span>
                <span class="text-md">{{ description.title.loc?.source ?? description.title }}</span>
              </div>
              <span class="text-md">{{ description.value.loc?.source ?? description.value }}</span>
            </li>
          </ul>
        </div>
      </DefineMeritTemplate>

      <h1 class="font-bold text-center text-xl">{{ $t('index.merit.title') }}</h1>

      <div class="flex flex-col gap-2">
        <ReuseMeritTemplate
          icon="mdi:emoticon-happy-outline"
          :title="$t('index.merit.staff.title')"
          :descriptions="$tm('index.merit.staff.descriptions')" />
        <ReuseMeritTemplate
          icon="mdi:cards-heart-outline"
          :title="$t('index.merit.customer.title')"
          :descriptions="$tm('index.merit.customer.descriptions')" />
      </div>
    </section>

    <section class="w-[70%] mx-auto flex flex-col gap-3">
      <DefineIntroductionTemplate #="{ icon, title, description }">
        <div class="flex flex-col items-center gap-3 w-[200px]">
          <span class="p-3 bg-indigo-500 rounded-full w-fit flex items-center justify-center">
            <Icon :name="icon" class="text-white" size="3em" />
          </span>
          <div class="flex flex-col items-center gap-2">
            <span class="font-bold text-xl">{{ title }}</span>
            <p class="text-sm">{{ description }}</p>
          </div>
        </div>
      </DefineIntroductionTemplate>

      <h1 class="font-bold text-center text-xl">{{ $t('index.introduction.title') }}</h1>

      <div class="w-full bg-white rounded-lg shadow-lg p-6 flex items-center flex-col gap-5 md:flex-row md:justify-between">
        <ReuseIntroductionTemplate icon="mdi:file-document-edit-outline" :title="$t('index.introduction.step1.title')" :description="$t('index.introduction.step1.description')" />
        <Icon name="mdi:arrow-right-thick" class="text-indigo-600 rotate-90 md:rotate-0" size="3em" />
        <ReuseIntroductionTemplate icon="mdi:cog" :title="$t('index.introduction.step2.title')" :description="$t('index.introduction.step2.description')" />
        <Icon name="mdi:arrow-right-thick" class="text-indigo-600 rotate-90 md:rotate-0" size="3em" />
        <ReuseIntroductionTemplate icon="mdi:rocket-launch" :title="$t('index.introduction.step3.title')" :description="$t('index.introduction.step3.description')" />
      </div>
    </section>

    <section class="w-[70%] mx-auto flex flex-col gap-3">
      <DefineFAQTemplate #="{ question, answer }">
        <div class="w-full bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2">
          <div class="flex flex-col md:flex-row md:items-center md:gap-2">
            <Icon name="mdi:alpha-q-circle" class="text-indigo-600" size="2em" />
            <span>{{ question }}</span>
          </div>
          <div class="flex flex-col md:flex-row md:items-center md:gap-2">
            <Icon name="mdi:alpha-a-circle-outline" class="text-indigo-600" size="2em" />
            <span>{{ answer }}</span>
          </div>
        </div>
      </DefineFAQTemplate>

      <h1 class="font-bold text-center text-xl">{{ $t('index.faq.title') }}</h1>

      <div class="flex flex-col gap-2">
        <ReuseFAQTemplate :question="$t('index.faq.item1.question')" :answer="$t('index.faq.item1.answer')" />
        <ReuseFAQTemplate :question="$t('index.faq.item2.question')" :answer="$t('index.faq.item2.answer')" />
        <ReuseFAQTemplate :question="$t('index.faq.item3.question')" :answer="$t('index.faq.item3.answer')" />
        <ReuseFAQTemplate :question="$t('index.faq.item4.question')" :answer="$t('index.faq.item4.answer')" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const [DefineDiscriptionTemplate, ReuseDiscriptionTemplate] = createReusableTemplate()
const [DefineMeritTemplate, ReuseMeritTemplate] = createReusableTemplate()
const [DefineIntroductionTemplate, ReuseIntroductionTemplate] = createReusableTemplate()
const [DefineFAQTemplate, ReuseFAQTemplate] = createReusableTemplate()
</script>