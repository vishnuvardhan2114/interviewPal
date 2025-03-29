import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Sparkles } from "lucide-react";

const Page = async () => {
    const user = await getCurrentUser();

    return (
        <div className="max-w-5xl mx-auto px-4">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full mb-4">
                    <Sparkles size={16} className="text-indigo-500" />
                    <span className="font-medium">AI-Powered Interview</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-3">Get Ready for Your Interview</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Our AI interviewer will ask you relevant questions and provide feedback on your responses.
                    Speak naturally as you would in a real interview.
                </p>
            </div>

            <Agent
                userName={user?.name!}
                userId={user?.id}
                type="generate"
            />
        </div>
    );
};

export default Page;