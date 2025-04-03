function DashboardStats({title, icon, value, description, colorIndex}){

    const COLORS = ["primary", "primary"]

    const getDescStyle = () => {
        if(description.includes("↗︎"))return "font-bold text-green-700 dark:text-green-300"
        else if(description.includes("↙"))return "font-bold text-rose-500 dark:text-red-400"
        else return ""
    }

    return(
        <div className="stats shadow">
            
        </div>
    )
}

export default DashboardStats