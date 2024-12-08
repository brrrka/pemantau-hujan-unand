import { firestore } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const saveToFirestore = async (data) => {
    try {
        const timestamp = new Date().toISOString();
        const weatherDoc = doc(firestore, 'weather_data', timestamp); // Gunakan timestamp sebagai ID dokumen

        await setDoc(weatherDoc, {
            ...data,
            timestamp, // Tambahkan timestamp ke data
        });
        console.log('Data berhasil disimpan ke Firestore');
    } catch (error) {
        console.error('Error menyimpan ke Firestore:', error);
    }
};

export default saveToFirestore;