'use client';

import { useState, useRef } from 'react';
import './globals.css';

// 삼국지 작품 데이터 (검색용)
const SANGOKUSHI_DATA = [
  { id: 31, title: '삼국지 정사', image: '/sangokushi/31.jpg', type: '정사'},

  { id: 29, title: '삼국지 연의', image: '/sangokushi/29.jpg', type: '소설'},
  { id: 30, title: '삼국지 정사', image: '/sangokushi/30.jpg', type: '정사'},

  { id: 34, title: '삼국지 정사 위서', image: '/sangokushi/34.jpg', type: '정사'},
  { id: 33, title: '삼국지 정사 촉서', image: '/sangokushi/33.jpg', type: '정사'},
  { id: 32, title: '삼국지 정사 오서', image: '/sangokushi/32.jpg', type: '정사'},

  { id: 6, title: '이희재 삼국지', image: '/sangokushi/6.jpg', type: '만화'},
  { id: 7, title: '이문열 이희재 만화 삼국지', image: '/sangokushi/7.jpg', type: '만화'},
  { id: 8, title: '이문열 삼국지', image: '/sangokushi/8.jpg', type: '소설'},
  { id: 9, title: '창천항로', image: '/sangokushi/9.png', type: '만화'},
  { id: 10, title: '만화 삼국지', image: '/sangokushi/10.jpg', type: '만화'},
  { id: 11, title: '요코야마 미츠테루 삼국지', image: '/sangokushi/11.png', type: '소설'},

  { id: 1, title: '삼국지톡', image: '/sangokushi/1.png', type: '게임'},
  { id: 2, title: '적벽', image: '/sangokushi/2.gif', type: '뮤지컬'},

  { id: 3, title: '진・삼국무쌍 ORIGINS', image: '/sangokushi/3.png', type: '게임'},
  { id: 20, title: '진・삼국무쌍 7 with 맹장전', image: '/sangokushi/20.png', type: '게임'},
  { id: 21, title: '진・삼국무쌍８', image: '/sangokushi/21.png', type: '게임'},
  { id: 22, title: '진·삼국무쌍8 Empires', image: '/sangokushi/22.png', type: '게임'},

  { id: 23, title: '삼국지 14', image: '/sangokushi/23.png', type: '게임'},
  { id: 25, title: '삼국지 13', image: '/sangokushi/25.jpg', type: '게임'},
  { id: 24, title: '삼국지 12', image: '/sangokushi/24.png', type: '게임'},

  { id: 4, title: '출사 : 삼국지 촉서 제갈량전', image: '/sangokushi/4.jpg', type: '소설'},
  { id: 5, title: '고양이 전쟁 냥이 삼국지', image: '/sangokushi/5.jpg', type: '만화'},

  { id: 26, title: '대군사사마의', image: '/sangokushi/26.png', type: '드라마'},
  { id: 27, title: '신삼국', image: '/sangokushi/27.png', type: '드라마'},
 
  { id: 12, title: '만화 삼국지', image: '/sangokushi/12.jpg', type: '만화'},
  { id: 13, title: '만화 삼국지', image: '/sangokushi/13.jpg', type: '만화'},
  { id: 14, title: '요시카와 에이지 삼국지', image: '/sangokushi/14.jpg', type: '소설'},
  
  { id: 15, title: '적벽대전', image: '/sangokushi/15.png', type: '영화'},
  { id: 16, title: '적벽대전2', image: '/sangokushi/16.png', type: '영화'},
  { id: 17, title: '삼국지: 명장 관우', image: '/sangokushi/17.jpg', type: '영화'},
  { id: 18, title: '진삼국무쌍', image: '/sangokushi/18.png', type: '영화'},
  { id: 19, title: '삼국지환상대륙', image: '/sangokushi/19.png', type: '게임'},

    { id: 28, title: '황석영 삼국지', image: '/sangokushi/28.jpg', type: '소설'},
    { id: 35, title: '삼국군영전 화봉요원', image: '/sangokushi/35.jpg', type: '만화'},

];

export default function Main() {
  const [nickname, setNickname] = useState('');
  const [ageType, setAgeType] = useState('비공개');
  const [majors, setMajors] = useState({
    글: false, 그림: false, 썰: false, 소비: false,
    공예: false, 코스: false, 영상: false
  });
  const [tweet, setTweet] = useState({
    RT多: false, 마음多: false, 할말만: false, 뻘소리: false, 일상: false,
    탐라대화多: false, 인용대화多: false, '타장르 언급': false,
    욕설: false, 수위: false, 우울: false
  });
  const [tweetEtc, setTweetEtc] = useState('');
  const [majorEtc, setMajorEtc] = useState('');
  const [allEtc, setAllEtc] = useState('');
  const [relation, setRelation] = useState({ 블언블: false, 언팔: false, 블락: false, 뮤트: false });
  const [relationEtc, setRelationEtc] = useState('');
  const [profileImg, setProfileImg] = useState(null);

  const [fontFamily, setFontFamily] = useState('kopubdotum');
  const [favChars, setFavChars] = useState('');
  const [cpReverseOk, setCpReverseOk] = useState(null);
  const [cpEtc, setCpEtc] = useState('');
  const [triggers, setTriggers] = useState('');
  const [triggerAction, setTriggerAction] = useState('');

  const [selectedFactions, setSelectedFactions] = useState([]);
  const [customFaction, setCustomFaction] = useState('');
  const [customFactionColor, setCustomFactionColor] = useState('#888888'); // 색상 추가
  const [factionColors, setFactionColors] = useState({
    '魏': '#2b3fb3ff',
    '蜀': '#1a8a1aff',
    '吳': '#b3220eff',
    '他': '#59585aff'
  });
  
  const [favList, setFavList] = useState([{ img: null, name: '' }]);
  const [oneWord, setOneWord] = useState('');
  
  // 검색 관련
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(null);
  const [selectedType, setSelectedType] = useState('전체'); // 타입 필터

  const canvasRef = useRef(null);
  const [themeColor, setThemeColor] = useState('초록');

  const colorImages = {
    초록: ["/1.png", "/1.png", "/1.png", "/1.png"],
    파랑: ["/2.png", "/2.png", "/2.png", "/2.png"],
    빨강: ["/3.png", "/3.png", "/3.png", "/3.png"],
    보라: ["/5.png", "/5.png", "/5.png", "/5.png"],
    노랑: ["/6.png", "/6.png", "/6.png", "/6.png"],
    검정: ["/4.png", "/4.png", "/4.png", "/4.png"],
  };

  const onUploadImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileImg(url);
  };

  const toggleMajor = (key) =>
    setMajors(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleTweet = (key) =>
    setTweet(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleRelation = (key) =>
    setRelation(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleFaction = (faction) => {
    setSelectedFactions(prev =>
      prev.includes(faction) ? prev.filter(f => f !== faction) : [...prev, faction]
    );
  };

  // 커스텀 진영 추가 (색상 포함)
  const addCustomFaction = () => {
    if (customFaction.trim() && !selectedFactions.includes(customFaction.trim())) {
      setSelectedFactions(prev => [...prev, customFaction.trim()]);
      setFactionColors(prev => ({ ...prev, [customFaction.trim()]: customFactionColor }));
      setCustomFaction('');
      setCustomFactionColor('#888888');
    }
  };

  // 진영 제거
  const removeFaction = (faction) => {
    setSelectedFactions(prev => prev.filter(f => f !== faction));
    // 기본 진영이 아닌 경우에만 색상도 제거
    if (!['魏','蜀','吳','他'].includes(faction)) {
      setFactionColors(prev => {
        const updated = { ...prev };
        delete updated[faction];
        return updated;
      });
    }
  };

  const handleFavImg = (idx, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFavList(prev => {
      const updated = [...prev];
      updated[idx].img = url;
      return updated;
    });
  };

  const handleFavName = (idx, value) => {
    setFavList(prev => {
      const updated = [...prev];
      updated[idx].name = value;
      return updated;
    });
  };

  // 검색 모달 열기
  const openSearchModal = (idx) => {
    setCurrentSearchIndex(idx);
    setShowSearchModal(true);
    setSearchQuery('');
    setSelectedType('전체'); // 타입 필터 초기화
  };

  // 검색 결과에서 선택
  const selectFromSearch = (item) => {
    if (currentSearchIndex !== null) {
      setFavList(prev => {
        const updated = [...prev];
        updated[currentSearchIndex].img = item.image;
        updated[currentSearchIndex].name = item.title;
        return updated;
      });
      setShowSearchModal(false);
      setCurrentSearchIndex(null);
    }
  };

  // 검색 필터링
  const filteredSangokushi = SANGOKUSHI_DATA.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === '전체' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const addFav = () => {
    if (favList.length < 3) setFavList([...favList, { img: null, name: '' }]);
  };

  const removeFav = (idx) => {
    if (favList.length > 1) {
      setFavList(prev => prev.filter((_, i) => i !== idx));
    }
  };

  const exportPNG = async () => {
    const node = canvasRef.current;
    if (!node) return;
    
    const html2canvas = (await import('html2canvas')).default;
    
    const scale = 2;
    const canvas = await html2canvas(node, { 
      backgroundColor: '#ffffff', 
      scale, 
      useCORS: true 
    });
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `profile-card-${Date.now()}.png`;
    link.click();
  };

  const lightColor = '#ddd';

  const hanjaRegex = /[\u4E00-\u9FFF]/;
  const renderHanjaText = (text) => {
    if (!text) return null;
    return text.split('').map((char, idx) =>
      hanjaRegex.test(char) ? <span key={idx} className={fontFamily}>{char}</span> : char
    );
  };

  return (
    <div className="pageWrap">
      <div className="sidebar">
        <h2>설정</h2>

        <h3>프로필</h3>

        <div className="section">
          <label>프로필 이미지</label>
          <input type="file" accept="image/*" onChange={onUploadImage} />
        </div>

        <div className="section">
          <label>닉네임</label>
          <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="닉네임" />
        </div>

        <div className="section">
          <label>나이 표기</label>
          <div className="chipsRow">
            {['성인', '미성년자', '비공개'].map(k => (
              <button key={k} className={ageType === k ? 'chip active' : 'chip'} onClick={() => setAgeType(k)}>{k}</button>
            ))}
          </div>
        </div>

        <h3>트윗성향</h3>

        <div className="section">
          <label>전공/활동</label>
          <div className="chipsRow">
            {Object.keys(majors).map(k => (
              <button key={k} className={majors[k] ? 'chip active' : 'chip'} onClick={() => toggleMajor(k)}>{k}</button>
            ))}
          </div>
          <input value={majorEtc} onChange={e => setMajorEtc(e.target.value)} placeholder="기타" />
        </div>

        <div className="section">
          <label>트윗 성향</label>
          <div className="chipsRow">
            {Object.keys(tweet).map(k => (
              <button key={k} className={tweet[k] ? 'chip active' : 'chip'} onClick={() => toggleTweet(k)}>{k}</button>
            ))}
          </div>
          <input value={tweetEtc} onChange={e => setTweetEtc(e.target.value)} placeholder="기타" />
        </div>

        <div className="section">
          <label>이별</label>
          <div className="chipsRow">
            {Object.keys(relation).map(k => (
              <button key={k} className={relation[k] ? 'chip active' : 'chip'} onClick={() => toggleRelation(k)}>{k}</button>
            ))}
          </div>
          <input value={relationEtc} onChange={e => setRelationEtc(e.target.value)} placeholder="기타" />
        </div>

        <div className="section">
          <label>그 외 주의사항</label>
          <input value={allEtc} onChange={e => setAllEtc(e.target.value)} placeholder="기타" />
        </div>

        <h3>덕질 성향</h3>

        <div className="section">
          <label>최애 / 차애</label>
          <input value={favChars} onChange={e => setFavChars(e.target.value)} placeholder="최애/차애" />
        </div>

        <div className="section">
          <label>CP / 리버스 ok</label>
          <input value={cpEtc} onChange={e => setCpEtc(e.target.value)} placeholder="CP" />
          <div className="chipsRow">
            {['O', 'X'].map(opt => (
              <button 
                key={opt} 
                className={cpReverseOk === opt ? 'chip active' : 'chip'} 
                onClick={() => setCpReverseOk(cpReverseOk === opt ? null : opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <label>지뢰 / 지뢰 대처</label>
          <input value={triggers} onChange={e => setTriggers(e.target.value)} placeholder="지뢰 키워드" />
          <div className="chipsRow">
            {['블락', '뮤트', '알아서 거름', '멘션 아니면 OK'].map(opt => (
              <button 
                key={opt} 
                className={triggerAction === opt ? 'chip active' : 'chip'} 
                onClick={() => setTriggerAction(triggerAction === opt ? '' : opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <h3>선호 진영</h3>

        <div className="section">
          <label>색상 선택</label>
          <div className="chipsRow">
            {['초록','파랑','빨강','노랑','보라','검정'].map(c => (
              <button 
                key={c} 
                className={themeColor === c ? 'chip active' : 'chip'} 
                onClick={() => setThemeColor(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <label>글꼴</label>
          <div className="chipsRow">
            <button className={fontFamily === 'kopubdotum' ? 'chip active' : 'chip'} onClick={() => setFontFamily('kopubdotum')}>고딕</button>
            <button className={fontFamily === 'kopubbatang' ? 'chip active' : 'chip'} onClick={() => setFontFamily('kopubbatang')}>세리프</button>
          </div>
        </div>

        <div className="section">
          <label>선호 진영 (기본)</label>
          <div className="chipsRow">
            {['魏','蜀','吳','他'].map(side => (
              <button
                key={side}
                className={selectedFactions.includes(side) ? 'chip active' : 'chip'}
                onClick={() => toggleFaction(side)}
              >
                {side}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <label>커스텀 진영 추가</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input 
              value={customFaction} 
              onChange={e => setCustomFaction(e.target.value)} 
              placeholder="진영 이름 입력"
              onKeyPress={e => e.key === 'Enter' && addCustomFaction()}
            />
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <label style={{ fontSize: '12px', color: '#666' }}>색상:</label>
              <input 
                type="color" 
                value={customFactionColor} 
                onChange={e => setCustomFactionColor(e.target.value)}
                style={{ width: '60px', height: '36px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
              <button onClick={addCustomFaction} className="add-btn">추가하기</button>
            </div>
          </div>
          {selectedFactions.filter(f => !['魏','蜀','吳','他'].includes(f)).length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <small>추가된 진영:</small>
              <div className="chipsRow" style={{ marginTop: '5px' }}>
                {selectedFactions.filter(f => !['魏','蜀','吳','他'].includes(f)).map(faction => (
                  <div key={faction} className="custom-faction-chip" style={{ backgroundColor: factionColors[faction] }}>
                    <span>{faction}</span>
                    <button onClick={() => removeFaction(faction)} className="remove-faction-btn">×</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <h3>최애 삼국지</h3>

        <div className="section">
          <label>최애 삼국지</label>
          {favList.map((item, idx) => (
            <div key={idx} className="fav-item">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <label className="file-upload-btn">
                  파일 선택
                  <input type="file" accept="image/*" onChange={e => handleFavImg(idx, e.target.files?.[0])} style={{ display: 'none' }} />
                </label>
                <button onClick={() => openSearchModal(idx)} className="search-btn">🔍 검색</button>
              </div>
              <input type="text" value={item.name} onChange={e => handleFavName(idx, e.target.value)} placeholder="작품 이름" style={{ width: '100%' }} />
              {favList.length > 1 && <button onClick={() => removeFav(idx)} className="delete-btn">삭제</button>}
            </div>
          ))}
          {favList.length < 3 && <button onClick={addFav} className="add-btn">+ 추가</button>}
        </div>

        <h3>한마디</h3>

        <div className="section">
          <label>한마디</label>
          <textarea 
            value={oneWord} 
            onChange={e => setOneWord(e.target.value)} 
            placeholder="한마디" 
            rows={3} 
          />
        </div>
      </div>

      {/* 검색 모달 */}
      {showSearchModal && (
        <div className="modal-overlay" onClick={() => setShowSearchModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>삼국지 작품 검색</h3>
            
            {/* 타입 필터 버튼 */}
            <div className="type-filter-row">
              {['전체','정사', '만화', '소설', '게임', '영화', '드라마', '뮤지컬'].map(type => (
                <button
                  key={type}
                  className={selectedType === type ? 'type-filter-btn active' : 'type-filter-btn'}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <input 
              type="text" 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              placeholder="작품명 검색..." 
              className="search-input"
            />
            <div className="search-results">
              {filteredSangokushi.map(item => (
                <div key={item.id} className="search-item" onClick={() => selectFromSearch(item)}>
                  <img src={item.image} alt={item.title} />
                  <div className="search-item-info">
                    <span className="search-item-title">{item.title}</span>
                    <span className="search-item-type">{item.type}</span>
                  </div>
                </div>
              ))}
              {filteredSangokushi.length === 0 && (
                <p style={{ textAlign: 'center', color: '#888', gridColumn: '1 / -1' }}>검색 결과가 없습니다</p>
              )}
            </div>
            <button onClick={() => setShowSearchModal(false)} className="close-button">닫기</button>
          </div>
        </div>
      )}

      <div className="canvasWrap">
        <button className="button img-make-button" onClick={exportPNG}>📥 이미지로 내보내기</button>
        <div className="canvas" ref={canvasRef}>

          <div className='absol-div'>
            {colorImages[themeColor].map((imgSrc, idx) => (
              <div className='absol-img' key={idx}>
                <img className="absol-img-tag" src={imgSrc} alt={`배경-${idx}`} />
              </div>
            ))}
          </div>

          <div className='text-area'>
            <div className="row">
              <div className="profileBox">
                {profileImg ? <img src={profileImg} alt='profile' className='profileImg' /> :
                <div className='profilePlaceholder'>프로필 이미지</div>}
              </div>
              <div className='profileInfo'>
                <div className='textBlock textBlock2'>{nickname || '닉네임'}</div>
                <div className='textBlock textBlock2'>연령대 | {ageType}</div>
              </div>
            </div>

            <p className='large-text'>트윗성향</p>
            <div className='textBlock'>
              <span className='bold-text'>전공 / 활동 </span><span>{renderHanjaText([...Object.entries(majors).filter(([k,v])=>v).map(([k])=>k), ...(majorEtc?[majorEtc]:[])].join(', '))}</span>
            </div>
            <div className='textBlock'>
              <span className='bold-text'>트윗 성향 </span><span>{renderHanjaText([...Object.entries(tweet).filter(([k,v])=>v).map(([k])=>k), ...(tweetEtc?[tweetEtc]:[])].join(', '))}</span>
            </div>
            <div className='textBlock'>
              <span className='bold-text'>이별 </span><span>{renderHanjaText([...Object.entries(relation).filter(([k,v])=>v).map(([k])=>k), ...(relationEtc?[relationEtc]:[])].join(', '))}</span>
            </div>
            {allEtc && <div className='textBlock'><span className='bold-text'>그 외 주의사항 </span>{allEtc}</div>}

            <p className='large-text'>덕질성향</p>
            <div className='textBlock'><span className='bold-text'> 최애 / 차애  </span><span>{favChars || ''}</span></div>
            <div className='textBlock'><span className='bold-text'> CP / 리버스 ok  </span><span>{cpEtc || ''} {cpReverseOk ? `| ${cpReverseOk}` : ''}</span></div>
            <div className='textBlock'>
              <span className='bold-text'> 지뢰 / 지뢰대처 </span>
              <span>
                {/* 수정: triggers와 triggerAction 표시 로직 개선 */}
                {triggers && triggerAction ? `${triggers} | ${triggerAction}` : triggers || triggerAction || ''}
              </span>
            </div>
          </div>
          <div className='img-area'>
            <p className='large-text no-margin'>선호 진영</p>
            <div className='choose-area'>
              {selectedFactions.map(side => (
                <div key={side} 
                  className='choose-jin-btn'
                style={{
                  display:'inline-block',
                  padding:'4px 8px',
                  margin:'4px',
                  borderRadius:'4px',
                  backgroundColor: factionColors[side] || '#888',
                  color: '#fff'
                }}>
                  <p>
                    {renderHanjaText(side)}
                  </p>
                </div>
              ))}
            </div>

            <p className='large-text'>최애 삼국지</p>
            <div className='img-wrapper'>
              {favList.map((item, idx) => (
                <div className='img-unit' key={idx}>
                  <div className='img-overflow'>
                    {item.img ? <img src={item.img} alt={`fav-${idx}`} /> : <div className='img-placeholder'>+</div>}
                  </div>
                  {item.name && <p className='sul-name'>{item.name}</p>}
                </div>
              ))}
            </div>

            <p className='large-text'>한마디</p>
            <div className='textBlock textBloct-two' style={{ whiteSpace: "pre-wrap" }}>
              <p>{oneWord}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}