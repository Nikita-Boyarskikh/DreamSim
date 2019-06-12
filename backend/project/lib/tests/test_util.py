from lib.util import clean_dict, omit_keys, only_keys


def test_clean_dict():
    assert clean_dict({'A': None, 'B': 1, 'C': [], 'D': False, 'E': 0}) == {'B': 1, 'C': [], 'D': False, 'E': 0}


def test_omit_keys():
    assert omit_keys({'A': 1, 'B': 2, 'C': 3}, {'A', 'C', 'E'}) == {'B': 2}


def test_only_keys():
    assert only_keys({
        'A': 1,
        'B': {'C': 3, 'E': ''},
        'D': False
    }, {'B', 'C', 'D'}) == {
        'B': {'C': 3, 'E': ''},
        'D': False
    }
