import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Welcome to AgroMart</h1>
            <div className="flex gap-4">
                <Button onClick={() => router.push('/farmer-login')}>I'm a Farmer</Button>
                <Button onClick={() => router.push('/customer-login')}>I'm a Customer</Button>
            </div>
        </div>
    );
}
