<p align="center">
  <img src="https://i.imgur.com/Nn9c78Q.png">
</p>

<br/>

# Vocabulary Manager

Vocabulary Manager 是一个跨平台（Mac/Win/Linux）的桌面应用，用于管理从 [Vocabulary Picker](https://github.com/BoyanXu/vocabulary-picker) 收集的词汇。同时，Vocabulary Manager 也支持将自身管理的单词数据批量地导出为 抽认卡软件 [Anki](https://apps.ankiweb.net/) 可以识别的`.txt` 文件，以便用户对词汇进行更为灵活的管理。

具体使用方法，参见视频教程：http://www.iqiyi.com/w_19s9sjbog9.html

_Read this page in other languages：_ [English](https://github.com/BoyanXu/vocabulary-manager/blob/master/README.md), [简体中文](https://github.com/BoyanXu/vocabulary-manager/blob/master/README-zh-cn.md), [繁體中文](https://github.com/BoyanXu/vocabulary-manager/blob/master/README-zh-tr.md)

![](https://i.imgur.com/cFdWe9U.png)

## 安装

按照如下网页的指导，进行安装： https://github.com/BoyanXu/vocabulary-manager/releases。

## 个性化

桌面左上方的图标可以更换为任何用户喜欢的头像。

想要更换该图标，首先需要准备一张 `png` 格式的图像，并以 `avatar.png`命名。

将`avatar.png` 放置于如下文件路径

(Mac 用户) `Macintosh HD/Users/你的用户名/Library/Application Support/ElectronReact/`

(Win 用户) `C:\Users\你的用户名\AppData\Roaming\VocabularyManager\avatar.png`

之后重启 Vocabulary Manager 以更新设置。

注意：如果你不更换默认的图标为自己最喜欢的头像，每当你打开 Vocabulary Manager 一次，它就会敦促你一次。所以，为了获得最佳的用户体验，请务必更换头像，让你的 Vocabulary Manager 看起来独一无二。

## 导入

1. **选择** 左边菜单里的 `Import` 选项，以进入导入页面。
2. 拖拽 [Vocabulary Picker](https://github.com/BoyanXu/vocabulary-picker) 导出的 `.json` 文件 至 导入页面内的 放置区域。
3. 在导入词汇至本地数据库前，请务必还原单词的时态和单三，如 `did` -> `do` 。**点击** 词汇 或者 句子 以对其进行修改，**按回车键** 以确认修改。
4. **点击** 在临时词汇表正下方的`Import` 按钮，以导入微调后的词表到本地数据库。

## 预览 & 编辑

**选择** 左边菜单里的 `Import` 选项，以进入管理页面。

Vocabulary Manager 支持以下管理行为：

- 批量删除
- 单词查询
- 以首字母排序
- 以摘取时间排序
- 以导入时间排序 (默认)
- 筛选一定时间段内摘取的所有单词
- 编辑 单词 (自动保存)
- 编辑 句子 (自动保存)

具体操作，请参考[视频教程](http://www.iqiyi.com/w_19s9sjbog9.html)。

## 导出至 Anki

Vocabulary Manager 被设计来进行 轻量级的管理。

但如果你希望对导入的单词数据进行更为灵活的管理，Vocabulary Manager 支持将 自身管理的词汇 批量导出为 抽认卡软件 [Anki](https://apps.ankiweb.net/) 可以识别并导入的 `.txt` 格式的文件。

在 [Anki](https://apps.ankiweb.net/) 内，依靠强大的[插件生态](https://ankiweb.net/shared/addons/2.1)，用户可以实现诸如 `匹配词典释义`，`自动安排复习` 的强大功能。

在设计出，为了避免重复导出， Vocabulary Manager 被设计成只允许`筛选，并批量导出一定时间段内摘取的所有单词`。

Vocabulary Manager 导出的 `IMPORT me to Anki.txt` 文件，由以下被分隔符 **" ` "** 分隔的各字段：

1. Vocabulary

2. Sentence

3. Explanation (which has a placeholder)

4. Paragraph

5. Url

6. Time-Imported

在 [Anki](https://apps.ankiweb.net/) 侧，为了成功导入 `IMPORT me to Anki.txt` ，你需要在 `工具>管理笔记类型`中定义新的笔记类型。这种笔记类型 必须有以下按次序的各字段：

1. Vocabulary

2. Sentence

3. Explanation (which has a placeholder)

4. Paragraph

5. Url

6. Time-Imported

而在将 `IMPORT me to Anki.txt` 导入到 [Anki](https://apps.ankiweb.net/) 时，**切记** 将 **”字段由逗号分隔“** 设置为 **”字段由 ` 分隔“**。

成果如下：

![](https://i.imgur.com/ckXXBSf.png)

## Anki 附加组件推荐

### Fast Word Query

https://ankiweb.net/shared/info/1807206748

> This addon query words definitions or examples etc. fields from local or online dictionaries to fill into the Anki note.

用于为词条批量匹配`.mdx`词典 内的释义。

<br/>

## 贡献者

@高歌 为 Vocabulary Picker 设计了图标。

@正源 是 Vocabulary Picker 的主要测试者.

@Boyan 设计并实现了 Vocabulary Picker 的架构。
