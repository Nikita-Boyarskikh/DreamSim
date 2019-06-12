import pytest
from django.core.exceptions import ValidationError

from apps.core.tests.factories import ElementFactory
from apps.core.validators import TRUTH_TABLE_INPUT_STATES_ERROR, TRUTH_TABLE_OUTPUT_STATES_ERROR
from lib.models.validators import ARRAY_FIELD_SIZE_ERROR, BIN_ERROR
from lib.test.utils import create_validation_message

pytestmark = pytest.mark.django_db


class TestElement:
    def test_truth_table_valid(self):
        element = ElementFactory.build(
            array_of_inputs=['A', 'B'],
            array_of_outputs=['C1', 'C2'],
            truth_table=[
                # 1st tact
                [
                    # AB AB AB AB
                    # 00 01 10 11
                    [1, 0, 1, 0],  # C1
                    [1, 0, 1, 0],  # C2
                ],
                # 2nd tact
                [
                    # AB AB AB AB
                    # 00 01 10 11
                    [0, 0, 1, 0],  # C1
                    [0, 1, 1, 1],  # C2
                ]
            ])
        element.full_clean()

    def test_truth_table_wrong_type(self):
        element = ElementFactory.build(truth_table='wrong value')
        with pytest.raises(ValidationError, match=ARRAY_FIELD_SIZE_ERROR.format(3)):
            element.full_clean()

    def test_truth_table_wrong_size(self):
        element = ElementFactory.build(truth_table=[[[[1]]]])
        with pytest.raises(ValidationError, match=BIN_ERROR):
            element.full_clean()

    def test_truth_table_less_input_states(self):
        element = ElementFactory.build(array_of_inputs=['A'], array_of_outputs=['C'], truth_table=[[[1]]])
        expected_errors = {
            '__all__': [TRUTH_TABLE_INPUT_STATES_ERROR]
        }
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            element.full_clean()

    def test_truth_table_more_input_states(self):
        element = ElementFactory.build(array_of_inputs=[], array_of_outputs=['C'], truth_table=[[[1, 0]]])
        expected_errors = {
            '__all__': [TRUTH_TABLE_INPUT_STATES_ERROR]
        }
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            element.full_clean()

    def test_truth_table_many_input_states(self):
        element = ElementFactory.build(
            array_of_inputs=['A', 'B'],
            array_of_outputs=['C'],
            truth_table=[[[1, 0]], [[1]]]
        )
        expected_errors = {
            '__all__': [TRUTH_TABLE_INPUT_STATES_ERROR]
        }
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            element.full_clean()

    def test_truth_table_less_output_states(self):
        element = ElementFactory.build(array_of_inputs=[], array_of_outputs=['C1', 'C2'], truth_table=[[[1]]])
        expected_errors = {
            '__all__': [TRUTH_TABLE_OUTPUT_STATES_ERROR]
        }
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            element.full_clean()

    def test_truth_table_more_output_states(self):
        element = ElementFactory.build(array_of_inputs=[], array_of_outputs=['C1'], truth_table=[[[1], [1]]])
        expected_errors = {
            '__all__': [TRUTH_TABLE_OUTPUT_STATES_ERROR]
        }
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            element.full_clean()

    def test_truth_table_many_output_states(self):
        element = ElementFactory.build(
            array_of_inputs=[],
            array_of_outputs=['C1', 'C2'],
            truth_table=[[[0], [1]], [[1]]]
        )
        expected_errors = {
            '__all__': [TRUTH_TABLE_OUTPUT_STATES_ERROR]
        }
        with pytest.raises(ValidationError, match=create_validation_message(expected_errors)):
            element.full_clean()
