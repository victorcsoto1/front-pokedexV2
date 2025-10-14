export default function LoaderScreen () {
    return (
        <div className="background__loader">
            <div className="text-center">
                <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="">
                    <p>Cargando ...</p>
                </div>
            </div>
        </div>
    )
}