

const ParameterCard = ({ icon, unit, title, data }) => {
    return (
        <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform cursor-default">
            <div className="text-green-700">{icon}</div>
            <h2 className="text-xl font-semibold text-green-900 mb-2">{title}</h2>
            <p className="text-3xl font-bold text-green-800">
                {data}{unit}
            </p>
        </div>
    )
}

export default ParameterCard