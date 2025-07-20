/** お店側のスクショ */
export const serviceShopItems = {
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
      image: 'dashboard/custom_1',
      description: 'Description for Service 1',
    },
    {
      image: 'dashboard/custom_2_1',
      description: 'Another description for Service 1Another description for Service 1',
    },
    {
      image: 'dashboard/custom_2_2',
      description: 'Another description for Service 1Another description for Service 1',
    },
    {
      image: 'dashboard/custom_3',
      description: 'Another description for Service 1Another description for Service 1',
    },
  ]
}
