import { GetUserByIdDtoSchema } from '@modules/user/dto';
import { getByRef } from 'src/docs/shared';
import { usersSchemas } from './user.schema.docs';

const usersTag = 'Users';

export const usersDocs = {
  tags: [{ name: usersTag }],
  paths: {
    '/users': {
      get: {
        security: [
          {
            // @ts-ignore
            cookieAuth: [],
          },
        ],
        operationId: 'getAllUsers',
        tags: [usersTag],
        summary: 'Gets all users',
        responses: {
          '200': {
            description: 'All users response',
            content: {
              'application/json': {
                schema: {
                  $ref: getByRef('UsersResponse'),
                },
              },
            },
          },
        },
      },
      post: {
        operationId: 'createUser',
        tags: [usersTag],
        summary: 'Creates a user',
        requestBody: {
          description: 'Data to create a new user',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: getByRef('CreateUserDto'),
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created user response',
            content: {
              'application/json': {
                schema: {
                  $ref: getByRef('UserResponse'),
                },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        operationId: 'getUserById',
        tags: [usersTag],
        summary: 'Get single user by id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'User id',
            schema: {
              $ref: getByRef('UUID'),
            },
          },
        ],
        responses: {
          '200': {
            description: 'User response',
            content: {
              'application/json': {
                schema: {
                  $ref: getByRef('UserResponse'),
                },
              },
            },
          },
        },
      },
      delete: {
        operationId: 'deleteOneUser',
        tags: [usersTag],
        summary: 'Deletes single user by id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'User id',
            schema: {
              $ref: getByRef('UUID'),
            },
          },
        ],
        responses: {
          '200': {
            description: 'Deleted user response',
            content: {
              'application/json': {
                schema: {
                  $ref: getByRef('DeletedUserResponse'),
                },
              },
            },
          },
        },
      },
      patch: {
        operationId: 'updateOneUser',
        tags: [usersTag],
        summary: 'Updates single user by id',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'User id',
            schema: {
              $ref: getByRef('UUID'),
            },
          },
        ],
        requestBody: {
          description: 'Data to update a user',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: getByRef('UpdateUserDto'),
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User response',
            content: {
              'application/json': {
                schema: {
                  $ref: getByRef('UserResponse'),
                },
              },
            },
          },
        },
      },
    },
    '/users/auth/sign-in': {
      post: {
        operationId: 'singIn',
        tags: [usersTag],
        summary: 'Sign in',
        requestBody: {
          description: 'Data to sign in user',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: getByRef('SignInDto'),
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Token response',
            content: {
              'application/json': {
                schema: {
                  $ref: getByRef('TokenResponse'),
                },
              },
            },
            headers: {
              'Set-Cookie': {
                schema: {
                  type: 'string',
                  example:
                    'token={EXAMPLE_TOKEN}; Path=/; HttpOnly; Domain=localhost',
                },
              },
            },
          },
        },
      },
    },
    '/users/auth/sign-out': {
      post: {
        operationId: 'signOut',
        tags: [usersTag],
        summary: 'Sign out',
        responses: {
          '200': {
            description: 'Token response',
            headers: {
              'Set-Cookie': {
                schema: {
                  type: 'string',
                  example: 'token=NULL; Path=/; HttpOnly; Domain=localhost',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ...usersSchemas,
    },
  },
};
