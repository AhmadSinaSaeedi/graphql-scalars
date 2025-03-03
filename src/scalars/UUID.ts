import {
  Kind,
  GraphQLError,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';

const validate = (value: any) => {
  const UUID_REGEX =
    /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;

  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  if (value.startsWith('{')) {
    value = value.substring(1, value.length - 1);
  }

  if (!UUID_REGEX.test(value)) {
    throw new TypeError(`Value is not a valid UUID: ${value}`);
  }

  return value;
};

export const GraphQLUUIDConfig: GraphQLScalarTypeConfig<string, string> =
  /*#__PURE__*/ {
    name: `UUID`,

    description: `A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier.`,

    serialize(value) {
      return validate(value);
    },

    parseValue(value) {
      return validate(value);
    },

    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          `Can only validate strings as UUIDs but got a: ${ast.kind}`,
        );
      }

      return validate(ast.value);
    },
    extensions: {
      codegenScalarType: 'string',
    },
  };

export const GraphQLUUID = /*#__PURE__*/ new GraphQLScalarType(
  GraphQLUUIDConfig,
);
