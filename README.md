<p align="center">
  <img src="https://i.imgur.com/Nn9c78Q.png">
</p>

<br/>

# Vocabulary Manager

Vocabulary Manager is a cross-platform (Mac/Win/Linux) desktop application that manages vocabularies collected by vocabulary-picker. It also support export records to Anki for more flexible management.

Check the Video Tutorial for more help: https://www.youtube.com/watch?v=zhhA5mQWdlw&t=44s

_Read this page in other languages：_ [English](https://github.com/BoyanXu/vocabulary-manager/blob/master/README.md), [简体中文](https://github.com/BoyanXu/vocabulary-manager/blob/master/README-zh-cn.md), [繁體中文](https://github.com/BoyanXu/vocabulary-manager/blob/master/README-zh-tr.md)

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

<br/>

## Contributors

@Ge Gao designed the icon for Vocabulary Picker.

@Zhengyuan is main tester of the Vocabulary Picker.

@Boyan Xu designed the architecture of Vocabulary Picker and implemented it.

<br/>
<br/>
