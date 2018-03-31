import * as log4js from 'log4js';
import { TextModel } from "../models/Text";
import { PackageModel } from "../models/Package";

let log = log4js.getLogger('default');
const defaultLang = 'zh-cn';
const defaultTemplate: PackageModel.ITemplate = {
  head: '{',
  line: '"${key}": "${value}"',
  join: ',',
  foot: '}'
};

class OutputService {
  static render(
    texts: TextModel.IText[],
    lang: string,
    template: PackageModel.ITemplate,
  ): string {
    log.debug('[OutputService.render]Input arguments: ', arguments);
    let {
      head = defaultTemplate.head,
      line = defaultTemplate.line,
      join = defaultTemplate.join,
      foot = defaultTemplate.foot,
    } = template;
    let outputs = [];
    if (lang === defaultLang) {
      outputs = texts.map((text) => {
        return {
          key: text.key,
          value: text.text,
        };
      });
    } else {
      texts.map((text) => {
        let { translates } = text;
        let translate = translates.find(translate => translate.lang === lang);
        if (translate) {
          outputs.push({
            key: text.key,
            value: translate.text,
          });
        }
      });
    }

    let lines = outputs.map(output => {
      return line.replace(/\$\{(\w+)\}/g, (a, b) => {
        return output[b];
      })
    });

    return head + lines.join(join) + foot;
  }
}

export default OutputService;
