# 山岳歴史マップ

日本の山岳信仰と歴史を学びながら登山を楽しめる、スマートフォン向けWebアプリです。現在は富士山のMVPを収録しています。

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/mountain-history-map/src/App.tsx` — 地図画面と山詳細画面のルーティング
- `artifacts/mountain-history-map/src/components/japan-map.tsx` — 外部サービスに依存しない日本地図と富士山マーカー
- `artifacts/mountain-history-map/src/data/mountains.ts` — 将来の全国展開を見据えた山データ
- `artifacts/mountain-history-map/src/pages/mountain-detail.tsx` — 山の詳細コンテンツ表示
- `artifacts/mountain-history-map/src/index.css` — 和紙・深い藍・朱を軸にしたテーマ

## Architecture decisions

- MVPではDB・ログイン・外部地図APIを使わず、富士山の静的データで画面体験を優先する。
- 地図はインラインSVGで表現し、外部サービスのキーや読み込み状態に左右されないようにする。
- 山の情報は配列データとして分離し、詳細画面はIDで山を取得する。
- Wouterで地図と `/mountains/:id` の詳細画面を切り替える。

## Product

- トップ画面で日本列島を眺めながら富士山の位置を確認できる。
- 富士山マーカーまたは注目の山カードから詳細画面へ移動できる。
- 標高・所在地・歴史・浅間信仰・吉田口登山道・歴史スポット・出典を読める。
- モバイル幅ではスマートフォン向けの縦長体験、広い画面では端末比率のプレビューとして表示する。

## User preferences

- iPhoneで使いやすい、落ち着いた和風のモダンデザイン。

## Gotchas

- Webアーティファクトの起動には管理ワークフローが注入する `PORT` と `BASE_PATH` が必要。
- UI変更後の確認は `pnpm --filter @workspace/mountain-history-map run typecheck` を使う。

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
