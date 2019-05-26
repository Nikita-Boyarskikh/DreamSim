from django.core.exceptions import ValidationError

PIN_INDEX_ERROR = 'Индекс пина должен быть меньше количества пинов на элементе'
TRUTH_TABLE_OUTPUT_STATES_ERROR = 'Количество состояний выходов должно быть равно количеству выходных сигналов)'
TRUTH_TABLE_INPUT_STATES_ERROR = 'Количество возможных комбинаций вх. сигналов д.б. = 2^(количество входных сигналов)'


def validate_input_pin(model):
    if model.input_pin >= len(model.input_scheme_element.element.array_of_inputs):
        raise ValidationError(PIN_INDEX_ERROR)


def validate_output_pin(model):
    if model.output_pin >= len(model.output_scheme_element.element.array_of_outputs):
        raise ValidationError(PIN_INDEX_ERROR)


def validate_truth_table(model):
    for state in model.truth_table:
        if len(state) != len(model.array_of_outputs):
            raise ValidationError(TRUTH_TABLE_OUTPUT_STATES_ERROR)

        for out in state:
            if len(out) != 2**len(model.array_of_inputs):
                raise ValidationError(TRUTH_TABLE_INPUT_STATES_ERROR)
