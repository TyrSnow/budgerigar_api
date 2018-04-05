import PackageService from "./package.service";
import CODE from "../constants/Code.enum";
import TextService from "./text.service";
import { TextModel } from "../models/Text";
import { LanguageModel } from "../models/Language";

class StatisticsService {
  private static stat_text_language(
    text: TextModel.IText,
    stat: object,
  ) {
    let { translates } = text;
    translates.map(translate => {
      if (!stat[translate.lang]) {
        stat[translate.lang] = 0;
      }
      stat[translate.lang]+= 1;
    });
    return stat;
  }

  private static stat_texts(
    textList: Array<TextModel.IText>,
  ) {
    let stat = {};
    textList.map(text => {
      StatisticsService.stat_text_language(text, stat);
    });
    return stat;
  }

  private static mask_stat_languages(
    stat: object,
    languages: Array<LanguageModel.ILanguage>,
  ): object {
    let res = {};
    languages.map(language => {
      if (stat[language.code]) {
        res[language.code] = stat[language.code];
      } else {
        res[language.code] = 0;
      }
    });

    return res;
  }

  private static sum_stats(
    stats: Array<object>,
  ): object {
    let res = {};
    stats.map(stat => {
      for (let key in stat) {
        if (!res[key]) {
          res[key] = 0;
        }
        res[key]+= stat[key];
      }
    });

    return res;
  }

  static async stat_package_text(
    package_id: string,
  ) {
    try {
      let pack = await PackageService.get_package(package_id);
      if (pack) {
        const { texts, languages } = pack;
        let textList = await TextService.list_by_ids(<Array<string>>texts);
        let stat = StatisticsService.stat_texts(textList);

        return Promise.resolve(
          StatisticsService.mask_stat_languages(
            stat,
            <Array<LanguageModel.ILanguage>>languages,
          ),
        );
      }
      return Promise.reject(CODE.PACKAGE_NOT_EXIST);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async stat_project_text(
    project_id: string,
  ) {
    try {
      let packs = await PackageService.list_project_packages(project_id);
      let stats = packs.map(async (pack) => {
        const { texts, languages } = pack;
        let textList = await TextService.list_by_ids(<Array<string>>texts);
        return StatisticsService.mask_stat_languages(
          StatisticsService.stat_texts(textList),
          <Array<LanguageModel.ILanguage>>languages,
        );
      });

      return Promise.resolve(StatisticsService.sum_stats(
        stats,
      ));
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default StatisticsService;
