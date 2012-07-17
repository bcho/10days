#coding: utf-8

import json


IN_SUFFIX = '.txt'
OUT_SUFFIX = '.json'


def _read(name):
    f = file(name, 'r')
    lines = f.readlines()
    ret = []
    tmp = ''
    for line in lines:
        if line != '\n':
            tmp += line
        else:
            ret.append(tmp)
            tmp = ''
    ret.append(tmp)
    f.close()
    return ret


def _build_dict(name, answers):
    return {
            'name': name,
            '#q1': answers[0],
            '#q2': answers[1],
            '#q3': answers[2]
            }


def _write(name, data):
    f = file(name, 'w')
    f.write(json.dumps(data))
    f.close()
    return


def _main():
    build_in_name = lambda x: str(x) + IN_SUFFIX
    build_out_name = lambda x: 'day' + str(x) + OUT_SUFFIX
    build_day_name = lambda x: 'Day ' + str(x)

    for i in range(1, 10):
        in_name = build_in_name(i)
        out_name = build_out_name(i)
        day_name = build_day_name(i)
        read_data = _read(in_name)
        json_data = _build_dict(day_name, read_data)
        _write(out_name, json_data)

    return


if __name__ == '__main__':
    _main()
