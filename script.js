document.addEventListener("DOMContentLoaded", () => {
  // ハンバーガーメニューの動作
  const hamburgerMenu = document.querySelector(".hamburger-menu")
  const hamburgerIcon = document.querySelector(".hamburger-icon")
  const mobileNav = document.querySelector(".mobile-nav")
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item")

  // ハンバーガーメニューのクリックイベント
  hamburgerMenu.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("open")
    mobileNav.classList.toggle("open")
    document.body.classList.toggle("no-scroll")
  })

  // モバイルナビゲーションのリンクをクリックしたときにメニューを閉じる
  mobileNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburgerIcon.classList.remove("open")
      mobileNav.classList.remove("open")
      document.body.classList.remove("no-scroll")
    })
  })

  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerOffset = 50
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // スクロールアニメーション
  const animateOnScroll = () => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight

    // 要素が画面内に入ったらアニメーション
    document.querySelectorAll(".service-card, .portfolio-item, .client-logo").forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top + scrollPosition

      if (scrollPosition > elementPosition - windowHeight + 100) {
        element.classList.add("visible")
      }
    })
  }

  // 初期表示時のアニメーション設定
  document.querySelectorAll(".service-card, .portfolio-item, .client-logo").forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // visible クラスのスタイル
  document.head.insertAdjacentHTML(
    "beforeend",
    `
        <style>
            .service-card.visible, .portfolio-item.visible, .client-logo.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `,
  )

  // スクロールイベントリスナー
  window.addEventListener("scroll", animateOnScroll)

  // 初期実行
  setTimeout(animateOnScroll, 300)

  // リサイズ時のハンバーガーメニュー状態管理
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains("open")) {
      hamburgerIcon.classList.remove("open")
      mobileNav.classList.remove("open")
      document.body.classList.remove("no-scroll")
    }
  })
})
