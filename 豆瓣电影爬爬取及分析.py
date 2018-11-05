#! /usr/bin/env python
# -*- coding: utf-8 -*-
import pyquery
import os.path
import requests
import json
import pprint
import time

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) '
                         'Chrome/66.0.3359.181 Safari/537.36'}


# 1、从一排数据获得每个电影的详细信息
# 2、遍历所有数据字典，如果返回为空则退出
# 3、每次请求成功则把数据下载到本地
def cached(index, url):
    filename = str(index) + '.html'
    dir_name = 'movies'
    path = os.path.join(dir_name, filename)
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)
    if not os.path.exists(path):
        with open(path, 'w') as f:
            res = requests.get(url, headers).content.decode('utf8')
            f.write(res)
            return res
    else:
        with open(path, 'r') as f:
            return f.read()


def parse_ajax(raw):
    response_json = json.loads(raw)
    infos = []
    for item in response_json['data']:
        info = dict(
            directors=item['directors'],
            rate=item['rate'],
            title=item['title'],
            casts=item['casts'],
            cover=item['cover'],
        )
        infos.append(info)
    return infos


def get_url():
    u = 'https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=电影&start={index}&genres=剧情&year_range=2000,2017'
    i = 0
    flag = True
    while flag:
        url = u.format(index=str(i))
        raw = cached(i, url)
        if raw == '{"data":[]}':
            break
        parsed_data = parse_ajax(raw)
        with open('parsed/{}'.format(str(i) + '.text'), 'w') as f:
            f.write(json.dumps(parsed_data, ensure_ascii=False, indent=2))
            print('写入文件{}'.format(i))
        i += 20


# 数据总量9976部，有效评分数据量为8291部
# 极品占比0.6% 优品占比7.2% 良品占比28.8% 常规占比33% 次品占比30.4% 最高分9.7 最低分2.1


# 电影总量
def all_moive():
    movies = []
    for i in range(0, 9961, 20):
        with open('parsed/{}.text'.format(str(i)), 'r') as f:
            file_movies = json.loads(f.read())
            for m in file_movies:
                movies.append(m)
    return movies


# 有效电影总量
def valid_movies():
    valid = 0
    unvalid = 0
    movies = []
    for i in all_moive():
        if i['rate'] != '':
            valid += 1
            movies.append(i)
        else:
            unvalid += 1
    print(movies)
    return movies


def get_img(cover, title):
    print('Strat!', title)
    if os.path.exists('img/{}.jpg'.format(title)):
        print('exists:', title)
        return
    r = requests.get(cover, headers)
    image = r.content
    if title == '元气少女缘结神OVA：神明，被丢弃/神明，去泡温泉d':
        title = '元气少女'
    with open('img/{}.jpg'.format(title), 'wb') as f:
        f.write(image)
        print('图片写入成功：', title)


# 各区间电影占比
def rate_rank():
    awesome = 0
    great = 0
    good = 0
    normal = 0
    bad = 0
    sum = 8291
    rates = []
    great2watch = []
    for i in valid_movies():
        rate = float(i['rate'])
        rates.append(rate)
        if rate >= 9:
            awesome += 1
            if rate >= 8.5:
                great2watch.append({i['title']: rate, 'cover': i['cover']})
                get_img(i['cover'], i['title'])
        elif rate >= 8:
            great += 1
            if rate >= 8.5:
                great2watch.append({i['title']: rate, 'cover': i['cover']})
                get_img(i['cover'], i['title'])
        elif rate >= 7:
            good += 1
        elif rate >= 6:
            normal += 1
        else:
            bad += 1
    awesome = awesome / sum
    great = great / sum
    good = good / sum
    normal = normal / sum
    bad = bad / sum
    # print('max:', max(*rates))
    # print('min:', min(*rates))
    print('推荐观看：', great2watch)


# 谁导演的电影值得看
def good_directors():
    dirs = {}
    bad_dirs = {}
    for i in valid_movies():
        rate = float(i['rate'])
        directors = i['directors']
        works = i['title']
        if rate >= 8 and len(directors) >= 1:
            if dirs.get(directors[0], None) is None:
                dirs.update(dict([
                    (directors[0], [
                        1,
                        dict(
                            movie=works,
                            rate=rate,
                        )]
                     )
                ]))
            else:
                dirs[directors[0]][0] += 1
                dirs[directors[0]].append(dict(
                    movie=works,
                    rate=rate,
                ))
        elif rate <= 5.5 and len(directors) >= 1:
            if bad_dirs.get(directors[0], None) is None:
                bad_dirs.update(dict([
                    (directors[0], [
                        1,
                        dict(
                            movie=works,
                            rate=rate,
                        )]
                     )
                ]))
            else:
                bad_dirs[directors[0]][0] += 1
                bad_dirs[directors[0]].append(dict(
                    movie=works,
                    rate=rate,
                ))
    better = []
    bad = []
    for k, v in dirs.items():
        if v[0] >= 4:
            better.append({k: v})
    for k, v in bad_dirs.items():
        if v[0] >= 3:
            bad.append({k: v})
    print('很好的导演：', better)
    print('辣鸡导演：', bad)


def good_casts():
    better_casts = {}
    bad_casts = {}
    for i in valid_movies():
        rate = float(i['rate'])
        movie = i['title']
        casts = i['casts']
        if rate >= 8:
            for j in casts:
                if better_casts.get(j, None) is None:
                    better_casts.update(dict([
                        (j, [
                            1,
                            dict(
                                movie=movie,
                                rate=rate,
                            )])
                    ]))
                else:
                    better_casts[j][0] += 1
                    better_casts[j].append(dict(
                        movie=movie,
                        rate=rate
                    ))
        elif rate <= 5.5:
            for j in casts:
                if bad_casts.get(j, None) is None:
                    bad_casts.update(dict([
                        (j, [
                            1,
                            dict(
                                movie=movie,
                                rate=rate,
                            )])
                    ]))
                else:
                    bad_casts[j][0] += 1
                    bad_casts[j].append(dict(
                        movie=movie,
                        rate=rate
                    ))
    better = []
    bad = []
    for k in better_casts:
        if better_casts[k][0] >= 4:
            better.append({k: better_casts[k]})
    for v in bad_casts:
        if bad_casts[v][0] >= 4:
            bad.append({v: bad_casts[v]})
    print('好演员：', better)
    print('辣鸡：', bad)


# 1、哪位导演的电影质量较高\较差 done
# 2、哪位演员参演的电影质量较高\较差 done
# 3、最高分\最低分电影 done
# 4、8.5分以上的精品电影 done
# 5、9分以上、8~9分、7~8分、6~7分、6分以下占比 done


if __name__ == '__main__':
    # get_url()
    # all_moive()
    # valid_movies()
    rate_rank()
    # good_directors()
    # good_casts()
