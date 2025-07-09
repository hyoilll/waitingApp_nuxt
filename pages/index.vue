<template>
  <div class="flex flex-col gap-20 pb-20">
    <section class="relative flex flex-col gap-10">
      <img src="~/assets/imgs/wating.png" alt="Wating" class="w-full h-[600px]" />
      <div class="absolute top-0 left-0 w-full h-[600px] bg-black opacity-50"></div>
      <div class="absolute top-40 left-[10%] text-white flex flex-col gap-5">
        <div class="flex flex-col gap-4 text-6xl font-bold">
          <span>お客様をお待たせしない</span>
          <span>を実現。</span>
        </div>
        <div class="ml-5 flex flex-col gap-3 text-3xl font-medium">
          <span>お店の新しい顧客体験を創造</span>
          <span>しませんか？</span>
        </div>
      </div>
    </section>

    <section class="w-[70%] mx-auto">
      <DefineDiscriptionTemplate #="{ icon, text }">
        <div class="w-[250px] h-[250px] bg-white rounded-lg shadow-lg flex items-center justify-center flex-col gap-2 p-2 text-center">
          <Icon :name="icon" class="text-blue-400" size="4em" />
          <span>{{ text }}</span>
        </div>
      </DefineDiscriptionTemplate>

      <div class="flex flex-wrap justify-center gap-10">
        <ReuseDiscriptionTemplate
          icon="mdi:alarm"
          text="お客様を呼びに行ったり、行列の整理に時間を取られたり…お店の運営には、見えない「待ち時間」に関する課題があります。" />
        <ReuseDiscriptionTemplate
          icon="mdi:qrcode"
          text="QRコード一つで整理券発行から呼び出しまで完結し、お客様もスタッフもストレスなく過ごせる新しい店舗体験を実現します。" />
        <ReuseDiscriptionTemplate
          icon="mdi:account-multiple"
          text="私たちは、そんなお店の皆様のために、お客様の「待つ」をなくし、よりスムーズな店舗運営をサポートするWebサービスを提供しています。" />
      </div>
    </section>

    <section class="w-[70%] mx-auto flex flex-col gap-3">
      <DefineMeritTemplate #="{ icon, title, descriptions }">
        <div>
          <div class="flex items-center gap-1">
            <Icon :name="icon" class="text-blue-400" size="2em" />
            <strong>{{ title }}</strong>
          </div>

          <ul class="ml-8">
            <li v-for="(description, index) in descriptions" :key="index" :class="{ 'mb-4': index < descriptions.length - 1 }">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-blue-400 text-bold">{{ index + 1 }}.</span>
                <span class="text-md">{{ description.title }}</span>
              </div>
              <span class="text-md">{{ description.value }}</span>
            </li>
          </ul>
        </div>
      </DefineMeritTemplate>

      <h1 class="font-bold text-center text-xl">「Qパス」を導入することで、お店とお客様、双方に嬉しい変化が生まれます。</h1>

      <div class="flex flex-col gap-2">
        <ReuseMeritTemplate
          icon="mdi:emoticon-happy-outline"
          title="スタッフの負担を大幅軽減"
          :descriptions="[
            { title: '業務効率の向上', value: 'お客様の呼び出しは、ボタン一つで完了。スタッフがいちいち呼びに行ったり、列の整理に張り付いたりする手間がなくなります。その分、本来の接客や調理、商品準備など、売上に直結する業務に集中できます。' },
            { title: 'スムーズなオペレーション', value: '混雑時でも混乱なくお客様を誘導でき、店内外の状況を常に把握しやすくなります。新人スタッフでも簡単に操作できるため、教育コストも抑えられます。' }
          ]" />
        <ReuseMeritTemplate
          icon="mdi:cards-heart-outline"
          title="お客様の満足度とリピート率を向上"
          :descriptions="[
            { title: '待ち時間のストレスを解消', value: 'お客様はもう、お店の前でただ待つ必要はありません。順番が来るまで自由に時間を過ごせることで、待ち時間に対する不満が解消され、来店時の満足度が向上します。' },
            { title: '来店機会の創出', value: '「並びたくない」という理由で入店を諦めていたお客様も、安心して来店できるようになります。これにより、潜在的な顧客層を取り込み、来店機会を増やすことができます。' },
            { title: '質の高い顧客体験を提供', value: '待ち時間の快適さが、お店全体の印象アップに繋がり、お客様の再来店や口コミを促進します。' }
          ]" />
        <!-- TODO: 文章など調整しないといけない
         <ReuseMeritTemplate
          icon="mdi:security"
          title="セキュリティー問題の心配なし"
          :descriptions="[
            { title: '簡単な会員登録', value: 'お店の名前とパスワードを入力し、普段使ってるメールアドレスに届く確認リンクをクリックするだけで会員登録完了します。' },
            { title: 'アプリインストールなし', value: 'お客様からしてもアプリインストールなしで、qrコードを読み取るだけどWebページに遷移され整理券が発見できます。' },
          ]" /> -->
      </div>
    </section>

    <section class="w-[70%] mx-auto flex flex-col gap-3">
      <DefineIntroductionTemplate #="{ icon, title, description }">
        <div class="flex flex-col items-center gap-3 w-[200px]">
          <span class="p-3 bg-blue-300 rounded-full w-fit flex items-center justify-center">
            <Icon :name="icon" class="text-white" size="3em" />
          </span>
          <div class="flex flex-col items-center gap-2">
            <span class="font-bold text-xl">{{ title }}</span>
            <p class="text-sm">{{ description }}</p>
          </div>
        </div>
      </DefineIntroductionTemplate>

      <h1 class="font-bold text-center text-xl">導入までの流れ</h1>

      <div class="w-full bg-white rounded-lg shadow-lg p-6 flex justify-between items-center">
        <ReuseIntroductionTemplate icon="mdi:file-document-edit-outline" title="お申し込み" description="簡単な申込書作成でOK" />
        <Icon name="mdi:arrow-right-thick" class="text-blue-400" size="3em" />
        <ReuseIntroductionTemplate icon="mdi:cog" title="準備・設定" description="システムにお店情報を追加" />
        <Icon name="mdi:arrow-right-thick" class="text-blue-400" size="3em" />
        <ReuseIntroductionTemplate icon="mdi:rocket-launch" title="導入・運用開始" description="翌日からすぐに利用開始" />
      </div>
    </section>

    <section class="w-[70%] mx-auto flex flex-col gap-3">
      <DefineFAQTemplate #="{ question, answer }">
        <div class="w-full bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2">
          <div class="flex gap-2 items-center">
            <Icon name="mdi:alpha-q-circle" class="text-blue-400" size="2em" />
            <span>{{ question }}</span>
          </div>
          <div class="flex gap-2 items-center">
            <Icon name="mdi:alpha-a-circle-outline" class="text-blue-400" size="2em" />
            <span>{{ answer }}</span>
          </div>
        </div>
      </DefineFAQTemplate>

      <h1 class="font-bold text-center text-xl">よくある質問</h1>

      <div class="flex flex-col gap-2">
        <ReuseFAQTemplate question="Qパスの導入にはどれくらいの時間がかかりますか？" answer="お申し込みから運用開始まで、最短で翌日からご利用いただけます。" />
        <ReuseFAQTemplate question="導入にあたって特別な設備は必要ですか？" answer="特別な設備は不要で、スマートフォンやタブレットがあれば簡単に導入できます。" />
        <ReuseFAQTemplate question="導入後のサポートはありますか？" answer="はい、導入後も専任のサポートチームが対応いたしますので、ご安心ください。" />
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