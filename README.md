# BIM E-leaflet — Geneva Invention

本專案包含 **兩個** 日內瓦發明展電子傳單網站，以靜態網頁形式呈現產品資訊，供部署於現有政府網站路徑使用。

---

## 專案一：FireCheck 4D

- **產品名稱**: FireCheck 4D  
- **產品類型**: A BIM Fire Safety Checker  
- **活動**: Geneva Invention  
- **入口檔**: `index_geneva_firecheck4d.html`  
- **託管路徑**: `https://www.bd.gov.hk/en/resources/online-tools/building-information-modelling/index_geneva_firecheck4d.html`
- **開發預覽（GitHub Pages）**: [index_geneva_firecheck4d.html](https://bdbim.github.io/BIM-E-leaflet/index_geneva_firecheck4d.html)

---

## 專案二：UrbanCool Dynamics

- **產品名稱**: UrbanCool Dynamics  
- **產品類型**: A BIM Building Permeability Checker  
- **活動**: Geneva Invention  
- **入口檔**: `index_geneva_urbancooldynamics.html`  
- **託管路徑**: `https://www.bd.gov.hk/en/resources/online-tools/building-information-modelling/index_geneva_urbancooldynamics.html`
- **開發預覽（GitHub Pages）**: [index_geneva_urbancooldynamics.html](https://bdbim.github.io/BIM-E-leaflet/index_geneva_urbancooldynamics.html)
- **主題色**: 黑 (#1a1a1a)、#cf5552、#58a38e  
- **背景面板**: 請將攤位背板圖片放置於 `assets/images/UrbanCool_panel.png`

---

## 技術規格 (Technical Specification)

- **託管方式**: 現有網站路徑，類似 FTP 靜態託管，將本資料夾內所有檔案上傳至上述路徑即可。
- **技術棧**: 純靜態 HTML + CSS + JavaScript，無需伺服器端或建置工具。
- **入口檔**: 
  - FireCheck 4D: `index_geneva_firecheck4d.html`
  - UrbanCool Dynamics: `index_geneva_urbancooldynamics.html`
- **相容性**: 僅依賴標準 HTML5/CSS3，可在各現代瀏覽器直接開啟。

---

## 檔案結構 (File Structure)

```
BIM-E-leaflet/
├── README.md                              # 本說明檔（專案資訊與後續維護指引）
├── index_geneva_firecheck4d.html          # FireCheck 4D 電子傳單主頁
├── index_geneva_urbancooldynamics.html    # UrbanCool Dynamics 電子傳單主頁
├── css/
│   ├── style.css                         # 主樣式表（FireCheck 4D + 共用）
│   └── urbancool_style.css               # UrbanCool Dynamics 樣式覆蓋
├── js/
│   ├── main.js                           # FireCheck 4D 主腳本
│   ├── main_urbancool.js                 # UrbanCool Dynamics 主腳本
│   ├── firecheck4d_translate.js          # FireCheck 4D 多語翻譯（EN/FR）
│   └── urbancool_translate.js            # UrbanCool Dynamics 多語翻譯（EN/FR）
└── assets/                               # 靜態資源
    ├── images/                            # 圖片（UrbanCool_panel.png、bd logo、vircon 等）
    ├── videos/                            # 影片（MP4，FireCheck 4D hero 及各區塊）
    │   ├── start_video.mp4                      # 進入頁面時 hero 區關鍵視覺背景
    │   ├── Evacuation sequence analysis.mp4    # 疏散序列分析區關鍵影片
    │   ├── Travel distance assessment.mp4      # 行走距離評估區關鍵影片
    │   ├── Fire resisting construction.mp4     # 耐火構造區關鍵影片
    │   ├── automated vetting.mp4               # From Data to Compliance 區
    │   ├── Codify regulatory requirements in various natural languages.mp4  # Global Adoption 區
    │   ├── Fire rated material traceability.mp4
    │   └── Alterations and additions.mp4
    └── gifs/                              # GIF 動圖（FireCheck 4D Travel distance）
        └── travel_distance_*.gif                   # FireCheck 4D: Travel distance 三張 GIF
```

---

## 設計規範 (Design Reference)

- **風格**: 參考 ARUP 網站 — 建築感、專業、簡潔。
- **特點**: 白底為主、留白充足、無襯線字體、標題層次分明。
- **圓角（Fillet corners）**：參考 ARUP 版型，所有圖片／影片／GIF 及卡片均使用圓角；變數為 `--radius-fillet`（12px）、`--radius-fillet-lg`（20px，用於 hero）。

### FireCheck 4D
- **主題色**：#eb4b9b（主色）、#27c3f3（輔色），樣式變數見 `css/style.css` 內 `:root`。
- **內容參考**：攤位背板 — Benefits、From Data to Compliance、Global Adoption、Smart Features，以及各功能模組（疏散分析、IFC 架構、耐火構造、材料追溯等）。

### UrbanCool Dynamics
- **主題色**：黑 (#1a1a1a)、#cf5552（紅橙）、#58a38e（綠），樣式變數見 `css/urbancool_style.css`。
- **內容參考**：攤位背板 — Climate-response、Multi-Scale Cooling、City Spatial Data Integration、Scientific Robustness、Instant Design Review & Generation。

---

## 主題色 (Theme Colours — Panel)

與攤位面板一致，電子傳單採用以下主題色：

### FireCheck 4D
| 色碼 | 用途 |
|------|------|
| **#eb4b9b** | 主色：品牌名、導航 hover、區塊標籤、產品徽章、數據強調 |
| **#27c3f3** | 輔色：Certitude 橫幅漸層、區塊背景微調 |

CSS 變數：`css/style.css` 的 `:root`（`--color-accent`, `--color-accent-secondary`）。

### UrbanCool Dynamics
| 色碼 | 用途 |
|------|------|
| **#1a1a1a** | 背景：深色區塊、header、footer |
| **#cf5552** | 紅橙：Design Review 區塊、公式框、強調 |
| **#58a38e** | 綠：Integration 區塊、品牌、導航 hover |

CSS 變數：`css/urbancool_style.css`（`--color-urbancool-dark`, `--color-urbancool-red`, `--color-urbancool-green`）。

---

## 內容區塊對照 (Content Sections)

### FireCheck 4D
| 區塊 | 英文標題 | 說明 |
|------|----------|------|
| 效益 | Benefits | 30% 生產力、全球受害者與經濟損失數據 |
| 數據到合規 | From Data to Compliance | 法規轉機器可讀參數、自動審查 |
| 全球應用 | Global Adoption | 多語言法規編碼 |
| 智能功能 | Smart Features | Smart INPUT / CHECK / IMPORT |
| 設計確定性 | Certitude de conception | 疏散、IFC、空間、行走距離、耐火構造、消防救援 |
| 施工確定性 | Certitude de construction | 耐火材料追溯 |
| 生命週期確定性 | Certitude du cycle de vie | 改動與加建 |

### UrbanCool Dynamics
| 區塊 | 英文標題 | 說明 |
|------|----------|------|
| 氣候回應 | Climate-response | 城市升溫危機、溫度異常趨勢 |
| 多尺度冷卻 | Multi-Scale Cooling | 香港高密度城市、穿透度分區 |
| 城市資料整合 | Integration with City Spatial Data | 用地、街道、城市形態、地形、鄰地 |
| 科學穩健 | Scientific Robustness | LCP 公式、摩擦與轉向成本 |
| 即時設計審查 | Instant Design Review & Generation | From Codes/Needs/Site to Design、CFD 驗證 |

---

## 後續維護與代理指引 (For Later Agents)

> **⚠️ 多語支援 (Multi-language support)**  
> 本 e-leaflet 支援英文 (EN) 與法文 (FR) 切換。**任何新增或修改的 UI 元素都必須支援多語**。  
> - 在 HTML 中為可翻譯文字加上 `data-i18n="key"`（純文字）或 `data-i18n-html="key"`（含 HTML 標籤）。  
> - FireCheck 4D：在 `js/firecheck4d_translate.js` 新增翻譯；UrbanCool Dynamics：在 `js/urbancool_translate.js` 新增翻譯。  
> - 語言切換器位於導覽列（EN | FR），選擇會儲存於 localStorage。

1. **更新文字**: 編輯對應專案的 HTML（`index_geneva_firecheck4d.html` 或 `index_geneva_urbancooldynamics.html`），**同時在對應的 translate.js 更新 en/fr 翻譯**。保持結構與 class 名稱以利樣式一致。
2. **更新樣式**: FireCheck 4D 修改 `css/style.css`；UrbanCool Dynamics 修改 `css/urbancool_style.css`。主題色見上方「主題色」。
3. **新增圖片 / GIF / 影片**:  
   - 圖片放入 `assets/images/`，GIF 放入 `assets/gifs/`，影片（MP4）放入 `assets/videos/`。  
   - 在 HTML 中用相對路徑引用，例如 `assets/images/xxx.png`、`assets/gifs/xxx.gif`、`assets/videos/xxx.mp4`。  
   - 目前 HTML 內有「媒體區塊」placeholder（`class="media-block"`），可將其中的 `<span>…</span>` 改為 `<img src="assets/images/xxx.png" alt="…">`、`<img src="assets/gifs/xxx.gif" alt="…">` 或 `<video src="assets/videos/xxx.mp4" …></video>`。
4. **新增區塊**: 複製現有 `<section class="...">` 結構，依序貼上並修改標題與內文，必要時在 `style.css` 增加對應 class。
5. **多語**: 已實作 EN/FR 切換。新增任何文字內容時，必須在對應專案的 translate.js 加入翻譯，並在 HTML 加上 `data-i18n` 或 `data-i18n-html`。
6. **部署**: 將整個資料夾內容上傳至 `building-information-modelling/` 路徑下，確保 `index_geneva_firecheck4d.html` 與 `index_geneva_urbancooldynamics.html` 皆可透過上述 URL 存取。
7. **連結與 QR Code**: 若「更多資訊」需連到外部連結或 PDF，在 HTML 中更新對應的 `<a href="...">` 及 QR 碼圖片路徑。

---

## 版本與更新記錄 (Changelog)

- **2026-02**: 初版建立 — 靜態 e-leaflet 結構、ARUP 風格版型、攤位背板內容對齊、README 與代理指引。
- **2026-02**: 新增 UrbanCool Dynamics e-leaflet — 雙專案支援（FireCheck 4D + UrbanCool Dynamics）、主題色黑/#cf5552/#58a38e、多語 EN/FR。

---

## 聯絡與出處 (Attribution)

- **品牌/機構**: Buildings Department, Tsinghua University, ARUP, VIRCON, CUHK, Ronald Lu & Partners  
- **產品**: FireCheck 4D — A BIM Fire Safety Checker；UrbanCool Dynamics — A BIM Building Permeability Checker
