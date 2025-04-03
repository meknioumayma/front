import UserChannels from './components/UserChannels'

function DashboardRh() {
    return (
        <>
            {/** ---------------------- User source channels table ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
            </div>
        </>
    )
}

export default DashboardRh
