
exports.up = knex => knex.schema.createTable('movie_tags', table => {
    table.increments('id')
    table.integer('user_id').references('id').inTable('users') //user_id faz referência ao id da outra tabela users
    table.integer('note_id').references('id').inTable('notes').onDelete('CASCADE') //user_id faz referência ao id da outra tabela users
    table.text('movie_genre').notNullable()
})

exports.down = knex => knex.schema.dropTable('movie_tags')
