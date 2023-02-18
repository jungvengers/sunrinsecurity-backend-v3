import { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions';
import { SimpleColumnType } from 'typeorm/driver/types/ColumnTypes';

const realTypeORM = jest.requireActual('typeorm');

module.exports = {
  ...realTypeORM,
  Column: (type: SimpleColumnType, options?: ColumnCommonOptions) => {
    if (type === 'json') type = 'simple-json';
    if (type === 'enum') type = 'simple-enum';
    return realTypeORM.Column(type, options);
  },
};
