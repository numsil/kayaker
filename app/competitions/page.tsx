import Link from "next/link";

export default function CompetitionsPage() {
  const competitions = [
    {
      id: 1,
      name: "장성호 카약 대회",
      date: "2025-09-27",
      location: "장성호",
      status: "upcoming" as const,
      description: "장성호에서 열리는 카약 대회",
      registrationUrl: "#",
      participants: 20,
    },
  ];

  const upcomingCompetitions = competitions.filter(
    (c) => c.status === "upcoming" as string
  );
  const completedCompetitions = competitions.filter(
    (c) => c.status === "completed" as string
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">대회 일정</h1>

        {/* Upcoming Competitions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">예정된 대회</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingCompetitions.map((competition) => (
              <Link href={`/competitions/${competition.id}`} key={competition.id}>
                <div className="border-2 border-blue-600 rounded-lg p-6 hover:shadow-xl transition-all bg-blue-50">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-blue-900">
                      {competition.name}
                    </h3>
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      예정
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{competition.description}</p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">📅 일시:</span>
                      <span>{competition.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">📍 장소:</span>
                      <span>{competition.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">👥 신청 인원:</span>
                      <span>{competition.participants}명</span>
                    </div>
                  </div>

                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    신청하기
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Completed Competitions */}
        {completedCompetitions.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">종료된 대회</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {completedCompetitions.map((competition) => (
                <Link href={`/competitions/${competition.id}`} key={competition.id}>
                  <div className="border rounded-lg p-6 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{competition.name}</h3>
                      <span className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full">
                        종료
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{competition.description}</p>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">📅 일시:</span>
                        <span>{competition.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">📍 장소:</span>
                        <span>{competition.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">👥 참가 인원:</span>
                        <span>{competition.participants}명</span>
                      </div>
                    </div>

                    <button className="mt-4 w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                      결과 보기
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}