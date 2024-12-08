import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Fungsi untuk memformat timestamp ke format waktu "HH:mm:ss"
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour12: false }); // Format 24 jam
};

const WeatherGraph = ({ data }) => {
    const isMobile = window.innerWidth < 768;

    return (
        <div className="w-full mt-8">
            <ResponsiveContainer width="95%" height={250}>
                <LineChart data={data}>
                    {!isMobile && <CartesianGrid strokeDasharray="3 3" />}
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatTimestamp}
                    />
                    <YAxis />
                    <Tooltip labelFormatter={(value) => formatTimestamp(value)} />
                    {!isMobile && <Legend verticalAlign="top" height={36} />}
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        name="Suhu (°C)"
                        stroke="#8884d8"
                        strokeWidth={3}
                    />
                    <Line
                        type="monotone"
                        dataKey="humidity"
                        name="Kelembaban (%)"
                        stroke="#82ca9d"
                        strokeWidth={3}
                    />
                    <Line
                        type="monotone"
                        dataKey="rainfallPercentage"
                        name="Persentase Hujan (%)"
                        stroke="#FFA500"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeatherGraph;