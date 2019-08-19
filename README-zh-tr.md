<p align="center">
  <img src="https://i.imgur.com/Nn9c78Q.png">
</p>

<br/>

# Vocabulary Manager

Vocabulary Manager 是一個跨平臺（Mac/Win/Linux）的桌面應用，用於管理從 [Vocabulary Picker](https://github.com/BoyanXu/vocabulary-picker) 收集的詞匯。同時，Vocabulary Manager 也支持將自身管理的單詞數據批量地導出為 抽認卡軟件 [Anki](https://apps.ankiweb.net/) 可以識別的`.txt` 文件，以便用戶對詞匯進行更為靈活的管理。

具體使用方法，參見視頻教程：http://www.iqiyi.com/w_19s9sjbog9.html

_Read this page in other languages：_ [English](https://github.com/BoyanXu/vocabulary-manager/blob/master/README.md), [简体中文](https://github.com/BoyanXu/vocabulary-manager/blob/master/README-zh-cn.md), [繁體中文](https://github.com/BoyanXu/vocabulary-manager/blob/master/README-zh-tr.md)

![](https://i.imgur.com/cFdWe9U.png)

## 安裝

按照如下網頁的指導，進行安裝： https://github.com/BoyanXu/vocabulary-manager/releases。

## 個性化

桌面左上方的圖標可以更換為任何用戶喜歡的頭像。

想要更換該圖標，首先需要準備一張 `png` 格式的圖像，並以 `avatar.png`命名。

將`avatar.png` 放置於如下文件路徑

(Mac 用戶) `Macintosh HD/Users/你的用戶名/Library/Application Support/ElectronReact/`

(Win 用戶) `C:\Users\你的用戶名\AppData\Roaming\VocabularyManager\avatar.png`

之後重啟 Vocabulary Manager 以更新設置。

註意：如果你不更換默認的圖標為自己最喜歡的頭像，每當你打開 Vocabulary Manager 一次，它就會敦促你一次。所以，為了獲得最佳的用戶體驗，請務必更換頭像，讓你的 Vocabulary Manager 看起來獨一無二。

## 導入

1. **選擇** 左邊菜單裏的 `Import` 選項，以進入導入頁面。
2. 拖拽 [Vocabulary Picker](https://github.com/BoyanXu/vocabulary-picker) 導出的 `.json` 文件 至 導入頁面內的 放置區域。
3. 在導入詞匯至本地數據庫前，請務必還原單詞的時態和單三，如 `did` -> `do` 。**點擊** 詞匯 或者 句子 以對其進行修改，**按回車鍵** 以確認修改。
4. **點擊** 在臨時詞匯表正下方的`Import` 按鈕，以導入微調後的詞表到本地數據庫。

## 預覽 & 編輯

**選擇** 左邊菜單裏的 `Import` 選項，以進入管理頁面。

Vocabulary Manager 支持以下管理行為：

- 批量刪除
- 單詞查詢
- 以首字母排序
- 以摘取時間排序
- 以導入時間排序 (默認)
- 篩選一定時間段內摘取的所有單詞
- 編輯 單詞 (自動保存)
- 編輯 句子 (自動保存)

具體操作，請參考[視頻教程](http://www.iqiyi.com/w_19s9sjbog9.html)。

## 導出至 Anki

Vocabulary Manager 被設計來進行 輕量級的管理。

但如果你希望對導入的單詞數據進行更為靈活的管理，Vocabulary Manager 支持將 自身管理的詞匯 批量導出為 抽認卡軟件 [Anki](https://apps.ankiweb.net/) 可以識別並導入的 `.txt` 格式的文件。

在 [Anki](https://apps.ankiweb.net/) 內，依靠強大的[插件生態](https://ankiweb.net/shared/addons/2.1)，用戶可以實現諸如 `匹配詞典釋義`，`自動安排復習` 的強大功能。

在設計出，為了避免重復導出， Vocabulary Manager 被設計成只允許`篩選，並批量導出一定時間段內摘取的所有單詞`。

Vocabulary Manager 導出的 `IMPORT me to Anki.txt` 文件，由以下被分隔符 **" ` "** 分隔的各字段：

1. Vocabulary

2. Sentence

3. Explanation (which has a placeholder)

4. Paragraph

5. Url

6. Time-Imported

在 [Anki](https://apps.ankiweb.net/) 側，為了成功導入 `IMPORT me to Anki.txt` ，你需要在 `工具>管理筆記類型`中定義新的筆記類型。這種筆記類型 必須有以下按次序的各字段：

1. Vocabulary

2. Sentence

3. Explanation (which has a placeholder)

4. Paragraph

5. Url

6. Time-Imported

而在將 `IMPORT me to Anki.txt` 導入到 [Anki](https://apps.ankiweb.net/) 時，**切記** 將 **”字段由逗號分隔“** 設置為 **”字段由 ` 分隔“**。

成果如下：

![](https://i.imgur.com/ckXXBSf.png)

## Anki 附加組件推薦

### Fast Word Query

https://ankiweb.net/shared/info/1807206748

> This addon query words definitions or examples etc. fields from local or online dictionaries to fill into the Anki note.

用於為詞條批量匹配`.mdx`詞典 內的釋義。

<br/>

## 貢獻者

@高歌 為 Vocabulary Manager 設計了圖標。

@正源 是 Vocabulary Manager 的主要測試者。

@Boyan 設計並實現了 Vocabulary Manager 的架構。
