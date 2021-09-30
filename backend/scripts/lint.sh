#!/bin/bash
function has_bit {
    local mask=$((1 << ($2 - 1)))
    echo $(($1 & $mask != 0))
}

function pylint_success {
    local no_error=$(($1 == 0))
    local fatal=$(has_bit $1 1)
    local error=$(has_bit $1 2)
    local warning=$(has_bit $1 3)
    local refactor=$(has_bit $1 4)
    local convention=$(has_bit $1 5)
    local usage=$(has_bit $1 6)

    echo $((!$fatal && !$error && !$usage))
}

function lint {
    export PYTHONPATH=$(realpath ./project)

    yapf -pir project &&\

    local error=$?
    if [ $error != 0 ]; then
        return $error
    fi

    pylint project

    local pylint_result=$?
    if (( $(pylint_success $pylint_result) == 0 )); then
        return $pylint_result
    fi

    bandit -r project
}

lint
