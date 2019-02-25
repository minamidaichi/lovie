import MeCab
import re
import datetime
import json
from fms.models import DirTag
from fms.models import FileDir
from config.settings import DICT_PATH


def wakati(text):
    """
    wakati 分かち書きの処理
    params:
            text<string>: 分かち書きする文字列

    return:
            keywords<list>: 単語のリスト
    """
    tagger = MeCab.Tagger('-Owakati -d {path}'.format(path=DICT_PATH))
    node = tagger.parse(text)
    keywords = []
    error = ["・",r"[0-9]",r"[０-９]","％",".",",","*",r"[ぁ-ん]",r"[ァ-ヶ]","_","(",
             ")","-","０","１","２","３","４","５","６","７","８","９","①","②","③"]
    for word in node.split():
        if word not in error and re.match('.*\d+', word) == None:
            keywords.append(word)

    return keywords


def support_datetime_default(date):
    """
    support_datetime_default json.dumpsするときにdatetimeをフォーマットする関数
    json.dumpsのdefault引数に関数を与えることで、対応していない型に対するコールバックを設定する事ができる
    """
    if isinstance(date, datetime.datetime):
        return date.isoformat()
    raise TypeError(repr(date) + " is not JSON serializable")


def get_lower_dir(dir_path):
    """
    get_lower_dir 下の階層のディレクトリ構成を取得する関数
    params:
            dir_path<string>: 現在のフォルダパス
    
    return:
            dir_list<list>: dir_pathの下にあるファイルやフォルダのリスト
    """
    dir_info = list(FileDir.objects.filter(path=dir_path).values())
    if len(dir_info) != 0:
        parent_id = dir_info[0]["id"]
        dir_list = list(FileDir.objects.filter(parent_id=parent_id).values())
        return dir_list
    else:
        dir_list = list(FileDir.objects.filter(parent_id=None).values())
        return dir_list


def dir_suggest(file_names):
    """
    dir_suggest 保存先のファイルパスを提案する関数
    params:
            file_names<list>: サジェスト対象のファイル名リスト

    return:
            ret_suggest_paths<json>: 提案するファイルパス
    """
    #提案候補パスのscoreを集計
    candidate_paths = {}
    for file_name in file_names:
        candidate_paths[file_name] = {}
        for word in wakati(str(file_name)): 
            searched_values = DirTag.objects.filter(word=word).values()
            for value in searched_values:
                if value['dir_path'] not in candidate_paths[file_name]:
                    candidate_paths[file_name][value['dir_path']] = value['tfidf_val']
                else: candidate_paths[file_name][value['dir_path']] += value['tfidf_val']
        #提案するパスがない場合はrootを返す
        if not candidate_paths[file_name]:
            candidate_paths[file_name] = {'root': 0}
    
    #提案対象を選定（score上位3つ）
    suggest_paths = {"response": []}
    for file_name in candidate_paths:
        sorted_list = sorted(candidate_paths[file_name].items(), key=lambda x:x[1], reverse=True)[:3]
        suggest_info = {}
        suggest_info["filename"] = str(file_name)
        suggest_info["options"] = []
        for path, score in sorted_list:
            suggest_info["options"].append({"path": path, "score": score, "lower": get_lower_dir(path)})

        suggest_paths["response"].append(suggest_info)

    return suggest_paths