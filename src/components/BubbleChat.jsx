import LogoUnand from '../assets/Logo_Unand.svg'

const BubbleChat = ({ data }) => {
    return (
        <div className="space-y-6 flex flex-col w-96 md:w-1/2 ">
            <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4 ">
                    <span className="text-gray-600 text-lg font-semibold">U</span>
                </div>
                <div className="bg-green-100 text-green-900 p-4 rounded-xl max-w-lg hover:scale-105 transition-transform cursor-default">
                    <p className="text-sm font-medium">User:</p>
                    <p className='font-sans'>Lai hujan diateh sanak?</p>
                </div>
            </div>

            <div className="flex items-start justify-end">
                <div className="bg-gray-200 text-gray-800 p-4 rounded-xl max-w-lg mr-4 hover:scale-105 transition-transform cursor-default">
                    <p className="text-sm font-medium">Pawang Hujan Unand:</p>
                    {data === 'Tidak Hujan' ? (<p>Sadang indak hujan do sanak</p>) : data === 'Gerimis' ? (<p>Sadang rinai, bagageh lah ka ateh lai</p>) : data === 'Hujan' ? (<p>Iyo hujan, pakailah mantel kalau nio kamari</p>) : (<p>Iyo sabana kancang kini, beko se ka ateh dih</p>)}
                </div>
                <div className="w-12 h-12">
                    <img
                        src={LogoUnand}
                        alt="Logo Universitas Andalas"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default BubbleChat;