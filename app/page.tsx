import Header from './components/header'
import HeroCarousel from './(site)/_components/HeroCarousel'
import IconGrid from './components/icon-grid'
import RailCarousel from './components/rail-carousel'
import EarlybirdBanner from './components/earlybird-banner'
import CalendarList from './components/calendar-list'
import TeachersSlider from './components/teachers-slider'
import FooterCTA from './components/footer-cta'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero 섹션 - 자동 슬라이드 배너 */}
      <div className="pt-16 lg:pt-20">
        <HeroCarousel />
      </div>

      {/* 아이콘 메뉴 그리드 */}
      <IconGrid />

      {/* 무료 강의 레일 카루셀 */}
      <RailCarousel />

      {/* 얼리버드 배너 */}
      <EarlybirdBanner />

      {/* 강의 일정 (달력 + 리스트) */}
      <CalendarList />

      {/* 강사진 슬라이더 */}
      <TeachersSlider />

      {/* CTA 푸터 배너 + 마키 + 푸터 */}
      <FooterCTA />
    </main>
  )
}
