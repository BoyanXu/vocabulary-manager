
<p align="center">
  <img src="https://i.imgur.com/Nn9c78Q.png">
</p>

<br/>

# Vocabulary Manager

Vocabulary Manager is a cross-platform (Mac/Win/Linux) desktop application that manages vocabularies collected by vocabulary-picker. It also support export records to Anki for more flexible management.

Check the Video Tutorial for more help: https://www.youtube.com/watch?v=zhhA5mQWdlw&t=44s

![](https://i.imgur.com/cFdWe9U.png)

## Install

Follow instruction on page: https://github.com/BoyanXu/vocabulary-manager/releases

## Customization

Avatar on the up-left corner is customizable.

To change the default icon into your favorite avatar, place a `png` image named as `avatar.png` at the following path:

(Mac User) `Macintosh HD/Users/YOUR_USERNAME/Library/Application Support/ElectronReact/`

(Win User) `C:\Users\YOUR_USERNAME\AppData\Roaming\VocabularyManager\avatar.png`

Then restart Vocabulary Manager to update the change.

If you haven't set a customized avatar, Vocabulary Manager will alert you to set it every time you start Vocabulary Manager. So, for your own sack, set the avatar and make the software unique for you.

## Import

1. **Select** `Import` in the menu on the left.

2. **Drag** and **drop** the `.json` file exported by [Vocabulary Picker](https://github.com/BoyanXu/vocabulary-picker) to the drop zone.

3. Before import to local database, **normalize** the form of vocabulary, for example: `did` -> `do`. **Click** on the vocabulary or sentence to tune the tense, and **press** `ENTER` to save the change.
4. **Click** `Import` button below the temporary vocabulary list to import the modified list into local database.

## View & Edit

This page is where you can manage all the vocabularies you collected.

Several management behaviors are supported:

- Batch Delete
- Search vocabulary
- Sort records by the first letter.
- Sort records by date
- Filter records by period
- Edit vocabulary (auto save)
- Edit sentence (auto save)

Refer to the [video tutorial](https://www.youtube.com/watch?v=zhhA5mQWdlw&t=44s) for help.

## Export to Anki

Vocabulary Manager is suitable for lightweight management.

But if you pursue more flexible management, Vocabulary Manager also support exporting records to the flashcard software [Anki](https://apps.ankiweb.net/), where "match definition", "automatically schedule the review" and numerous other functionalities backed by the [Anki adds-on community](https://ankiweb.net/shared/addons/2.1).

To avoid duplication and conflict, Vocabulary Manager only supports filter records by periods.

Each exported records within `IMPORT me to Anki.txt` has the following default fields, **separated by delimiter " ` "**:

1. Vocabulary

2. Sentence

3. Explanation (which has a placeholder)

4. Paragraph

5. Url

6. Time-Imported

To smoothly import `IMPORT me to Anki.txt` to [Anki](https://apps.ankiweb.net/), you should [create a new Note Type](https://www.youtube.com/watch?v=s2raTx19ByM), with the following fields in order.

1. Vocabulary

2. Sentence

3. Explanation (which has a placeholder)

4. Paragraph

5. Url

6. Time-Imported

When import `IMPORT me to Anki.txt` to [Anki](https://apps.ankiweb.net/), **DON'T FORGET TO** change "**Fields separated by: Comma**" into "**Fields separated by: `**", otherwise those fields cannot be recognized by [Anki](https://apps.ankiweb.net/).

![](https://i.imgur.com/ckXXBSf.png)

## Anki Adds-on recommend

### Fast Word Query

https://ankiweb.net/shared/info/1807206748

> This addon query words definitions or examples etc. fields from local or online dictionaries to fill into the Anki note.
> It forks from [WordQuery](https://ankiweb.net/shared/info/775418273), added **multi-thread** feature, improve stability, and some other features.




## Contributors

@Ge Gao designed the icon for Vocabulary Picker.

@Zhengyuan is main tester of the Vocabulary Picker.

@Boyan Xu designed the architecture of Vocabulary Picker and implemented it.


<br/>
<br/>


# Vocabulary Manager

Vocabulary Manager 是一个跨平台（Mac/Win/Linux）的桌面应用，用于管理从 [Vocabulary Picker](https://github.com/BoyanXu/vocabulary-picker) 收集的词汇。同时，Vocabulary Manager 也支持将自身管理的单词数据批量地导出为 抽认卡软件 [Anki](https://apps.ankiweb.net/) 可以识别的`.txt` 文件，以便用户对词汇进行更为灵活的管理。

具体使用方法，参见视频教程：http://www.iqiyi.com/w_19s9sjbog9.html

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


## 贡献者


@高歌 为 Vocabulary Picker 设计了图标。

@正源 是 Vocabulary Picker 的主要测试者.

@Boyan 设计并实现了 Vocabulary Picker 的架构。

