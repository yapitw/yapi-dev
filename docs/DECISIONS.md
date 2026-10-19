# 改版決策紀錄（2026-10 redesign）

分支：`redesign/tanstack-start`。這次改版沒有逐項詢問，以下每個決策都附上理由和替代方案，方便日後回頭調整。

## 1. 技術棧

| 項目 | 選擇 | 理由 |
| --- | --- | --- |
| 框架 | TanStack Start（React 19） | 與最近的專案 `word-otter-landing-page` 一致；檔案式路由、型別安全的連結、內建預渲染 |
| 建置 | Vite 8 | TanStack Start 內建 |
| 樣式 | Tailwind CSS v4 + 少量自訂 CSS token | 同上；取代原本的 SCSS |
| Lint / Format | Biome | 同上；取代 ESLint + Prettier |
| 測試 | Vitest | 同上 |
| 套件管理 | pnpm | 依指示從 npm/yarn 改為 pnpm（`packageManager` 已鎖版本） |
| TypeScript | 6.x | 與 word-otter 一致；7.x（Go 原生版）生態尚在跟進，暫不跳 |

**移除的依賴**：`react-intl`、`query-string`、`react-router-dom`、`sass`、`pug`、`glslify-*`、ESLint/Prettier 全家桶。

## 2. 輸出與部署

- **全站靜態預渲染**（`prerender.crawlLinks`）。這是作品集，沒有任何需要伺服器的功能；靜態 HTML 對 SEO、社群分享預覽和速度都最好。目前輸出 36 頁到 `dist/client`。
- **不使用 SPA shell**。試過 `spa.enabled`，它預設以 `/` 產生 shell，會吃掉首頁的 `index.html`；換成其他 mask path 又因沒有對應路由而失敗。改用：
  - 預渲染的 `/404.html` 當作未知網址的頁面（Vercel 自動使用）。
  - 舊網址用 `vercel.json` 的 **301 轉址** 處理，比前端轉址對 SEO 更好。
- **部署平台維持 Vercel**（沿用原本的 `vercel.json` 與 yapi.dev 網域）。`vercel.json` 已設好 `pnpm build`、`outputDirectory: dist/client`、`cleanUrls`。
  - ⚠️ 上線前請確認 Vercel 專案的 Framework Preset 為 *Other*，且建置環境能用 Corepack 取得 `packageManager` 指定的 pnpm 版本（必要時設定環境變數 `ENABLE_EXPERIMENTAL_COREPACK=1`）。
- `CNAME` 是 GitHub Pages 時期留下的，保留不動（Vercel 不讀它）。

## 3. 網址結構

| 舊 | 新 | 處理方式 |
| --- | --- | --- |
| `/`（轉到 `/exp/Lab15`） | `/` 真正的首頁 | — |
| `/exp/Lab15` 等 | `/lab/vortex` 等（語意化 slug） | `vercel.json` 301 |
| `/exp/*`（其他） | `/lab` | 301 |
| `/web` | `/work` | 301 |
| `/art` | `/art` | 不變 |
| `/about?lang=zh` | `/about/zh` | 301（查詢字串條件） |
| `/noc/lecture1_7` | `/noc/lecture1_7` | 不變；新增 `/noc` 目錄頁 |

語言改成路徑（`/about/zh`）而不是查詢字串：預渲染只能依路徑產生不同 HTML，用查詢字串會造成 hydration 不一致。

## 4. 程式架構

```
src/
  routes/        檔案式路由（頁面只負責版面）
  content/       所有內容資料（實驗、作品、畫作、履歷、NOC 清單）— 單一資料來源
  components/    SiteHeader / SiteFooter / FlowField / SketchStage / ExperimentCard / ThemeToggle / NotFound
  sketches/      原本的 labs、natureOfCode、libs，原樣搬入
  lib/           seo、theme 小工具
  assets/        圖片與實驗縮圖
scripts/capture-thumbnails.ts   產生實驗縮圖
```

- **內容與程式分離**：實驗的標題、描述、標籤原本寫在各 Lab class 的 `static` 欄位，必須載入 p5/three 才讀得到。現在集中在 `src/content/experiments.ts`，列表頁不需要載入任何繪圖函式庫。
- **繪圖程式碼只在瀏覽器載入**：每個實驗透過 `load: () => import(...)` 動態載入，由 `SketchStage` 在 `useEffect` 中掛載並在離開時清理。p5（約 1MB）和 three 只在進入對應頁面時下載。原本是全部打包成一個 1.6MB 的 bundle。
- **Sketch 程式碼盡量不動**：`src/sketches/**` 保留原本 4 空白縮排風格，並排除在 Biome 之外，避免一次性大量 diff 混淆實質修改。
- **履歷雙語資料**：改成每個欄位 `{ en, zh? }`，中文缺翻譯時自動退回英文。原本中文版直接少了 OKX 和 ByteDance 兩段經歷，現在會以英文顯示。
- **主題**：亮色／暗色／跟隨系統，三段切換，存在 `localStorage`，首屏前用 inline script 套用，避免閃爍。

## 5. 視覺設計：「繪圖機紙張」(plotter sheet)

作品集的主角是生成式圖像，所以把整個網站當成一張被 pen plotter 畫過的紙：

- **色彩**：冷調紙白 `#f3f4f1`、石墨字色 `#1a1d24`、原子筆藍 `#2340d9`（所有「被畫出來的」或可互動的東西都用這支筆）。暗色模式是深藍黑紙 `#10131c` 配淡藍筆 `#8fa3ff`。
  - 刻意避開米色＋陶土橘、純黑＋螢光綠這兩種常見模板配色。
- **字體**：只用一套 **Mona Sans**，靠它的寬度軸（wdth 75–125）做層次：標題拉到最寬 125，內文 100。中文回退到 PingFang TC / Noto Sans TC。字級採古典比例尺（12/14/16/18/21/24/36/48/72）。
- **唯一的大膽之處是首頁 Hero**：一個即時的 simplex noise 流場，用筆色畫出線條，滑鼠經過會攪成漩渦（呼應最新的 Exp. 15 Vortex）。其他頁面保持安靜克制。
  - 尊重 `prefers-reduced-motion`：改成畫一張靜態流線圖。
  - 離開視窗或分頁隱藏時暫停動畫。
- 編號（Exp. 15、NOC 0.3…）只用在真正有順序的內容上。
- 避免：全大寫小標、到處都有的卡片陰影、漸層、`→` 箭頭連結。

## 6. 頁面

- **首頁**：流場 Hero → 最新 6 個實驗 → 網頁作品清單 → 簡短自介與聯絡方式。原本首頁直接跳轉到 Vortex，沒有任何介紹。
- **Lab**：縮圖網格（縮圖是用腳本實際跑出來的畫面）。底部連到 Nature of Code 練習。
- **實驗頁**：左邊大畫布，右邊標題、說明、工具、原始碼連結、上一個／下一個。
- **Work**：大圖＋負責項目。
- **Art**：瀑布流排版，點擊用原生 `<dialog>` 放大（Esc 關閉）。
- **About**：履歷版面，英／中切換，並有「列印或存成 PDF」按鈕，列印時會隱藏導覽列。

## 7. 依賴升級與相容性修正

- **three 0.137 → 0.186**：`PlaneBufferGeometry` 已移除，改為 `PlaneGeometry`。
- **p5 維持 1.x（1.11）**：p5 2.x 有 API 破壞性變更（例如 `curveVertex`），升級需要逐一改寫 sketch，這次不做。
- **simplex-noise 3 → 4**：改用 `createNoise3D()`。
- `src/sketches/noc/index.ts` 改成具名 import：`import * as` 會讓 Rolldown 把共用 helper 放進含 p5 的 chunk，導致預渲染時在 Node 端載入 p5 而崩潰。

## 8. 順手修正的既有 bug

- Exp. 4：滑鼠座標用了 `pageX` 減去 viewport 座標，頁面捲動後位置會偏移 → 改用 `clientX`。
- Exp. 10：`destroy()` 誤用 `addEventListener`（應為 `removeEventListener`），離開頁面後監聽器殘留。
- Exp. 4 的描述原本寫「以隱藏圖片限制生長範圍」，但該功能在程式中已被註解掉，實際行為是「按住拖曳來播種」。已將標題改為 *Reaction Diffusion, drawn*，描述照實寫。

## 9. 刪除的內容（都還在 git 歷史裡）

- 早已在 `labs/index.ts` 註解停用的 Lab 0、1、2、8、9。
- 未被路由使用的舊 `Home` 元件（IPFS iframe 清單；cloudflare-ipfs.com 閘道已於 2024 年停止服務）。
- 未使用的圖片：`work-104.jpg`、`3d11.png`、`yapi.png`。
- 履歷中被註解掉的「Tools I use」技能清單。
- `2d01.jpg` 從 3000px 縮到 2000px（925KB → 572KB）。

## 10. 刻意沒做的事

- 沒有加 TanStack Devtools：作品集用不到，少一個依賴。
- 沒有圖片格式轉換（WebP/AVIF）或響應式 `srcset`：目前圖片量不大，之後可加 `vite-imagetools`。
- 沒有 sitemap：可在 `tanstackStart({ sitemap: { enabled: true, host } })` 開啟。
- 沒有改寫 sketch 內部（全域變數、`document.onmousemove` 等舊寫法），以免改變作品本身的行為。

## 11. 指令

```bash
pnpm dev          # http://localhost:3000
pnpm build        # 預渲染到 dist/client
pnpm preview
pnpm check        # Biome
pnpm typecheck
pnpm test
pnpm thumbnails   # dev server 開著時，重新擷取 src/assets/thumbnails
```
