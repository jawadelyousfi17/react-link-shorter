import { CircularProgress } from "@mui/joy"

const Loader = () => {
    return (
        <div className="w-full flex items-center justify-center py-32">
            <CircularProgress />
        </div>
    )
}

export default Loader