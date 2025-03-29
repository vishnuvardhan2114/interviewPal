import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";
import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-amber-100 text-amber-700 border border-amber-200",
      Mixed: "bg-purple-100 text-purple-700 border border-purple-200",
      Technical: "bg-blue-100 text-blue-700 border border-blue-200",
    }[normalizedType] || "bg-slate-100 text-slate-700 border border-slate-200";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-slate-200/50 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-6 flex flex-col justify-between h-full relative">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-4 right-4 w-fit px-4 py-1.5 rounded-full text-sm font-medium shadow-sm",
              badgeColor
            )}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-75"></div>
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={90}
              height={90}
              className="rounded-full object-cover size-[90px] border-2 border-white relative z-10"
            />
          </div>

          {/* Interview Role */}
          <h3 className="mt-5 capitalize text-slate-800 font-bold text-xl">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <p className="text-slate-500">{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <p className="text-slate-700 font-medium">{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5 text-slate-600">
            {feedback?.finalAssessment ||
              "Practice this interview to improve your skills and receive AI-powered feedback."}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center mt-6 pt-4 border-t border-slate-100">
          <DisplayTechIcons techStack={techstack} />

          <Button 
            className={cn(
              "rounded-xl transition-all duration-300",
              feedback 
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200" 
                : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-md"
            )}
          >
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
              className="flex items-center gap-2"
            >
              {feedback ? "View Feedback" : "Start Interview"}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;