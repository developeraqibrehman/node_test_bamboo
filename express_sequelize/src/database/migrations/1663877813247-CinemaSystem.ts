import { literal, QueryInterface } from 'sequelize';
import { ModelAttributes } from 'sequelize/types/model';
export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('auditorium', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      url: { type: 'varchar' },
      capacity: {
        type: 'integer',
        allowNull: false,
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
    await queryInterface.createTable('rows', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      number: {  type: 'integer',
      allowNull: false,},
      seats: {  type: 'integer',
      allowNull: false, },
      auditoriumId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'auditorium',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
    await queryInterface.createTable('seat_types', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: {  type: 'varchar',
      allowNull: false, },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
    await queryInterface.createTable('seats', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      number: {  type: 'integer',
      allowNull: false,},
      name: {  type: 'varchar',
      allowNull: false, },
      rowId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'rows',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      seatTypeId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'seat_types',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
    await queryInterface.createTable('customers', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {  type: 'varchar' },
      lastName: {  type: 'varchar' },
      email: {  type: 'varchar' },
      mobile: {  type: 'varchar' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
    await queryInterface.createTable('movies', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: {  type: 'varchar' },
      description: {  type: 'varchar' },
      minutes: {  type: 'integer' },
      publishedYear: {  type: 'integer' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
    await queryInterface.createTable('reservations', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      seatId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'seats',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      movieId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'movies',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      customerId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'customers',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
    await queryInterface.createTable('movie_schedule', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      movieId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'movies',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      auditoriumId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'auditorium',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      startTime: {
        type: "timestamp",
      },
      endTime: {
        type: "timestamp",
      },
      default_price: {
        type:"float"
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
