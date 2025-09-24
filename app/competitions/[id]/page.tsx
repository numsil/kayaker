import Link from "next/link";

export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const competitions: Record<string, any> = {
    "1": {
      name: "2025 장성호 카약커 레전드 대회",
      date: "2025-09-27",
      location: "장성호",
      status: "upcoming",
      description: "올해 카약커 레전드가 탄생하는 대회가 개최됩니다",
      registrationDeadline: "2025-09-26",
      registrationFee: "50,000원",
      participants: 20,
      maxParticipants: 50,
      schedule: [
        { time: "08:00 - 09:00", event: "참가자 등록 및 장비 점검" },
        { time: "09:00 - 09:30", event: "개회식 및 안전 교육" },
        { time: "09:30 - 12:00", event: "예선전" },
        { time: "12:00 - 13:00", event: "점심 시간" },
        { time: "13:00 - 15:00", event: "준결승전" },
        { time: "15:00 - 16:00", event: "결승전" },
        { time: "16:00 - 17:00", event: "시상식" },
      ],
      categories: [
        { name: "남자 스프린트 500m", fee: "30,000원" },
        { name: "여자 스프린트 500m", fee: "30,000원" },
        { name: "남자 장거리 2000m", fee: "40,000원" },
        { name: "여자 장거리 2000m", fee: "40,000원" },
        { name: "혼성 릴레이", fee: "50,000원" },
      ],
      prizes: [
        { place: "장성호 레전드", prize: "100만원 상당의 루어중 찌끄래기" },
        { place: "1위", prize: "100만원 상당의 루어중 맘에 드는거 다" },
      ],
    },
    "3": {
      name: "2024 춘계 카약 대회",
      date: "2024-03-20",
      location: "한강 뚝섬",
      status: "completed",
      description: "봄을 맞이하는 카약 대회",
      participants: 95,
      results: [
        {
          category: "남자 스프린트 500m",
          winners: [
            { place: 1, name: "김카약", time: "1:45.23" },
            { place: 2, name: "박선수", time: "1:47.89" },
            { place: 3, name: "이스포츠", time: "1:48.12" },
          ],
        },
        {
          category: "여자 스프린트 500m",
          winners: [
            { place: 1, name: "최여름", time: "1:52.45" },
            { place: 2, name: "정봄", time: "1:54.67" },
            { place: 3, name: "강가을", time: "1:55.23" },
          ],
        },
      ],
    },
  };

  const competition = competitions[id] || {
    name: "대회를 찾을 수 없습니다",
    description: "요청하신 대회 정보가 존재하지 않습니다.",
    status: "unknown",
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/competitions"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← 대회 목록
        </Link>

        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold">{competition.name}</h1>
            <span
              className={`px-4 py-2 rounded-full text-sm ${competition.status === "upcoming"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700"
                }`}
            >
              {competition.status === "upcoming" ? "예정" : "종료"}
            </span>
          </div>

          <p className="text-xl text-gray-600 mb-6">{competition.description}</p>

          <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">날짜</p>
              <p className="font-semibold text-lg">{competition.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">장소</p>
              <p className="font-semibold text-lg">{competition.location}</p>
            </div>
            {competition.status === "upcoming" && (
              <>
                <div>
                  <p className="text-sm text-gray-600">신청 마감</p>
                  <p className="font-semibold text-lg">
                    {competition.registrationDeadline}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">참가 인원</p>
                  <p className="font-semibold text-lg">
                    {competition.participants} / {competition.maxParticipants}명
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {competition.status === "upcoming" ? (
          <>
            {/* Schedule */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">대회 일정</h2>
              <div className="bg-white border rounded-lg overflow-hidden">
                {competition.schedule?.map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="flex border-b last:border-b-0 p-4 hover:bg-gray-50"
                    >
                      <div className="font-semibold text-blue-600 w-40">
                        {item.time}
                      </div>
                      <div>{item.event}</div>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Prizes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">시상 내역</h2>
              <div className="space-y-3">
                {competition.prizes?.map((prize: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border p-4 rounded-lg"
                  >
                    <span className="font-semibold text-lg">{prize.place}</span>
                    <span className="text-gray-700">{prize.prize}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Registration Button */}
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">지금 바로 신청하세요!</h3>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                참가 신청하기
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <section>
              <h2 className="text-2xl font-bold mb-4">대회 결과</h2>
              <div className="space-y-6">
                {competition.results?.map((result: any, index: number) => (
                  <div key={index} className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {result.category}
                    </h3>
                    <div className="space-y-3">
                      {result.winners.map((winner: any) => (
                        <div
                          key={winner.place}
                          className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${winner.place === 1
                                ? "bg-yellow-400"
                                : winner.place === 2
                                  ? "bg-gray-300"
                                  : "bg-orange-300"
                                }`}
                            >
                              {winner.place}
                            </span>
                            <span className="font-semibold">{winner.name}</span>
                          </div>
                          <span className="text-gray-600">{winner.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}