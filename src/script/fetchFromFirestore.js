import { firestore } from "./firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const fetchLatestData = async () => {
    try {
        const weatherCollection = collection(firestore, "weather_data");
        const q = query(
            weatherCollection,
            orderBy("timestamp", "desc"),
            limit(5)
        );

        const querySnapshot = await getDocs(q);
        const data = [];

        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            data.push({ ...docData, id: doc.id });
        });

        return data.reverse();
    } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        return [];
    }
};

export default fetchLatestData;
