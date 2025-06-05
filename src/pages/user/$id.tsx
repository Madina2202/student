import DeveloperList from "@/coments/DeveloperList";
import { Input } from "antd";
import { useParams } from "umi";

export default function () {
  const params = useParams();

  return (
    
    <div>
      {params.id}
    </div>
  );
};


