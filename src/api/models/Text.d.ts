declare namespace TextModel {
  interface ITranslate {
    text: string
    lang: string
  }

  interface IText {
    text: string
    translates: [ITranslate]
  }
}
