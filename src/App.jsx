import { useState } from 'react'
import './App.css'

const questions = [
  {
    text: '오늘 엄청난 소식을 들었다. 나는?',
    axis: 'emotion',
    options: [
      { text: '바로 전화기를 들어 누군가에게 털어놓는다', tags: ['즉흥적', '외향'] },
      { text: '혼자 감정을 정리한 다음 천천히 꺼낸다', tags: ['절제', '내향'] },
      { text: '그냥 속으로 삭힌다', tags: ['억압', '고독'] },
      { text: '일단 뭔가를 한다 — 밖에 나가거나, 뭔가를 먹거나', tags: ['충동적', '행동파'] },
    ],
  },
  {
    text: '가장 편안한 순간은?',
    axis: 'relation',
    options: [
      { text: '좋아하는 사람들과 시끌벅적하게 있을 때', tags: ['외향', '열정'] },
      { text: '한 명이랑 깊게 대화할 때', tags: ['깊은관계', '섬세'] },
      { text: '완전히 혼자인데 아무도 찾지 않을 때', tags: ['고독', '독립'] },
      { text: '사람들 속에 있지만 조용히 관찰할 때', tags: ['관찰자', '거리감'] },
    ],
  },
  {
    text: '친한 친구가 나를 실망시켰다. 나는?',
    axis: 'conflict',
    options: [
      { text: '바로 말한다. 참는 게 더 이상해', tags: ['직면', '솔직'] },
      { text: '타이밍 봐서 조심스럽게 꺼낸다', tags: ['신중', '배려'] },
      { text: '말은 못하고 혼자 계속 생각한다', tags: ['내면화', '자기의심'] },
      { text: '그냥 넘긴다. 관계가 더 중요하니까', tags: ['회피', '관계중심'] },
    ],
  },
  {
    text: '나를 움직이게 하는 건?',
    axis: 'drive',
    options: [
      { text: '갖고 싶은 것, 되고 싶은 것 — 욕망', tags: ['욕망', '야망'] },
      { text: '옳다고 믿는 것 — 신념', tags: ['이상', '신념'] },
      { text: '사랑하는 사람들 — 관계', tags: ['사랑', '헌신'] },
      { text: '아직 잘 모르겠다 — 계속 찾는 중', tags: ['방랑', '탐색'] },
    ],
  },
  {
    text: '중요한 결정을 앞두고 나는?',
    axis: 'self',
    options: [
      { text: '내 직감을 믿고 간다', tags: ['자기확신', '직관'] },
      { text: '여러 사람 의견을 듣고 결정한다', tags: ['의존', '공감'] },
      { text: '논리적으로 따져보다가 결정한다', tags: ['이성', '분석'] },
      { text: '결정하고 나서도 계속 맞는지 의심한다', tags: ['자기의심', '사색'] },
    ],
  },
]

const characters = [
  { name: '드미트리 카라마조프', book: '카라마조프의 형제들 — 도스토옙스키', tags: ['즉흥적', '열정', '욕망', '직면', '외향', '충동적'], desc: '감정과 욕망에 솔직한 인물. 격정적으로 살아가지만 그 안에 순수함을 품고 있습니다.' },
  { name: '이반 카라마조프', book: '카라마조프의 형제들 — 도스토옙스키', tags: ['이성', '신념', '고독', '내면화', '자기의심', '분석'], desc: '냉철한 이성 뒤에 깊은 내면의 갈등을 품은 인물. 신과 인간에 대한 질문을 멈추지 않습니다.' },
  { name: '알료샤 카라마조프', book: '카라마조프의 형제들 — 도스토옙스키', tags: ['헌신', '공감', '사랑', '배려', '신념', '깊은관계'], desc: '순수한 사랑으로 주변을 감싸는 인물. 어떤 상황에서도 타인을 먼저 생각합니다.' },
  { name: '라스콜니코프', book: '죄와 벌 — 도스토옙스키', tags: ['자기확신', '이상', '고독', '내면화', '사색', '억압'], desc: '극단적인 신념으로 스스로를 시험한 인물. 이상과 현실 사이에서 무너져 내립니다.' },
  { name: '안나 카레니나', book: '안나 카레니나 — 톨스토이', tags: ['열정', '욕망', '직면', '즉흥적', '사랑', '행동파'], desc: '사랑을 위해 모든 것을 건 인물. 억압된 사회 속에서 자신의 감정에 솔직했습니다.' },
  { name: '햄릿', book: '햄릿 — 셰익스피어', tags: ['사색', '자기의심', '내면화', '이성', '방랑', '거리감'], desc: '생각이 행동을 앞서는 인물. 끝없는 사유 속에서 결단을 내리지 못하고 방황합니다.' },
  { name: '돈키호테', book: '돈키호테 — 세르반테스', tags: ['이상', '자기확신', '즉흥적', '열정', '탐색', '직관'], desc: '현실보다 꿈을 믿은 인물. 세상이 웃어도 자신의 이상을 포기하지 않습니다.' },
  { name: '엠마 보바리', book: '보바리 부인 — 플로베르', tags: ['욕망', '방랑', '회피', '열정', '탐색', '외향'], desc: '더 아름다운 삶을 꿈꾼 인물. 현실의 단조로움을 견디지 못하고 낭만을 쫓습니다.' },
  { name: '그레고르 잠자', book: '변신 — 카프카', tags: ['헌신', '억압', '관계중심', '내향', '고독', '절제'], desc: '묵묵히 희생해온 인물. 어느 날 자신이 완전히 소외되어 있음을 깨닫습니다.' },
  { name: '홀든 콜필드', book: '호밀밭의 파수꾼 — 샐린저', tags: ['관찰자', '자기의심', '탐색', '고독', '솔직', '방랑'], desc: '순수함을 지키려는 반항아. 세상의 위선을 거부하며 어딘가 진짜인 것을 찾아 헤맵니다.' },
]

function matchCharacter(userTags) {
  return characters
    .map(c => ({ ...c, score: c.tags.filter(t => userTags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)[0]
}

export default function App() {
  const [screen, setScreen] = useState('start')
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [userTags, setUserTags] = useState([])
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [reason, setReason] = useState('')

  const startQuiz = () => {
    setCurrentQ(0)
    setSelectedIdx(null)
    setUserTags([])
    setAnswers([])
    setResult(null)
    setReason('')
    setScreen('quiz')
  }

  const selectOption = async (idx, opt) => {
    if (selectedIdx !== null) return
    setSelectedIdx(idx)

    const newTags = [...userTags, ...opt.tags]
    const newAnswers = [...answers, { q: questions[currentQ].text, a: opt.text }]

    await new Promise(r => setTimeout(r, 300))

    if (currentQ + 1 < questions.length) {
      setUserTags(newTags)
      setAnswers(newAnswers)
      setCurrentQ(currentQ + 1)
      setSelectedIdx(null)
    } else {
      const matched = matchCharacter(newTags)
      setResult(matched)
      setScreen('loading')

      const answerText = newAnswers.map((a, i) => `Q${i + 1}: ${a.a}`).join('\n')
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: '당신은 고전문학 전문가입니다. 사용자의 답변을 바탕으로 매칭된 고전 소설 캐릭터와의 연결고리를 따뜻하고 통찰력 있게 3문장으로 설명해주세요. 반말이 아닌 존댓말로, 너무 딱딱하지 않게 써주세요. 설명 외의 다른 말은 하지 마세요.',
            messages: [{
              role: 'user',
              content: `사용자 답변:\n${answerText}\n\n매칭된 캐릭터: ${matched.name} (${matched.book})\n\n이 사람이 ${matched.name}와 닮은 이유를 3문장으로 설명해주세요.`,
            }],
          }),
        })
        const data = await res.json()
        setReason(data.content[0].text)
      } catch {
        setReason(`${matched.name}의 감정 표현 방식과 삶을 대하는 태도가 당신과 많이 닮아 있습니다. 당신의 선택들에서 이 인물의 내면이 느껴집니다.`)
      }

      setUserTags(newTags)
      setScreen('result')
    }
  }

  const topTags = [...new Set(userTags)].slice(0, 5)
  const progressPct = (currentQ / questions.length) * 100

  return (
    <div className="quiz-wrap">

      {screen === 'start' && (
        <div className="screen active">
          <p className="start-title">당신과 닮은 고전 속 인물은?</p>
          <p className="start-sub">
            5개의 질문으로 당신과 가장 닮은 고전 소설 속 인물을 찾아드립니다.<br />
            오래 생각하지 말고 직감대로 선택하세요.
          </p>
          <button className="start-btn" onClick={startQuiz}>시작하기</button>
        </div>
      )}

      {screen === 'quiz' && (
        <div className="screen active">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="question-num">{currentQ + 1} / {questions.length}</p>
          <p className="question-text">{questions[currentQ].text}</p>
          <div className="options">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                className={`option-btn${selectedIdx === i ? ' selected' : ''}`}
                onClick={() => selectOption(i, opt)}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === 'loading' && (
        <div className="screen active">
          <p className="loading-text dot-anim">당신의 답변을 분석하는 중</p>
        </div>
      )}

      {screen === 'result' && (
        <div className="screen active">
          <div className="result-card">
            <p className="result-label">당신과 닮은 인물</p>
            <p className="result-name">{result.name}</p>
            <p className="result-book">{result.book}</p>
            <div className="result-divider" />
            <p className="result-section-title">작품 소개</p>
            <p className="result-desc">{result.desc}</p>
            <div className="result-divider" />
            <p className="result-section-title">당신이 이 인물인 이유</p>
            <p className="result-ai">{reason}</p>
            <div className="tags">
              {topTags.map(t => (
                <span key={t} className="tag">#{t}</span>
              ))}
            </div>
          </div>
          <button className="retry-btn" onClick={startQuiz}>다시 해보기</button>
        </div>
      )}

    </div>
  )
}
