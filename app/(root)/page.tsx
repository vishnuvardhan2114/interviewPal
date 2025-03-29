import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import { Sparkles, ArrowRight, Calendar, Clock } from "lucide-react";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="flex flex-col gap-12 animate-fadeIn">
      <section className="relative overflow-hidden rounded-3xl bg-white border border-blue-100 shadow-xl">
        <div className="absolute inset-0 bg-[url('/ai-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="flex flex-row items-center justify-between px-16 py-16 max-sm:px-6 max-sm:py-10 max-sm:flex-col max-sm:gap-10 relative z-10">
          <div className="flex flex-col gap-6 max-w-lg">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full w-fit text-sm font-medium">
              <Sparkles size={16} className="text-indigo-500" />
              <span>AI-Powered Interview Practice</span>
            </div>
            
            <h1 className="text-5xl font-bold text-slate-800 leading-tight">
              Master Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Interview Skills</span> with AI
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Practice with our AI interviewer, receive instant feedback, and improve your chances of landing your dream job.
            </p>

            <div className="flex gap-4 mt-2 max-sm:flex-col">
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-base">
                <Link href="/interview" className="flex items-center gap-2">
                  Start an Interview
                  <ArrowRight size={18} />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-6 rounded-xl">
                <Link href="/how-it-works">How it works</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-30 animate-pulse"></div>
            <div className="relative bg-white p-1 rounded-full shadow-lg">
              <Image
                src="/robot.png"
                alt="AI Interviewer"
                width={380}
                height={380}
                className="max-sm:w-[280px] max-sm:h-[280px] z-10 relative hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-slate-800">Your Interviews</h2>
            <p className="text-slate-500">Review your past interview sessions</p>
          </div>
          {hasPastInterviews && (
            <Link href="/history" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-medium">
              View all <ArrowRight size={16} />
            </Link>
          )}
        </div>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview, index) => (
              <div key={interview.id} className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl" style={{ animationDelay: `${index * 0.1}s` }}>
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 text-center shadow-md border border-slate-100 flex flex-col items-center">
              <div className="bg-indigo-50 p-4 rounded-full mb-4">
                <Calendar size={32} className="text-indigo-500" />
              </div>
              <h3 className="text-slate-800 font-medium text-lg">No interviews yet</h3>
              <p className="text-slate-500 mt-2 mb-6">You haven't taken any interviews yet</p>
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl px-6">
                <Link href="/interview">Take your first interview</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-slate-800">Available Interviews</h2>
            <p className="text-slate-500">Choose from our curated interview templates</p>
          </div>
          <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-medium">
            <Link href="/explore" className="flex items-center gap-1">Explore more <ArrowRight size={16} /></Link>
          </Button>
        </div>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview, index) => (
              <div key={interview.id} className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl" style={{ animationDelay: `${index * 0.1}s` }}>
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 text-center shadow-md border border-slate-100 flex flex-col items-center">
              <div className="bg-indigo-50 p-4 rounded-full mb-4">
                <Clock size={32} className="text-indigo-500" />
              </div>
              <h3 className="text-slate-800 font-medium text-lg">No interviews available</h3>
              <p className="text-slate-500 mt-2 mb-6">There are no interviews available at the moment</p>
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl px-6">
                <Link href="/interview">Create a custom interview</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;