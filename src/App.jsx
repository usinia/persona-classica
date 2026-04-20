import { useState } from 'react'
import './App.css'

const questions = [
  // Q1: 드미트리 / 이반 / 알료샤 / 홀든
  {
    text: '큰 소식이 생겼어. 나는?',
    options: [
      { text: '바로 전화기를 들어 흥분해서 털어놓는다', tags: ['충동', '폭발'] },
      { text: '혼자 논리적으로 정리해본 다음 꺼낸다', tags: ['논리', '회의'] },
      { text: '주변 사람 기분부터 살피며 조심스럽게 꺼낸다', tags: ['공감', '온화'] },
      { text: '그냥 속으로만 삭힌다. 꺼낼 기분이 아니야', tags: ['냉소', '고독'] },
    ],
  },
  // Q2: 드미트리 / 알료샤 / 안나 / 홀든
  {
    text: '나한테 가장 편안한 순간은?',
    options: [
      { text: '좋아하는 사람들과 시끌벅적하게 놀 때', tags: ['충동', '쾌락'] },
      { text: '누군가를 조용히 도울 수 있을 때', tags: ['공감', '헌신'] },
      { text: '사랑하는 사람과 뜨겁게 연결되는 순간', tags: ['열정', '낭만'] },
      { text: '사람들 속에서 아무도 나를 찾지 않을 때', tags: ['냉소', '고독'] },
    ],
  },
  // Q3: 드미트리 / 이반 / 햄릿 / 그레고르
  {
    text: '친한 친구한테 실망했어. 그때 나는?',
    options: [
      { text: '바로 터뜨린다. 참는 게 더 이상해', tags: ['충동', '폭발'] },
      { text: '냉정하게 따져보고 할 말만 정확히 한다', tags: ['논리', '반항'] },
      { text: '말은 못하고 혼자 계속 생각만 해', tags: ['사색', '망설임'] },
      { text: '그냥 넘겨. 내가 참으면 되니까', tags: ['희생', '소외'] },
    ],
  },
  // Q4: 알료샤 / 돈키호테 / 엠마 / 그레고르
  {
    text: '내가 꿈꾸는 삶은?',
    options: [
      { text: '사랑하는 사람들을 위해 헌신하는 삶', tags: ['헌신', '온화'] },
      { text: '세상이 비웃어도 꿈을 쫓아가는 삶', tags: ['이상', '모험'] },
      { text: '아름답고 풍요롭고 늘 설레는 삶', tags: ['욕망', '탈출'] },
      { text: '묵묵히 맡은 역할을 다하는 삶', tags: ['의무', '희생'] },
    ],
  },
  // Q5: 드미트리 / 라스콜니코프 / 햄릿 / 엠마
  {
    text: '중요한 결정 앞에 서면 나는?',
    options: [
      { text: '직감대로 바로 간다. 너무 생각하면 오히려 후회해', tags: ['충동', '쾌락'] },
      { text: '내 신념대로 확신을 갖고 밀어붙인다', tags: ['확신', '집착'] },
      { text: '결정하고 나서도 계속 맞는지 의심해', tags: ['사색', '망설임'] },
      { text: '더 나은 선택이 있을 것 같아서 자꾸 미뤄', tags: ['욕망', '권태'] },
    ],
  },
  // Q6: 이반 / 라스콜니코프 / 돈키호테 / 홀든
  {
    text: '세상을 바라보는 내 눈은?',
    options: [
      { text: '세상은 모순으로 가득해. 신도 도덕도 믿지 않아', tags: ['논리', '회의'] },
      { text: '평범한 규칙은 비범한 자에게 해당하지 않아', tags: ['확신', '오만'] },
      { text: '세상이 단조롭다. 더 대단한 무언가가 분명 있어', tags: ['이상', '직관'] },
      { text: '세상은 위선자들로 가득해', tags: ['냉소', '진정성'] },
    ],
  },
  // Q7: 이반 / 안나 / 햄릿 / 그레고르
  {
    text: '나를 움직이게 하는 건 뭘까?',
    options: [
      { text: '진실. 옳다고 믿는 것을 끝까지 밝히는 것', tags: ['반항', '회의'] },
      { text: '사랑. 사랑을 위해서라면 모든 걸 걸 수 있어', tags: ['열정', '자유'] },
      { text: '아직 모르겠어. 계속 생각하고 찾는 중이야', tags: ['사색', '우울'] },
      { text: '가족과 책임. 내가 없으면 안 되는 사람들', tags: ['의무', '소외'] },
    ],
  },
  // Q8: 알료샤 / 안나 / 돈키호테 / 엠마
  {
    text: '사랑에 대해 내가 가진 생각은?',
    options: [
      { text: '조용한 헌신이야. 말보다 행동으로 보여주고 싶어', tags: ['공감', '헌신'] },
      { text: '불꽃 같은 거야. 전부를 쏟아붓는 게 진짜 사랑', tags: ['열정', '낭만'] },
      { text: '모험이야. 두려워도 일단 뛰어드는 것', tags: ['모험', '직관'] },
      { text: '기대했지만 현실은 늘 실망스러웠어', tags: ['권태', '탈출'] },
    ],
  },
  // Q9: 라스콜니코프 / 햄릿 / 엠마 / 그레고르
  {
    text: '나 자신에 대해 솔직하게 말하면?',
    options: [
      { text: '나는 보통 사람들과 다르다는 확신이 있어', tags: ['확신', '집착'] },
      { text: '내가 맞는 길을 가고 있는지 자꾸 의심스러워', tags: ['망설임', '우울'] },
      { text: '지금의 삶은 내가 원하는 게 아니야', tags: ['권태', '욕망'] },
      { text: '내 감정보다 주변의 기대가 더 중요해졌어', tags: ['희생', '의무'] },
    ],
  },
  // Q10: 라스콜니코프 / 안나 / 돈키호테 / 홀든
  {
    text: '가장 두려운 게 뭐야?',
    options: [
      { text: '평범하고 의미 없는 삶을 사는 것', tags: ['오만', '집착'] },
      { text: '사랑 없이, 감정 없이 살아가는 것', tags: ['자유', '낭만'] },
      { text: '꿈을 잃고 현실에 굴복하는 것', tags: ['이상', '모험'] },
      { text: '진짜 나를 잃고 세상에 동화되는 것', tags: ['진정성', '고독'] },
    ],
  },
  // Q11 (신규): 나스타샤 / 춘향 / 알료샤 / 라스콜니코프
  {
    text: '힘든 일이 생겼을 때 나는?',
    options: [
      { text: '아프다는 건 알지만, 그게 나를 무너뜨리게 두지 않아', tags: ['상처', '자존'] },
      { text: '신념을 지키면서 굳건히 버텨', tags: ['절개', '의지'] },
      { text: '아파하는 사람 곁에 있어주는 게 먼저야', tags: ['공감', '온화'] },
      { text: '고통도 결국 나를 단련시키는 과정이야', tags: ['확신', '오만'] },
    ],
  },
  // Q12 (신규): 나스타샤 / 춘향 / 엠마 / 홀든
  {
    text: '사랑을 표현하는 나만의 방식은?',
    options: [
      { text: '사랑하기 때문에 오히려 밀어내. 행복이 두려워', tags: ['상처', '자기파괴'] },
      { text: '어떤 상황에서도 약속을 지켜. 사랑은 신의야', tags: ['신의', '절개'] },
      { text: '낭만적인 분위기와 설레는 감정이 중요해', tags: ['욕망', '권태'] },
      { text: '진심으로 대하되, 위선적이면 바로 떠나', tags: ['냉소', '진정성'] },
    ],
  },
]

const characters = [
  { name: '드미트리 카라마조프', book: '카라마조프의 형제들 — 도스토옙스키', tags: ['충동', '폭발', '쾌락'],    desc: '감정과 욕망에 솔직한 인물. 격정적으로 살아가지만 그 안에 순수함을 품고 있습니다.',           image: '/characters/dmitri.jpeg' },
  { name: '이반 카라마조프',    book: '카라마조프의 형제들 — 도스토옙스키', tags: ['논리', '회의', '반항'],    desc: '냉철한 이성 뒤에 깊은 갈등을 품은 인물. 신과 인간에 대한 질문을 멈추지 않습니다.',           image: '/characters/ivan.jpeg' },
  { name: '알료샤 카라마조프',  book: '카라마조프의 형제들 — 도스토옙스키', tags: ['공감', '헌신', '온화'],    desc: '순수한 사랑으로 주변을 감싸는 인물. 어떤 상황에서도 타인을 먼저 생각합니다.',               image: '/characters/alyosha.jpeg' },
  { name: '라스콜니코프',       book: '죄와 벌 — 도스토옙스키',             tags: ['확신', '집착', '오만'],    desc: '극단적인 신념으로 스스로를 시험한 인물. 이상과 현실 사이에서 무너져 내립니다.',             image: '/characters/raskolnikov.jpeg' },
  { name: '안나 카레니나',      book: '안나 카레니나 — 톨스토이',           tags: ['열정', '낭만', '자유'],    desc: '사랑을 위해 모든 것을 건 인물. 억압된 사회 속에서 자신의 감정에 솔직했습니다.',             image: '/characters/anna.jpeg' },
  { name: '햄릿',               book: '햄릿 — 셰익스피어',                  tags: ['사색', '망설임', '우울'],  desc: '생각이 행동을 앞서는 인물. 끝없는 사유 속에서 결단을 내리지 못하고 방황합니다.',           image: '/characters/hamlet.jpeg' },
  { name: '돈키호테',           book: '돈키호테 — 세르반테스',              tags: ['이상', '모험', '직관'],    desc: '현실보다 꿈을 믿은 인물. 세상이 웃어도 자신의 이상을 포기하지 않습니다.',                 image: '/characters/donquixote.jpeg' },
  { name: '엠마 보바리',        book: '보바리 부인 — 플로베르',             tags: ['욕망', '권태', '탈출'],    desc: '더 아름다운 삶을 꿈꾼 인물. 현실의 단조로움을 견디지 못하고 낭만을 쫓습니다.',           image: '/characters/emma.jpeg' },
  { name: '그레고르 잠자',      book: '변신 — 카프카',                      tags: ['희생', '소외', '의무'],    desc: '묵묵히 희생해온 인물. 어느 날 자신이 완전히 소외되어 있음을 깨닫습니다.',                 image: '/characters/gregor.jpeg' },
  { name: '홀든 콜필드',        book: '호밀밭의 파수꾼 — 샐린저',          tags: ['냉소', '고독', '진정성'],  desc: '순수함을 지키려는 반항아. 세상의 위선을 거부하며 어딘가 진짜인 것을 찾아 헤맵니다.',     image: '/characters/holden.jpeg' },
  { name: '나스타샤 필리포브나', book: '백치 — 도스토옙스키',               tags: ['상처', '자존', '자기파괴'], desc: '깊은 상처를 품고도 자존을 놓지 않는 인물. 사랑 앞에서 스스로를 무너뜨리기를 반복합니다.', image: '/characters/nastasya.jpeg' },
  { name: '춘향',               book: '춘향전 — 작자 미상',                 tags: ['절개', '의지', '신의'],    desc: '사랑과 신의를 목숨보다 소중히 여긴 인물. 어떤 압박에도 자신의 마음을 굽히지 않았습니다.', image: '/characters/chunhyang.jpeg' },
]

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

function matchCharacter(userTags) {
  return characters
    .map(c => ({
      ...c,
      score: c.tags.reduce((sum, t) => sum + userTags.filter(ut => ut === t).length, 0),
    }))
    .sort((a, b) => b.score - a.score)[0]
}

export default function App() {
  const [screen, setScreen] = useState('start')
  const [quiz, setQuiz] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [userTags, setUserTags] = useState([])
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [reason, setReason] = useState('')
  const [copied, setCopied] = useState(false)

  const startQuiz = () => {
    setQuiz(pickRandom(questions, 5))
    setCurrentQ(0)
    setSelectedIdx(null)
    setUserTags([])
    setAnswers([])
    setResult(null)
    setReason('')
    setCopied(false)
    setScreen('quiz')
  }

  const selectOption = async (idx, opt) => {
    if (selectedIdx !== null) return
    setSelectedIdx(idx)

    const newTags = [...userTags, ...opt.tags]
    const newAnswers = [...answers, { q: quiz[currentQ].text, a: opt.text }]

    await new Promise(r => setTimeout(r, 300))

    if (currentQ + 1 < quiz.length) {
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
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: '당신은 고전문학 전문가입니다. 사용자의 답변을 바탕으로 매칭된 고전 소설 캐릭터와의 연결고리를 따뜻하고 통찰력 있게 3문장으로 설명해주세요. 반말이 아닌 존댓말로, 너무 딱딱하지 않게 써주세요. 설명 외의 다른 말은 하지 마세요.' }] },
              contents: [{ parts: [{ text: `사용자 답변:\n${answerText}\n\n매칭된 캐릭터: ${matched.name} (${matched.book})\n\n이 사람이 ${matched.name}와 닮은 이유를 3문장으로 설명해주세요.` }] }],
            }),
          }
        )
        const data = await res.json()
        setReason(data.candidates[0].content.parts[0].text)
      } catch {
        setReason(`${matched.name}의 감정 표현 방식과 삶을 대하는 태도가 당신과 많이 닮아 있습니다. 당신의 선택들에서 이 인물의 내면이 느껴집니다.`)
      }

      setUserTags(newTags)
      setScreen('result')
    }
  }

  const handleShare = async () => {
    if (!result) return
    const text = `나는 ${result.name}와 닮았대!\n《${result.book}》\n\n"${result.desc}"\n\n당신과 닮은 고전 속 인물은 누구일까요?`
    if (navigator.share) {
      await navigator.share({ title: '고전 속 인물 심리테스트', text })
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const topTags = [...new Set(userTags)].slice(0, 5)
  const progressPct = quiz.length ? (currentQ / quiz.length) * 100 : 0

  return (
    <div className="quiz-wrap">

      {screen === 'start' && (
        <div className="screen active start-screen">
          <div className="character-grid">
            {characters.map(c => (
              <div key={c.name} className="grid-avatar" title={c.name}>
                <img src={c.image} alt={c.name} />
              </div>
            ))}
          </div>
          <p className="start-title">당신과 닮은<br />고전 속 인물은?</p>
          <p className="start-sub">5개의 질문으로 당신과 가장 닮은<br />고전 소설 속 인물을 찾아드립니다.<br />오래 생각하지 말고 직감대로 선택하세요.</p>
          <button className="start-btn" onClick={startQuiz}>시작하기</button>
        </div>
      )}

      {screen === 'quiz' && (
        <div key={currentQ} className="screen active">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="question-num">{currentQ + 1} / {quiz.length}</p>
          <p className="question-text">{quiz[currentQ].text}</p>
          <div className="options">
            {quiz[currentQ].options.map((opt, i) => (
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
        <div className="screen active loading-screen">
          <p className="loading-text dot-anim">당신의 답변을 분석하는 중</p>
        </div>
      )}

      {screen === 'result' && (
        <div className="screen active">
          <div className="result-card">
            {result.image && (
              <img
                src={result.image}
                alt={result.name}
                className="result-image"
                onError={e => { e.target.style.display = 'none' }}
              />
            )}
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
          <div className="result-actions">
            <button className="share-btn" onClick={handleShare}>
              {copied ? '복사됨 ✓' : '결과 공유하기'}
            </button>
            <button className="retry-btn" onClick={startQuiz}>다시 해보기</button>
          </div>
        </div>
      )}

    </div>
  )
}
