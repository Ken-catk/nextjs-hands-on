import Link from 'next/link';

const links = [
  { href: '/example1', title: 'Hello World' },
  { href: '/example2', title: 'スタイル適用' },
  { href: '/example3', title: '配列操作' },
  { href: '/example4', title: 'レイアウト' },
  { href: '/example5', title: 'カスタムコンポーネント' },
  { href: '/example6', title: 'onClickとuseState' },
  { href: '/example7', title: 'fetch' },
  { href: '/apitest', title: 'APIテスト' },
  { href: '/example8', title: 'サーバーサイドでfetch' },
  { href: '/original1', title: 'お店をリスト表示' },
  { href: '/original2', title: 'ジャンルをfetch' },
  { href: '/original3', title: 'ボタンで飲食店絞り込み' },
];

const ExampleLinks = () =>
  links.map(link => (
    <div key={link.href}>
      <Link href={link.href}>{link.title}</Link>
    </div>
  ));

export default ExampleLinks;
