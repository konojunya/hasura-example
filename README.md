# hasura-example

[CODE SANDBOX] hasura example

## hasura on docker-compose

https://hasura.io/docs/latest/getting-started/docker-simple/

### Query / Mutation

- user insert

```graphql
mutation {
  insert_users(objects: [{ id: "1", name: "JJ" }]) {
    affected_rows
  }
}
```

- user select

```graphql
query {
  users {
    id
    name
    created_at
  }
}
```

- user subscription

```graphql
subscription {
  users {
    id
    name
    created_at
  }
}
```

- todos insert

```graphql
mutation {
  insert_todos(objects: [{ title: "My First Todo", user_id: "1" }]) {
    affected_rows
  }
}
```

- todos select

```graphql
query {
  todos {
    id
    title
    is_public
    is_completed
    user_id
  }
}
```

- todos subscription

```graphql
subscription {
  todos {
    id
    title
    is_public
    is_completed
    user_id
  }
}
```

- object relationship

```graphql
query {
  todos {
    id
    title
    user {
      id
      name
    }
  }
}
```

- create online_users view

```sql
CREATE OR REPLACE VIEW "public"."online_users" AS
 SELECT users.id,
    users.last_seen
   FROM users
  WHERE (users.last_seen >= (now() - '00:00:30'::interval));
```

- online users subscription

```graphql
subscription {
  online_users {
    id
    last_seen
  }
}
```

- online_users relationship

```graphql
query {
  online_users {
    id
    last_seen
    user {
      id
      name
    }
  }
}
```
