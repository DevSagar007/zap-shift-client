import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignRIders = () => {
  const axiosSecure = useAxiosSecure();
  
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?deliveryStatus=pending-pickup");
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-5">Assign Riders {parcels.length}</h2>
    </div>
  );
};

export default AssignRIders;
