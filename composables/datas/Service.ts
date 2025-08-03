import type { Service } from "../types/Service"

/** お店側のスクショ */
export const serviceShopItems: Service = {
  id: 1,
  title: 'Service 1',
  contents: [
    {
      image: 'dashboard/top',
      anchor: 'top',
      type: 'jpeg',
      title: 'モードを簡単に選べる！',
      description: 'waiting管理専用の端末、QRコード表示専用の端末のような制限はなく、タブレットやスマホなどどの端末でも簡単にモードを切り替えられます。',
    },
    {
      image: 'dashboard/qrcode',
      anchor: 'qrcode',
      type: 'jpeg',
      title: '複雑な設定なしで、QRコードの表示ができる！',
      description: 'QRコードの表示のために、複雑な設定は必要ありません。「QRコード表示」ボタンだけで表示できます。',
    },
    {
      image: 'dashboard/waiting_5',
      anchor: 'waiting_1',
      type: 'jpeg',
      title: 'お客様の状態がわかりやすい！',
      description: '入店済みのお客様、順番待ちのお客様で状態が別れているので、お客様の状態が一目でわかります。また、人数も表示されるので、より適切な対応ができるようになります。',
    },
    {
      image: 'dashboard/waiting_2',
      anchor: 'waiting_2',
      type: 'jpeg',
      title: '順番管理が簡単！',
      description: '「入店」ボタンでお客様の入店ん処理が簡単、「呼出」ボタンでわざわざ呼びに行かなくても良い、「キャンセル」ボタンでお客様のキャンセル処理が簡単にできます。',
    },
    {
      image: 'dashboard/waiting_3',
      anchor: 'waiting_3',
      type: 'jpeg',
      title: '呼出もワンタッチで完了！',
      description: '「呼出」ボタンを押下することにより、お客様の端末に通知が届きます。お客様は通知を受け取ることで、呼ばれたことを確認できるので、スタッフの業務が軽減されます。\nまた、「呼出済み」と表示が変わるため、お客様の状態をより把握しやすくなります。',
      isSupportText: true,
    },
    {
      image: 'dashboard/waiting_4',
      anchor: 'waiting_4',
      type: 'jpeg',
      title: '退室処理も簡単！',
      description: 'お会計が済んだお客様の退室処理も簡単にできます。「退室」ボタンを押下することで、入店済みのお客様リストから消えるので、スタッフはお客様の状態をより正確に把握できるようになります。',
    },
  ]
}

/** お客様側のスクショ */
export const serviceCustomerItems = {
  id: 1,
  title: 'Service 1',
  contents: [
    {
      image: 'dashboard/customer_1',
      title: '必要な情報は人数だけ！',
      anchor: 'customer_1',
      type: 'jpg',
      description: '整理券の発券のために必要な情報は人数だけです。\n名前や電話番号などは必要なく、人数情報だけで気軽に発券が可能です。',
      
    },
    {
      image: 'dashboard/customer_2_1',
      anchor: 'customer_2_1',
      type: 'jpg',
      title: 'シンプルなUI！',
      description: 'お客様が使う画面は、シンプルなUIで構成されているため、誰でも不便なく操作できます。\n自分の順番が何番めなのか、またキャンセルもワンタッチで簡単にできます。',
    },
    {
      image: 'dashboard/customer_2_2',
      anchor: 'customer_2_2',
      type: 'jpg',
      title: '自分がいつ入れるか予想できる',
      description: '最近入店したお客様の情報をもとに、次に入店できる時間を予想できます。\nこれにより、お客様は自分の順番がいつになるかを予想できるので、安心して待つことができます。',
    },
    {
      image: 'dashboard/customer_3',
      anchor: 'customer_3',
      type: 'jpg',
      title: '呼び出されたことがわかる',
      description: 'お客様の端末に通知が届くので、呼び出されたことがわかります。\n通知を受け取ることで、スタッフが呼びに行く手間を省くことができ、スタッフの業務が軽減されます。',
    },
  ]
}
