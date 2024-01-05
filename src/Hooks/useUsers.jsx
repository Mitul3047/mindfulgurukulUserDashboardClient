
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
    const { data: users = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await axios.get('https://mindgulusertaskapi.vercel.app/users'); // Use the localhost API endpoint
                return res.data;
            } catch (error) {
                console.error("Error fetching users:", error);
                throw error;
            }
        }
    });

    return [users, loading, refetch];
};

export default useUser;
