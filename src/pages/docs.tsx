import DeveloperList from "@/coments/DeveloperList";
import { Input } from "antd";

const DocsPage = () => {


  const c: Person = { firstName: 'Иван', lastName: 'Иванов', midName: 'Иванович', age: 20 };
 
  return (
    
    <div>
      <p>Автор программы - {c.lastName} {c.firstName} {c.midName} </p>
   <DeveloperList />
   <Input />
    </div>
  );
};

export default DocsPage;
