import BalanceChart from "@/app/ui/dashboard/BalanceChart"

export default function Home() {
    return (
        <main>
            <h1 className="p-4 text-xl">Dashboard</h1>
            <div className="p-4">
                <BalanceChart></BalanceChart>
            </div>
        </main>
    );
}