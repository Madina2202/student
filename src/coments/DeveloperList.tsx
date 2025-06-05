

export default function ()  {


  const c: Person = { firstName: 'Иван', lastName: 'Иванов', midName: 'Иванович', age: 20 };
  const d = [
    { firstName: 'Иван', lastName: 'Иванов', midName: 'Иванович', age: 20 },
    { firstName: 'Петр', lastName: 'Петров', midName: 'Иванович', age: 20 },
    { firstName: 'Дмитрий', lastName: 'Дмитриев', midName: 'Иванович', age: 20 }
  ]
  return (
    
    <>
    {d.map((row: Person) => <div> {row.lastName} {row.firstName} {row.midName}</div>)}
    </>
  );
};


