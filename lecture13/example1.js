/* 
Inserting record:
========================
The steps to insert a new record are same as selecting a record.
Here also if the values are dynamic then we can use placeholders.

However as a result we do not get a RowDataPacket object , rather we get a normal JS object with some key-value pairs .
The most useful is the affectedRows property which returns total  number of rows effected



*/