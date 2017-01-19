### USERS
|uid|name|total|
|:-|:-|:-|
|abc123|Brandon|$4500.00|

#### SCHEMA
```sql
CREATE TABLE users (
  uid VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  total MONEY NOT NULL DEFAULT 0.00
);
```

### TRANSACTIONS

|uid|tid|type|category|icon|amount|notes|date|
|:-|:-|:-|:-|:-|:-|:-|:-|
|abc123|123|INCOME|salary|fa-money|4600|all da monies|12/12/12|
|abc123|456|EXPENSE|alcohol|fa-drinks|100|booooze|12/12/13|

#### SCHEMA

```sql
CREATE TABLE transactions (
  uid VARCHAR(255) NOT NULL,      -- the user's id
  tid VARCHAR(255) NOT NULL,      -- transaction id
  category VARCHAR(32) NOT NULL,  -- transaction category (drinks, salary, etc.)
  type VARCHAR(7) NOT NULL,       -- transaction type (INCOME | EXPENSE)
  icon VARCHAR(30) NOT NULL,      -- transaction icon (fa-drinks, fa-salary, etc.)
  amount MONEY NOT NULL,          -- transaction amount (3.14)
  date VARCHAR(50) NOT NULL,      -- transaction date ('Sun Jan 15 2017 09:09:22 GMT-0800 (PST)')
  notes VARCHAR(255)              -- transaction notes
);
```

### SAMPLE QUERY ALL TRANSACTIONS BY USER ID
```sql
SELECT * FROM transactions
INNER JOIN users
ON users.uid = transactions.uid
WHERE users.uid = 'abc123'
ORDER BY transaction.date
LIMIT 500 -- or whatever
```

### RESULT
|tid|uid|type|category|icon|amount|notes|date|total|
|:-|:-|:-|:-|:-|:-|:-|:-|:-|
|1|abc123|INCOME|salary|fa-money|4600|all da monies|12/12/12|$4500.00|
|2|abc123|EXPENSE|alcohol|fa-drinks|100|booooze|12/12/13|$4500.00|
