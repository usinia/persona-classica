import { useState } from 'react'
import './App.css'

const questions = {
  감정표현: [
    {
      text: '엄청난 소식이 생겼을 때, 나는?',
      options: [
        { text: '바로 전화해서 흥분한 채로 털어놓는다', tags: ['충동', '폭발'] },
        { text: '혼자 정리한 다음 적당한 타이밍에 꺼낸다', tags: ['논리', '회의'] },
        { text: '주변 사람 기분부터 살피고 조심스럽게 꺼낸다', tags: ['공감', '온화'] },
        { text: '그냥 속으로만 삭힌다. 굳이 말하고 싶지 않아', tags: ['냉소', '고독'] },
      ],
    },
    {
      text: '나한테 제일 편한 순간은?',
      options: [
        { text: '좋아하는 사람들이랑 시끌벅적하게 놀 때', tags: ['충동', '쾌락'] },
        { text: '누군가를 조용히 도울 수 있을 때', tags: ['공감', '헌신'] },
        { text: '사랑하는 사람이랑 완전히 연결되는 순간', tags: ['열정', '낭만'] },
        { text: '사람들 사이에서 아무도 나를 신경 안 쓸 때', tags: ['냉소', '고독'] },
      ],
    },
    {
      text: '기분이 가라앉을 때, 솔직히 나는?',
      options: [
        { text: '확 터뜨려버려. 속에 쌓아두면 더 힘들어', tags: ['충동', '폭발'] },
        { text: '아파도 겉으로 내색 안 해. 약해 보이기 싫어', tags: ['상처', '자존'] },
        { text: '눈앞의 현실보다 다른 세계를 자꾸 상상하게 돼', tags: ['이상', '모험'] },
        { text: '머릿속이 복잡해져서 혼자 생각을 정리해', tags: ['사색', '우울'] },
      ],
    },
  ],
  갈등대응: [
    {
      text: '친한 친구한테 크게 실망했을 때, 나는?',
      options: [
        { text: '바로 터뜨린다. 참는 게 더 이상한 거야', tags: ['충동', '폭발'] },
        { text: '냉정하게 따진 다음 할 말만 딱 한다', tags: ['논리', '반항'] },
        { text: '말은 못 하고 혼자 계속 곱씹어', tags: ['사색', '망설임'] },
        { text: '그냥 넘겨. 내가 참으면 되니까', tags: ['희생', '소외'] },
      ],
    },
    {
      text: '중요한 결정을 앞두면, 나는?',
      options: [
        { text: '직감대로 바로 간다. 너무 생각하면 오히려 후회해', tags: ['충동', '쾌락'] },
        { text: '내 신념대로 확신을 갖고 밀어붙인다', tags: ['확신', '집착'] },
        { text: '결정하고 나서도 계속 맞는지 의심해', tags: ['사색', '망설임'] },
        { text: '더 나은 선택이 있을 것 같아서 자꾸 미뤄', tags: ['욕망', '권태'] },
      ],
    },
    {
      text: '예상 못한 힘든 일이 닥쳤을 때, 나는?',
      options: [
        { text: '아프다는 건 알지만, 거기 무너지지는 않아', tags: ['상처', '자존'] },
        { text: '신념을 붙잡고 굳건히 버텨낸다', tags: ['절개', '의지'] },
        { text: '내 감정보다 주변 사람들 먼저 챙기게 돼', tags: ['공감', '온화'] },
        { text: '고통도 결국 나를 만들어가는 과정이라고 생각해', tags: ['확신', '오만'] },
      ],
    },
  ],
  삶의동력: [
    {
      text: '내가 진짜 원하는 삶은?',
      options: [
        { text: '사랑하는 사람들을 위해 헌신하는 삶', tags: ['헌신', '온화'] },
        { text: '세상이 비웃어도 꿈을 쫓는 삶', tags: ['이상', '모험'] },
        { text: '아름답고 풍요롭고 늘 설레는 삶', tags: ['욕망', '탈출'] },
        { text: '어떤 어려움이 와도 신념을 지키는 삶', tags: ['절개', '의지'] },
      ],
    },
    {
      text: '나를 실제로 움직이게 하는 건?',
      options: [
        { text: '진실. 옳다고 믿는 걸 끝까지 밝히는 것', tags: ['반항', '회의'] },
        { text: '사랑. 사랑을 위해서라면 다 걸 수 있어', tags: ['열정', '자유'] },
        { text: '아직 모르겠어. 계속 찾는 중이야', tags: ['사색', '우울'] },
        { text: '책임. 내가 없으면 안 되는 사람들', tags: ['의무', '소외'] },
      ],
    },
    {
      text: '세상을 보는 내 방식은?',
      options: [
        { text: '세상은 모순투성이야. 신도 도덕도 믿지 않아', tags: ['논리', '회의'] },
        { text: '평범한 규칙은 비범한 자한테 해당 안 돼', tags: ['확신', '오만'] },
        { text: '세상이 너무 단조로워. 더 대단한 게 분명 있어', tags: ['이상', '직관'] },
        { text: '세상은 위선자들로 가득해', tags: ['냉소', '진정성'] },
      ],
    },
  ],
  관계방식: [
    {
      text: '나한테 사랑이란?',
      options: [
        { text: '조용한 헌신. 말보다 행동으로 보여주는 것', tags: ['공감', '헌신'] },
        { text: '불꽃 같은 것. 전부를 쏟아붓는 게 진짜야', tags: ['열정', '낭만'] },
        { text: '모험. 두려워도 일단 뛰어드는 것', tags: ['모험', '직관'] },
        { text: '기대했지만 현실은 늘 실망스러워', tags: ['권태', '탈출'] },
      ],
    },
    {
      text: '사랑을 표현할 때 나는?',
      options: [
        { text: '사랑하기 때문에 오히려 밀어내. 행복이 두려워', tags: ['상처', '자기파괴'] },
        { text: '어떤 상황에서도 약속을 지켜. 사랑은 신의야', tags: ['신의', '절개'] },
        { text: '낭만적인 분위기랑 설레는 감정이 제일 중요해', tags: ['욕망', '권태'] },
        { text: '진심으로 대하되, 위선적이면 바로 끊어', tags: ['냉소', '진정성'] },
      ],
    },
    {
      text: '관계에서 나한테 제일 중요한 건?',
      options: [
        { text: '감정에 솔직하게, 열정적으로 대하는 것', tags: ['충동', '쾌락'] },
        { text: '논리적으로 거리를 두고 이성적으로 보는 것', tags: ['논리', '반항'] },
        { text: '내가 할 수 있는 걸 묵묵히 다해주는 것', tags: ['희생', '의무'] },
        { text: '내 원칙에서 절대 흔들리지 않는 것', tags: ['확신', '집착'] },
      ],
    },
  ],
  자기인식: [
    {
      text: '나 자신에 대해 솔직히 말하면?',
      options: [
        { text: '나는 보통 사람들과 다르다는 확신이 있어', tags: ['확신', '집착'] },
        { text: '내가 맞는 방향으로 가고 있는지 자꾸 의심스러워', tags: ['망설임', '우울'] },
        { text: '지금 삶은 내가 원하는 게 아니야', tags: ['권태', '욕망'] },
        { text: '내 감정보다 주변 기대가 더 중요해졌어', tags: ['희생', '의무'] },
      ],
    },
    {
      text: '솔직히 제일 두려운 건?',
      options: [
        { text: '평범하고 의미 없는 삶을 사는 것', tags: ['오만', '집착'] },
        { text: '사랑 없이, 감정 없이 살아가는 것', tags: ['자유', '낭만'] },
        { text: '꿈을 잃고 현실에 무릎 꿇는 것', tags: ['이상', '모험'] },
        { text: '진짜 나를 잃고 세상에 묻혀버리는 것', tags: ['진정성', '고독'] },
      ],
    },
    {
      text: '나에 대해 가장 잘 안다고 생각하는 건?',
      options: [
        { text: '상처받아도 끝내 무너지지 않는 내 자존감', tags: ['상처', '자존'] },
        { text: '어떤 상황에서도 신의와 약속을 지킨다는 것', tags: ['절개', '신의'] },
        { text: '주변 사람에게 진심으로 공감한다는 것', tags: ['공감', '온화'] },
        { text: '충동적이더라도, 그게 나다운 것', tags: ['충동', '쾌락'] },
      ],
    },
  ],
}

const characters = [
  {
    name: '드미트리 카라마조프', book: '카라마조프의 형제들 — 도스토옙스키',
    tags: ['충동', '폭발', '쾌락'],
    desc: '카라마조프 가의 장남. 충동적이고 열정적이며 돈과 사랑에 탐닉하지만, 그 격정 속에 순수한 영혼이 숨어 있습니다. 아버지와의 갈등과 그루셴카를 향한 사랑으로 파국을 맞이하지만 끝까지 인간적인 면모를 잃지 않습니다.',
    bookDesc: '도스토옙스키의 마지막 대작. 신앙·이성·사랑을 둘러싼 세 형제의 이야기를 통해 인간 존재의 근본을 탐구합니다.',
    image: '/characters/dmitri.jpeg',
  },
  {
    name: '이반 카라마조프', book: '카라마조프의 형제들 — 도스토옙스키',
    tags: ['논리', '회의', '반항'],
    desc: '세 형제 중 가장 이성적인 인물. "신이 없다면 모든 것이 허용된다"는 말로 유명하며, 뛰어난 지성으로 신의 존재를 부정합니다. 하지만 그 허무감이 결국 스스로를 갉아먹고 맙니다.',
    bookDesc: '도스토옙스키의 마지막 대작. 신앙·이성·사랑을 둘러싼 세 형제의 이야기를 통해 인간 존재의 근본을 탐구합니다.',
    image: '/characters/ivan.jpeg',
  },
  {
    name: '알료샤 카라마조프', book: '카라마조프의 형제들 — 도스토옙스키',
    tags: ['공감', '헌신', '온화'],
    desc: '수도원에서 자란 막내로 세 형제 중 가장 순수한 영혼. 스타레츠 조시마 신부의 제자로 모든 사람을 사랑으로 감싸 안습니다. 도스토옙스키가 가장 아끼던 인물입니다.',
    bookDesc: '도스토옙스키의 마지막 대작. 신앙·이성·사랑을 둘러싼 세 형제의 이야기를 통해 인간 존재의 근본을 탐구합니다.',
    image: '/characters/alyosha.jpeg',
  },
  {
    name: '라스콜니코프', book: '죄와 벌 — 도스토옙스키',
    tags: ['확신', '집착', '오만'],
    desc: '가난한 법대생. "비범한 인간은 도덕의 경계를 초월할 수 있다"는 이론을 세우고 전당포 노파를 살해합니다. 이후 극심한 죄책감과 내면의 갈등으로 서서히 무너져 갑니다.',
    bookDesc: '1866년 발표된 도스토옙스키의 대표작. 범죄·속죄·구원을 주제로 인간 심리의 깊은 곳을 파고드는 심리 소설입니다.',
    image: '/characters/raskolnikov.jpeg',
  },
  {
    name: '안나 카레니나', book: '안나 카레니나 — 톨스토이',
    tags: ['열정', '낭만', '자유'],
    desc: '아름답고 총명한 귀족 부인. 장교 브론스키와의 사랑에 빠져 남편과 아들을 잃고 사교계에서 추방됩니다. 사랑을 위해 모든 것을 걸었지만, 사회의 냉대와 질투 속에 스스로 파멸합니다.',
    bookDesc: '톨스토이가 1878년 완성한 걸작. "행복한 가정은 모두 엇비슷하지만, 불행한 가정은 저마다 이유가 다르다"는 첫 문장으로 시작됩니다.',
    image: '/characters/anna.jpeg',
  },
  {
    name: '햄릿', book: '햄릿 — 셰익스피어',
    tags: ['사색', '망설임', '우울'],
    desc: '덴마크 왕자. 아버지가 삼촌에게 살해당했음을 알게 되지만 "사느냐 죽느냐"의 갈림길에서 복수를 실행하지 못하고 방황합니다. 행동보다 사유가 앞서는 인간의 원형입니다.',
    bookDesc: '셰익스피어의 4대 비극 중 하나. 복수·죽음·존재에 대한 근원적 물음을 담은 인류 문학사 최고의 비극으로 꼽힙니다.',
    image: '/characters/hamlet.jpeg',
  },
  {
    name: '돈키호테', book: '돈키호테 — 세르반테스',
    tags: ['이상', '모험', '직관'],
    desc: '기사 소설에 빠져 스스로 편력기사가 된 시골 노인. 풍차를 거인으로 착각하고 돌진하지만, 그 순수한 이상주의는 오히려 우리 마음을 움직입니다. 세상이 웃어도 꿈을 포기하지 않습니다.',
    bookDesc: '세르반테스가 1605년 발표한 근대 소설의 효시. 이상과 현실의 충돌을 해학적으로 담아낸 문학사 최초의 현대 소설로 평가받습니다.',
    image: '/characters/donquixote.jpeg',
  },
  {
    name: '엠마 보바리', book: '보바리 부인 — 플로베르',
    tags: ['욕망', '권태', '탈출'],
    desc: '지방 의사의 아내. 낭만 소설을 너무 많이 읽어 평범한 현실을 견디지 못합니다. 두 번의 불륜과 무분별한 사치로 파멸에 이르는 19세기 여성의 비극적 초상입니다.',
    bookDesc: '플로베르가 1857년 발표한 사실주의 문학의 걸작. 출판 당시 풍기문란 혐의로 기소되었으나 무죄 판결을 받으며 더욱 유명해졌습니다.',
    image: '/characters/emma.jpeg',
  },
  {
    name: '그레고르 잠자', book: '변신 — 카프카',
    tags: ['희생', '소외', '의무'],
    desc: '어느 날 아침 갑자기 흉측한 벌레로 변한 세일즈맨. 가족을 위해 묵묵히 일했지만, 벌레가 된 후 점차 짐이 되어갑니다. 소외된 현대인의 불안과 고독을 상징하는 인물입니다.',
    bookDesc: '카프카가 1915년 발표한 단편. "어느 날 아침 잠에서 깨어나 보니 흉측한 벌레로 변해 있었다"는 첫 문장은 세계 문학사에서 가장 유명한 시작 중 하나입니다.',
    image: '/characters/gregor.jpeg',
  },
  {
    name: '홀든 콜필드', book: '호밀밭의 파수꾼 — 샐린저',
    tags: ['냉소', '고독', '진정성'],
    desc: '명문 기숙학교에서 퇴학당한 17세 소년. 어른들의 세계가 온통 "위선"으로 가득하다 느끼며 뉴욕을 방황합니다. 순수함을 잃지 않으려는 청춘의 저항을 담은 인물입니다.',
    bookDesc: '샐린저가 1951년 발표한 성장 소설. 출판 이후 수십 년간 금서 목록에 올랐으며 수많은 청년들의 바이블이 되었습니다.',
    image: '/characters/holden.jpeg',
  },
  {
    name: '나스타샤 필리포브나', book: '백치 — 도스토옙스키',
    tags: ['상처', '자존', '자기파괴'],
    desc: '어린 시절 부잣집 남자에게 상처받은 아름다운 여인. 자신이 행복을 누릴 자격이 없다고 믿으며 스스로를 파괴합니다. 순수한 미시킨 공작의 사랑도 끝내 그녀를 구하지 못합니다.',
    bookDesc: '도스토옙스키가 1869년 발표한 소설. "완전히 아름다운 인간"을 형상화하려 했던 작가의 의도가 담긴, 선과 악·미와 비극이 공존하는 이야기입니다.',
    image: '/characters/nastasya.jpeg',
  },
  {
    name: '춘향', book: '춘향전 — 작자 미상',
    tags: ['절개', '의지', '신의'],
    desc: '남원 기생의 딸로 양반 이몽룡과 사랑에 빠집니다. 변 사또의 수청 요구를 목숨 걸고 거부하며 절개를 지킵니다. 신분의 벽을 초월한 사랑과 굳은 의지의 상징입니다.',
    bookDesc: '조선 후기에 형성된 한국 고전 소설의 대표작. 판소리로도 전해지며 사랑·신의·저항 정신을 담은 한국 문학의 정수로 꼽힙니다.',
    image: '/characters/chunhyang.jpeg',
  },
]

function pickRandom() {
  return Object.values(questions).map(pool => pool[Math.floor(Math.random() * pool.length)])
}

function matchCharacter(userTags) {
  return characters
    .map(c => ({
      ...c,
      score: c.tags.reduce((sum, t) => sum + userTags.filter(ut => ut === t).length, 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
}

export default function App() {
  const [screen, setScreen] = useState('start')
  const [quiz, setQuiz] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [userTags, setUserTags] = useState([])
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [result2, setResult2] = useState(null)
  const [reason, setReason] = useState('')
  const [copied, setCopied] = useState(false)

  const startQuiz = () => {
    setQuiz(pickRandom())
    setCurrentQ(0)
    setSelectedIdx(null)
    setUserTags([])
    setAnswers([])
    setResult(null)
    setResult2(null)
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
      const [matched, matched2] = matchCharacter(newTags)
      setResult(matched)
      setResult2(matched2)
      setScreen('loading')

      const answerText = newAnswers.map((a, i) => `Q${i + 1}: ${a.a}`).join('\n')
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 300,
            temperature: 1,
            system: '당신은 고전문학을 현대적으로 해석하는 재치 있는 큐레이터입니다. 사용자의 답변을 보고, 매칭된 고전 소설 캐릭터와 어떻게 닮았는지를 현대적인 언어와 상황에 빗대어 위트 있고 공감되게 3문장으로 설명하세요. 딱딱한 문학 해설이 아니라, 친한 친구에게 "야, 너 완전 ○○ 스타일이다"라고 말해주듯 써주세요. 존댓말로, 짧고 임팩트 있게. 설명 외의 말은 하지 마세요.',
            messages: [{ role: 'user', content: `사용자 답변:\n${answerText}\n\n매칭된 캐릭터: ${matched.name} (${matched.book})\n\n이 사람이 ${matched.name}와 닮은 이유를 현대적인 감각으로 재치 있게 3문장으로 설명해주세요.` }],
          }),
        })
        const data = await res.json()
        setReason(data.content[0].text)
      } catch (e) {
        console.error('Gemini API 오류:', e)
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
            <div className="result-hero">
              {result.image && (
                <img
                  src={result.image}
                  alt={result.name}
                  onError={e => { e.target.style.display = 'none' }}
                />
              )}
              <div className="result-hero-overlay" />
              <div className="result-hero-text">
                <p className="result-hero-label">당신과 닮은 인물</p>
                <p className="result-hero-name">{result.name}</p>
                <p className="result-hero-book">{result.book}</p>
              </div>
            </div>

            <div className="result-body">
              <p className="result-section-title">당신이 이 인물인 이유</p>
              <p className="result-ai">{reason}</p>

              <div className="result-divider" />

              <p className="result-section-title">작품 소개</p>
              <p className="result-desc">{result.desc}</p>

              <div className="tags">
                {topTags.map(t => (
                  <span key={t} className="tag">#{t}</span>
                ))}
              </div>

              {result2 && (
                <div className="result-runner-up">
                  {result2.image && (
                    <img
                      src={result2.image}
                      alt={result2.name}
                      className="runner-up-img"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  )}
                  <div className="runner-up-info">
                    <p className="runner-up-label">당신 안에 숨어있는 또 다른 인물</p>
                    <p className="runner-up-name">{result2.name}</p>
                    <p className="runner-up-book">{result2.book}</p>
                  </div>
                </div>
              )}
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
